var path = require("path")

var env = process.env.NODE_ENV === "production" ? "prod" : "dev"

var config = {
  dev: {
    isDev: true,
    root: path.join(__dirname, "../../"),
    dist: path.join(__dirname, "../../dist"),
    staticAssetsPath: "assets",
    cssSourceMap: false,
    cssMinimize: false,
    cssExtract: true,
    port: 8082
  },
  prod: {
    isDev: false,
    root: path.join(__dirname, "../../"),
    dist: path.join(__dirname, "../../dist"),
    staticAssetsPath: "assets",
    cssSourceMap: false,
    cssMinimize: true,
    cssExtract: true
  }
}

module.exports = config[env]
