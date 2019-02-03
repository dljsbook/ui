const path = require('path');

module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dljsUI.umd.min.js',
    library: 'dljsUI',
    libraryTarget: 'umd',
  },
  externals: {
    '@tensorflow/tfjs': 'tf',
    '@tensorflow/tfjs-vis': 'tfvis',
  }
};

