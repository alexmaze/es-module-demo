var config = require("./config")
var baseWebpack = require("./webpack.config.common")

var path = require("path")

var webpack = require("webpack")
var merge = require("webpack-merge")

var HtmlWebpackPlugin = require("html-webpack-plugin")
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = merge(baseWebpack, {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:" + config.port,
    "webpack/hot/only-dev-server",
    "./src/index.tsx"
  ],
  output: {
    path: config.dist,
    publicPath: "/",
    filename: "[name].[hash:7].js",
    chunkFilename: "[name].[chunkhash:7].js"
  },
  devtool: "eval",
  // devtool: "#source-map",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
    new HtmlWebpackPlugin({
      hash: false,
      template: "./src/assets/index.hbs"
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash:7].css"
    }),
    new OptimizeCSSPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
