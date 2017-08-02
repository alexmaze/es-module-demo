var path = require("path")
var config = require("./config")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
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
  }
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

  if (config.cssExtract) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: "style-loader"
    })
  } else {
    return ["style-loader"].concat(loaders)
  }
}
