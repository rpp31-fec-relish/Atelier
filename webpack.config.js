var path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");

module.exports = {
  mode: 'development',
  plugins: [new CompressionPlugin()],
  entry: `${SRC_DIR}/app.jsx`,
  module: {
    rules: [
      {
        test: /\.js*?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: DIST_DIR,
  },
};