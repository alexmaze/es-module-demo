var path = require("path")
var webpack = require("webpack")
var merge = require("webpack-merge")

var HtmlWebpackPlugin = require("html-webpack-plugin")
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")

const config = {
  moduleName: "test",
  entryFile: "./src/Test.tsx",
  routePrefix: "/test",
  dist: path.join(__dirname, "../../dist"),
  staticAssetsPath: "assets"
}

module.exports = {
  entry: {
    umd: config.entryFile
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
    new webpack.DefinePlugin({
      ["ENV_PREFIX"]: '"' + config.routePrefix + '"'
    }),
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
        minimize: true,
        sourceMap: false
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
        sourceMap: false
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
