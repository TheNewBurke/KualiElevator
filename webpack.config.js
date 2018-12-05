module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
  },
  externals: {
    "jquery": "jQuery"
  }
}

