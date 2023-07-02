const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new CaseSensitivePathsPlugin()
    ]
  }
};
