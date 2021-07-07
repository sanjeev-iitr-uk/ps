const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  externals: [nodeExternals()],
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
};
