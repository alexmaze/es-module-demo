process.env.NODE_ENV = "production"

var ora = require("ora")
var chalk = require("chalk")
var webpack = require("webpack")
var config = require("./webpack/config")
var webpackConfig = require("./webpack/webpack.config.production")

var spinner = ora("building for production...")
spinner.start()

webpack(webpackConfig, function(err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: true,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n"
  )

  console.log(chalk.cyan("  Build complete.\n"))
})
