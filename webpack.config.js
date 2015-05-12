const path = require("path")
const merge = require("./lib/merge")

const TARGET = process.env.TARGET
const ROOT_PATH = path.resolve(__dirname)

const common = {
  entry: [ path.join(ROOT_PATH, "app/main.js") ],
  output: {
    path: path.resolve(ROOT_PATH, "build"),
    filename: "bundle.js",
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "jscs-loader"
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loaders: [ "style", "css" ]
      }
    ]
  }
}

const mergeConfig = merge.bind(null, common)

if (TARGET === "build") {
  module.exports = mergeConfig({})
}

if (TARGET === "dev") {
  module.exports = mergeConfig({
    entry: [ "webpack/hot/dev-server" ]
  })
}
