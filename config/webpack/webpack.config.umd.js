var config = require("./config")

var path = require("path")
var webpack = require("webpack")
var merge = require("webpack-merge")

var HtmlWebpackPlugin = require("html-webpack-plugin")
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  entry: {
    umd: "./src/Test.tsx"
  },
  externals: {
    react: "React"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "../../src")
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        loader: "tslint-loader",
        exclude: [/\.spec\.ts/, /(node_modules)/]
      },
      {
        test: /\.tsx?$/,
        exclude: [/\.spec\.ts/, /(node_modules)/],
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useCache: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: generateLoaders(true)
      },
      {
        test: /\.css$/,
        use: generateLoaders(false)
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/,
        loader: "file-loader",
        query: {
          name: assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "file-loader",
        query: {
          name: assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  output: {
    path: config.dist,
    publicPath: "/",
    filename: "[name].[hash:7].js",
    chunkFilename: "[name].[chunkHash:7].js",
    library: "test",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // new ExtractTextPlugin({
    //   filename: "[name].[contenthash:7].css"
    // }),
    new OptimizeCSSPlugin(),
    new FriendlyErrorsPlugin()
  ]
}

function assetsPath(_path) {
  return path.join(config.staticAssetsPath, _path)
}

function generateLoaders(isLess) {
  var loaders = [
    {
      loader: "css-loader",
      options: {
        minimize: config.cssMinimize,
        sourceMap: config.cssSourceMap
      }
    },
    {
      loader: "autoprefixer-loader"
    }
  ]
  if (isLess) {
    loaders.push({
      loader: "less-loader",
      options: {
        sourceMap: config.cssSourceMap
      }
    })
  }
  //   if (config.cssExtract) {
  //   return ExtractTextPlugin.extract({
  //     use: loaders,
  //     fallback: "style-loader"
  //   })
  // } else {
  return ["style-loader"].concat(loaders)
  // }
}
