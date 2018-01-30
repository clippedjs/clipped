const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const Chain = require('webpack-chain')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (clipped, opt = {babel: {options: {}}}) => {
  clipped.config.dev = {enableLint: false}
  
  try {
    clipped.config.webpack = {
      context: clipped.config.context,
      entry: {
        index: [path.join(clipped.config.src, 'index.js')]
      },
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
      performance: {
        hints: false
      },
      devtool: false,
      plugins: [],
      module: {
        rules: []
      }
    }

    clipped.config.webpack
      .plugins
        .use('clean', CleanWebpackPlugin, [clipped.config.dist])
        .use('define', webpack.DefinePlugin, [{
          'process.env': {
            NODE_ENV: process.env.NODE_ENV ? '"production"' : '"development"'
          }
        }])
        .use('hot', webpack.HotModuleReplacementPlugin)

    clipped.config.webpack
      .module
        .rules
          .set('babel', {
            test: /\.jsx?$/,
            include: [clipped.config.src],
            exclude: /(node_modules|bower_components)/,
            use: []
          })
            .babel
              .use
                .add('babel', {
                  loader: require.resolve('babel-loader'),
                  options: {
                    presets: [
                      [require.resolve('babel-preset-env'), { modules: false }]
                    ]
                  }
                })

    const getWebpackInstance = () =>
      webpack(clipped.config.webpack.toJSON())

    clipped.hook('watch')
      .add('default', clipped =>
        new Promise((resolve, reject) => {
          const webpackInstance = getWebpackInstance()
          webpackInstance.watch({}, (err, stats) => {
            if (err || stats.hasErrors()) {
              console.error(err)
            }

            console.log(stats.toString({
              chunks: false, // Makes the build much quieter
              colors: true // Shows colors in the console
            }))
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
