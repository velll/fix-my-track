const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/js/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.erb$/i,
        use: 'raw-loader',
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/bundle')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'app/css', to: '.'},
        // { from: 'static'}
      ],
    }),
  ],
  devtool: 'source-map',
};
