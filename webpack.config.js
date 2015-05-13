const path = require("path")
const webpack = require("webpack")
const merge = require("./lib/merge")

const TARGET = process.env.TARGET
const ROOT_PATH = path.resolve(__dirname)

const common = {
  entry: [ path.join(ROOT_PATH, "app/main.jsx") ],
  resolve: {
    extensions: [ "", ".js", ".jsx" ],
  },
  output: {
    path: path.resolve(ROOT_PATH, "build"),
    filename: "bundle.js"
  },
  module: {
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
  module.exports = mergeConfig({
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: [ "babel?stage=0" ],
          include: path.join(ROOT_PATH, "app")
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
  })
}

if (TARGET === "dev") {
  module.exports = mergeConfig({
    entry: [ "webpack/hot/dev-server" ],
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: [ "eslint-loader", "jscs" ],
          include: path.join(ROOT_PATH, "app")
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: [ "react-hot", "babel", "flowcheck", "babel?stage=0&blacklist=flow" ],
          include: path.join(ROOT_PATH, "app")
        }
      ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
  })
}
