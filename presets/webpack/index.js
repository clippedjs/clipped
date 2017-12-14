const path = require('path')
const webpack = require('webpack')
// const webpackDevServer = require('webpack-dev-server')
const Chain = require('webpack-chain')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (clipped, opt = {}) => {
  clipped.config['webpack'] = new Chain()
  clipped.config.webpack.merge({
    context: clipped.resolve('./'),
    output: {
      pathinfo: true,
      path: clipped.resolve('dist')
    },
    externals: {
      // react-native and nodejs socket excluded to make skygear work
      'react-native': 'undefined',
      'websocket': 'undefined'
    },
    resolveLoader: {
      modules: [
        clipped.resolve('node_modules'),
        path.join(__dirname, 'node_modules'),
      ],
    },
    resolve: {
      alias: {
        '@': clipped.resolve('src'),
        '~': clipped.resolve('src')
      },
      extensions: ['*', '.js', '.vue', '.jsx', '.json', '.marko', '.ts', '.tsx'],
      modules: [
        clipped.resolve('node_modules'),
        path.join(__dirname, 'node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [clipped.resolve('src')],
          exclude: [/node_modules/],
          options: {
            presets: [
              ['babel-preset-env', { modules: false }]
            ]
          }
        }
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
      new CleanWebpackPlugin([clipped.resolve('dist')]),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: process.env.NODE_ENV ? '"production"' : '"development"'
        },
      }),
      // new webpack.HotModuleReplacementPlugin()
    ]
  })

  clipped.config.webpack
    .entry('index')
      .add(clipped.resolve('src/index.js'))
      .end()

  const getWebpackInstance = () =>
    webpack(clipped.config.webpack.toConfig())

  // clipped.on('dev', async () => {
  //   await webpackDevServer(webpack(config.webpack.toConfig()))
  // })

  clipped.on('watch', clipped =>
    new Promise((resolve, reject) => {
      const webpackInstance = getWebpackInstance()
      webpackInstance.watch({}, (err, stats) => {
        if (err || stats.hasErrors()) {
          console.error(err)
          reject(err)
        }

        console.log(stats.toString({
          chunks: false,  // Makes the build much quieter
          colors: true    // Shows colors in the console
        }))
        // resolve()
      })
    })
  )

  clipped.on('build', clipped =>
    new Promise((resolve, reject) => {
      const webpackInstance = getWebpackInstance()
      webpackInstance.run((err, stats) => {
        if (err || stats.hasErrors()) {
          console.error(err)
          reject(err)
        }

        console.log(stats.toString({
          chunks: false,  // Makes the build much quieter
          colors: true    // Shows colors in the console
        }))
        resolve()
      })
    })
  )
}
