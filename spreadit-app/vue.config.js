const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      // with these, we can successfully remove .vue from vue imports.
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    },
  },
  "devServer": {
    "proxy": "http://127.0.0.1:3333",
    "overlay": {
      "warnings": true,
      "errors": true
    }
  },
  "outputDir": "../public",
  "lintOnSave": true,
  "indexPath": "index.html",
  "transpileDependencies": [
    "vuetify"
  ]
}