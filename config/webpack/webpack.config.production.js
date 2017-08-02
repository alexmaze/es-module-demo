var config = require("./config")
var baseWebpack = require("./webpack.config.common")
var path = require("path")
var merge = require("webpack-merge")
var webpack = require("webpack")

var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = merge(baseWebpack, {
  entry: {
    app: ["./src/index.tsx"]
    // esp: ["./src/routes.tsx"]
  },
  output: {
    path: config.dist,
    publicPath: "/",
    filename: "[name].[hash:7].js",
    chunkFilename: "[name].[chunkhash:7].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(config.root, "node_modules")) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      chunks: ["vendor"]
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true,
    //     conditionals: true,
    //     unused: true,
    //     comparisons: true,
    //     sequences: true,
    //     dead_code: true,
    //     evaluate: true,
    //     if_return: true,
    //     join_vars: true,
    //     // drop_console: true,
    //     drop_debugger: true,
    //     global_defs: {
    //       __REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
    //     }
    //   },
    //   minimize: true,
    //   debug: false,
    //   sourceMap: true,
    //   output: {
    //     comments: false
    //   }
    // }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: "[name].[contenthash:7].css"
    }),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: "./src/assets/index.hbs"
    })
  ]
})
