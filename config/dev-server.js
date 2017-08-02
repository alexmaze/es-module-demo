process.env.NODE_ENV = "development"

var webpack = require("webpack")
var WebpackDevServer = require("webpack-dev-server")
var webpackConfig = require("./webpack/webpack.config.dev")
var ora = require("ora")
var chalk = require("chalk")
var config = require("./webpack/config")

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-react-component-tools": "true"
  },
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  proxy: {
    "/api": {
      pathRewrite: {
        "^/api": ""
      },
      target: "http://localhost:9091"
    }
  }
}).listen(config.port, "localhost", function(err, result) {
  if (err) {
    return console.log(err)
  }
  console.log(chalk.cyan(`Listening at http://localhost:${config.port}/`))
})
