const path = require('path');

const config = {
  entry: ['babel-polyfill', './views/Index.jsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public'
  },
  module: {
    rules: [
      { test: /\.(jsx|js)$/, exclude: /node_modules/ , use: 'babel-loader' }
    ]
  }
};

module.exports = config;