const merge = require('webpack-merge');
const common = require('./webpack.default.js');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
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
 });
 