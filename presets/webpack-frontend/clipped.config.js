const path = require('path')
const presetWebpack = require('clipped-preset-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = async (clipped, opt = {}) => {
  await clipped.use(presetWebpack)

  clipped.config.webpack.resolve.modules
    .add(path.join(__dirname, 'node_modules'))
  clipped.config.webpack.resolveLoader.modules
    .add(path.join(__dirname, 'node_modules'))

  clipped.config.webpack.module
    .rule('css')
      .test(/\.css$/)
      .include
        .add(clipped.resolve('src'))
        .end()
      .use('css')
        .loader('css-loader')

  clipped.config.webpack
    .plugin('html')
    .use(HtmlWebpackPlugin, [{
      template: require.resolve('html-webpack-template'),
      inject: false,
      appMountId: 'root'
    }])

  return clipped
}
