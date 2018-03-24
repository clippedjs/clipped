const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const optionalRequire = require("optional-require")(require);

module.exports = async clipped => {
  clipped.config.dockerTemplate = path.resolve(__dirname, 'docker-template')

  await clipped.use(require('@clipped/preset-webpack4'))

  const useUrlLoader = () => ({
    key: 'url',
    value: {
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: '[name].[hash:7].[ext]'
      }
    }
  })

  const getPostcssOptions = () => ({
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9'
        ],
        flexbox: 'no-2009',
      }),
    ],
  })

  const useStyle = [
    {key: 'style', value: require.resolve('style-loader')},
    {key: 'css', value: require.resolve('css-loader')},
    {key: 'postcss', value: {
      loader: require.resolve('postcss-loader'),
      options: getPostcssOptions()
    }}
  ]

  clipped.config.webpack['module.rules']
      // Assets
      .set('image', {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [clipped.config.src],
        use: [useUrlLoader()]
      })
      .set('audio', {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        include: [clipped.config.src],
        use: [useUrlLoader()]
      })
      .set('font', {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: [clipped.config.src],
        use: [useUrlLoader()]
      })
      // Styles
      .set('css', {
        test: /\.css$/,
        include: [clipped.config.src],
        use: [...useStyle]
      })
      .set('scss', {
        test: /\.scss$/,
        include: [clipped.config.src],
        use: [
          ...useStyle,
          ...optionalRequire.resolve('sass-loader') ? [{
            key: 'sass',
            value: {
              loader: optionalRequire.resolve('sass-loader')
            }
          }]
          : []
        ]
      })
      .set('sass', {
        test: /\.sass$/,
        include: [clipped.config.src],
        use: [
          ...useStyle,
          ...optionalRequire.resolve('sass-loader') ? [{
            key: 'sass',
            value: {
              loader: optionalRequire.resolve('sass-loader'),
              options: {
                indentedSyntax: true
              }
            }
          }]
          : []
        ]
      })

  // Vuejs
  clipped.config.vue = !!clipped.config.packageJson.dependencies.vue || clipped.config.vue
  if (clipped.config.vue) {
    clipped.config.webpack
    .set('module.rules.vue', {
      test: /\.vue$/,
      include: [clipped.resolve('src')],
      use: [{
        key: 'vue',
        value: {
          loader: require.resolve('vue-loader'),
          options: {
            loaders: {
              'scss': [require.resolve('vue-style-loader'), ...useStyle.slice(0, -1), {key: 'sass', value: optionalRequire.resolve('sass-loader')}],
              'sass': [require.resolve('vue-style-loader'), ...useStyle.slice(0, -1), {key: 'sass', value: optionalRequire.resolve('sass-loader') + '?indentedSyntax'}],
              'stylus': [require.resolve('vue-style-loader'), ...useStyle.slice(0, -1), {key: 'stylus', value: optionalRequire.resolve('stylus-loader')}],
              'postcss': getPostcssOptions()
            }
          }
        }
      }]
    })
    .set('resolve.alias.vue', 'vue/dist/vue.js')
  }

  // Reactjs
  clipped.config.react = !!clipped.config.packageJson.dependencies.react || clipped.config.react
  if (clipped.config.react) {
    clipped.config.webpack
      .set(
        'module.rules.js.use.babel.options.presets.poi',
        [clipped.config.webpack['module.rules.js.use.babel.options.presets.poi'][0], {jsx: 'react'}]
      )
      .set(
        `module.rules.js.use.babel.options.plugins`,
        [{
          key: 'react-hot',
          value: [require.resolve('react-hot-loader/babel')]
        }]
      )
    if (clipped.config.webpack.mode === 'development') {
      Object.keys(clipped.config.webpack.entry.toJSON()).map(key => {
        clipped.config.webpack.entry[key].unshift(require.resolve('react-hot-loader/patch'))
      })
    }
  }

  // HTML template
  clipped.config.webpack
    .plugins
      .use('html', require('html-webpack-plugin'), [{
        template: require.resolve('html-webpack-template/index.ejs'),
        inject: false,
        appMountId: 'root',
        mobile: true
      }])

  if (clipped.config.webpack.mode === 'production') {
    // Chunk and hash
    clipped.config.webpack
      .set('output.chunkFilename',  '[name].[chunkhash].js')
      .set('output.filename', '[name].[chunkhash].js')
      .set('optimization', {
        splitChunks: {
         chunks: 'all',
         name: 'common',
        },
        runtimeChunk: {
         name: 'runtime',
        },
        minimize:true
      })
      .plugins
        .use('split-chunk', clipped.webpack.optimize.SplitChunksPlugin, [{
          chunks: "all",
          minSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: true
        }])
        .use('hash-output', require('webpack-plugin-hash-output'), [{
          manifestFiles: [
              // Because 'vendor' will contain the webpack manifest that references
              // other entry points
              'vendor'
          ]}
        ])

    // PWA
    if (clipped.config.pwa) {
      clipped.config.webpack
        .plugins
          .use('offline', require('offline-plugin'), [{
            autoUpdate: 1000 * 60 * 5,
            caches: {
              main: [
                '*.css',
                '*.*.js'
              ]
            },
            ServiceWorker: {
              output: 'service-worker.js',
              navigateFallbackURL: '/',
              // NOTE: disable minify temporarily until the plugin is updated for webpack4
              // https://github.com/NekR/offline-plugin/issues/351
              minify: false
            }
          }])
          .use('pwa-manifest', require('webpack-pwa-manifest'), [{
            filename: 'manifest.json',
            name: '',
            short_name: '',
            description: '',
            background_color: '#fff',
            theme_color: '#4990e2',
            'theme-color': '#4990e2',
            start_url: '/',
            icons: []
          }])
    }
  }

  // Dev server
  clipped.hook('dev')
    .add('webpack-dev-server', clipped =>
      new Promise((resolve, reject) => {
        const HOST = 'localhost'
        const PORT = process.env.PORT || clipped.config.port || 8080
        const url = `http://${HOST}:${PORT}`

        Object.keys(clipped.config.webpack.entry.toJSON()).map(key => {
          clipped.config.webpack.entry[key]
            .set('only-dev-server', 'webpack/hot/only-dev-server')
            .set('dev-server', `webpack-dev-server/client?http://${HOST}:${PORT}`)
        })

        clipped.config.webpack
          .plugins
            .use('hot', clipped.webpack.HotModuleReplacementPlugin)

        const compiler = clipped.webpack(clipped.config.webpack.toJSON())

        new WebpackDevServer(
          compiler,
          {
            contentBase: clipped.config.dist,
            port: clipped.config.port || 8080,
            https: false,
            historyApiFallback: true,
            noInfo: false,
            overlay: true,
            hot: true,
            headers: {
              'access-control-allow-origin': '*'
            },
            watchOptions: {
              ignored: /node_modules/
            },
            quiet: false,
            publicPath: '/',
            stats: {
              assets: false,
              children: false,
              chunks: false,
              colors: true,
              errors: true,
              errorDetails: true,
              hash: false,
              modules: false,
              publicPath: false,
              timings: false,
              version: false,
              warnings: true
            },
            ...clipped.config.webpack.toJSON().devServer
          }
        ).listen(PORT, HOST, (err, result) => {
          if (err) {
            reject(err)
          }
          console.log(`Starting server on ${url}`)
        })
      })
    )
}
