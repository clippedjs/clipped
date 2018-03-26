const path = require('path')

module.exports = clipped => {
  clipped.webpack = require('webpack')

  clipped.config.set('mode', process.env.NODE_ENV && process.env.NODE_ENV.includes('dev') ? 'development' : 'production')

  clipped.config.set('webpack', {
    mode: clipped.config.mode,
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
  })

  clipped.config.webpack
    .set('module.rules.js', {
      test: /\.jsx?$/,
      include: [clipped.config.src],
      exclude: /(node_modules|bower_components)/,
      use: [{
        key: 'babel',
        value: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [{
              key: 'poi',
              value: [require.resolve('babel-preset-poi')]
            }],
            plugins: []
          }
        }
      }]
    })

  clipped.config.webpack
    .plugins
      .use('bar', require('webpackbar'))
      .use('friendly-errors', require('friendly-errors-webpack-plugin'), [{
        onErrors: (severity, errors) => {
          if (severity !== 'error') {
            return;
          }
          const error = errors[0];
          require('node-notifier').notify({
            title: clipped.config.packageJson.name,
            message: severity + ': ' + error.name,
            subtitle: error.file || '',
            icon: path.join(__dirname, 'clipped.png')
          });
        }
      }])

  clipped.config.webpack.devServer = {quiet: true}

  if (clipped.config.webpack.mode === 'production') {
    clipped.config.webpack
      .plugins
        .use('clean', require('clean-webpack-plugin'), [
          [clipped.config.dist],
          {root: clipped.config.context}
        ])
  }

  const getWebpackInstance = () =>
    clipped.webpack(clipped.config.webpack.toJSON())

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
          process.env.NODE_ENV = 'production'

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
}
