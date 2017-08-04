process.env.NODE_ENV = "production"

var ora = require("ora")
var chalk = require("chalk")
var webpack = require("webpack")
var config = require("./webpack/config")
var webpackConfig = require("./webpack/webpack.config.umd")
var fs = require("fs")

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

  const assets = stats
    .toJson({ modules: true })
    .assets.map(item => ({ src: item.name, name: "test" }))
  fs.writeFile("./dist/manifest.json", JSON.stringify(assets, " ", 2))

  console.log(chalk.cyan("  Build complete.\n"))
})
