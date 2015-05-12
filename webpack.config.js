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
    filename: "bundle.js",
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader!jscs-loader",
        include: path.join(ROOT_PATH, "app")
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: path.join(ROOT_PATH, "app")
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
}

const mergeConfig = merge.bind(null, common)

if (TARGET === "build") {
  module.exports = mergeConfig({
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production"),
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      })
    ]
  })
}

if (TARGET === "dev") {
  module.exports = mergeConfig({
    entry: [ "webpack/hot/dev-server" ]
  })
}
