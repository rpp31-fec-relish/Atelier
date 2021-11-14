var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");
var OVERVIEW_DIR = path.join(__dirname, "/client/src/components/Overview/");

module.exports = {
  entry: {
    app: `${SRC_DIR}/app.jsx`,
    test: `${OVERVIEW_DIR}/maintest.jsx`
  },
  mode: "development",
  output: {
    filename: "[name].js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js*?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
};