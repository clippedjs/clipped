const path = require('path')
const presetWebpack = require('clipped-preset-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = async (clipped, opt) => {
  await clipped.use(presetWebpack)

  // clipped.config.webpack.merge({
  //   module: {
  //     rules: [
  //       {
  //         test: /\.css$/,
  //         loader: require.resolve('css-loader'),
  //         include: [clipped.resolve('src')],
  //         exclude: [/node_modules/]
  //       }
  //     ]
  //   }
  // })

  clipped.config.webpack.module
    .rule('css')
      .test(/\.css$/)
      .include
        .add(clipped.resolve('src'))
        .end()
      .use('css')
        .loader(require('css-loader'))

  clipped.config.webpack
    .plugin('html')
    .use(HtmlWebpackPlugin, [{
      template: clipped.resolve('node_modules/html-webpack-template/index.ejs', __dirname),
      inject: false,
      appMountId: 'root'
    }])

  return clipped
}
