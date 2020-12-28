const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/js/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
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
  devServer: {
    proxy: {
      "/": { "target": "http://localhost:8081/" },
      "/api": {
          "target": "http://localhost:8081/",
          "pathRewrite": {
                  "^/api" : ""
          },
          "changeOrigin": true
      }
    }
  }

};
