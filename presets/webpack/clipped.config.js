const path = require('path')
const webpack = require('webpack')
// const webpackDevServer = require('webpack-dev-server')
const Chain = require('webpack-chain')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (clipped, opt = {babel: {options: {}}}) => {
  try {
    clipped.config['webpack'] = new Chain()
    clipped.config.webpack.merge({
      context: clipped.config.context,
      output: {
        pathinfo: true,
        path: clipped.config.dist
      },
      externals: {
        // react-native and nodejs socket excluded to make skygear work
        'react-native': 'undefined',
        'websocket': 'undefined'
      },
      resolveLoader: {
        modules: [
          'node_modules',
          clipped.resolve('node_modules'),
          path.join(__dirname, 'node_modules')
        ]
      },
      resolve: {
        alias: {
          '@': clipped.config.src,
          '~': clipped.config.src
        },
        extensions: ['*', '.js', '.vue', '.jsx', '.json', '.marko', '.ts', '.tsx'],
        modules: [
          'node_modules',
          clipped.resolve('node_modules'),
          path.join(__dirname, 'node_modules')
        ]
      },
      // devServer: {
      //   contentBase: clipped.resolve('dist'),
      //   port: 8080,
      //   historyApiFallback: true,
      //   noInfo: true,
      //   overlay: true,
      //   hot: true
      // },
      performance: {
        hints: false
      },
      devtool: false,
      plugins: [
        new CleanWebpackPlugin([clipped.config.dist]),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: process.env.NODE_ENV ? '"production"' : '"development"'
          }
        }),
        new webpack.HotModuleReplacementPlugin()
      ]
    })

    clipped.config.webpack
      .entry('index')
      .add(path.join(clipped.config.src, 'index.js'))
      .end()

    clipped.config.webpack.module
      .rule('babel')
      .test(/\.jsx?$/)
      .include
      .add(clipped.config.src)
      .end()
      .use('babel')
      .loader(require.resolve('babel-loader'))
      .options(Object.assign({
        presets: [
          [require.resolve('babel-preset-env'), { modules: false }]
        ]
      }, opt.babel.options))

    const getWebpackInstance = () =>
      webpack(clipped.config.webpack.toConfig())

    // clipped.on('dev', async () => {
    //   await webpackDevServer(webpack(config.webpack.toConfig()))
    // })

    clipped.hook('watch')
      .add('default', clipped =>
        new Promise((resolve, reject) => {
          const webpackInstance = getWebpackInstance()
          webpackInstance.watch({}, (err, stats) => {
            if (err || stats.hasErrors()) {
              console.error(err)
              reject(err)
            }

            console.log(stats.toString({
              chunks: false, // Makes the build much quieter
              colors: true // Shows colors in the console
            }))
            // resolve()
          })
        })
      )

    clipped.hook('build')
      .add('default', clipped =>
        new Promise((resolve, reject) => {
          const webpackInstance = getWebpackInstance()
          webpackInstance.run((err, stats = {}) => {
            if (err || stats.hasErrors()) {
              console.error(err)
              reject(err)
            }

            console.log(stats.toString({
              chunks: false, // Makes the build much quieter
              colors: true // Shows colors in the console
            }))
            resolve()
          })
        })
      )
  } catch (e) {
    console.error(e)
    process.exit(0)
  }
}
