const path = require('path');

const config = {
  // Entry
  entry: {
    path: './src/index.js'
  },
  // Output
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  // Loaders
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  }
};
// Exports
module.exports = config;
