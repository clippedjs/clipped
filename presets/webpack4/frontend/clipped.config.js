const path = require('path')
const webpack = require('webpack')

module.exports = async clipped => {
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

  clipped.config.webpack
    ['module.rules']
      // Assets
      .set('.image', {
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
        use: [...useStyle, {
          key: 'sass',
          value: {
            loader: require.resolve('sass-loader')
          }
        }]
      })
      .set('sass', {
        test: /\.sass$/,
        include: [clipped.config.src],
        use: [...useStyle, {
          key: 'sass',
          value: {
            loader: require.resolve('sass-loader'),
            options: {
              indentedSyntax: true
            }
          }
        }]
      })

  // Vuejs
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
              'scss': [require.resolve('vue-style-loader'), ...useStyle, require.resolve('sass-loader')],
              'sass': [require.resolve('vue-style-loader'), ...useStyle, require.resolve('sass-loader') + '?indentedSyntax'],
              'stylus': [require.resolve('vue-style-loader'), ...useStyle, require.resolve('stylus-loader')]
            }
          }
        }
      }]
    })
    .set('resolve.alias.vue', 'vue/dist/vue.js')

  // Reactjs
  clipped.config.webpack
    .set(
      'module.rules.js.use.babel.options.presets.react',
      [require.resolve('babel-preset-react')]
    )

  // HTML template
  clipped.config.webpack
    .plugins
      .use('html', require('html-webpack-plugin'))

  if (clipped.config.webpack.mode === 'production') {
    // Chunk and hash
    clipped.config.webpack
      .set('output.chunkFilename',  '[name].[chunkhash].js')
      .set('output.filename', '[name].[chunkhash].js')
      .plugins
        .use('split-chunk', webpack.optimize.SplitChunksPlugin, [{
          chunks: "all",
          minSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: true
        }])
        .use('md5-hash', require('webpack-md5-hash'))
  }

  // Dev server
  clipped.hook('dev')
    .add('webpack-dev-server', clipped =>
      new Promise((resolve, reject) => {
        const HOST = 'localhost'
        const PORT = clipped.config.port || 8080
        const url = `http://${HOST}:${PORT}`

        clipped.config.webpack
          .entry
            .index
              .add('dev-server', `webpack-dev-server/client?http://${HOST}:${PORT}`, 0)
              .add('only-dev-server', 'webpack/hot/only-dev-server', 0)
        clipped.config.webpack
          .plugins
            .use('hot', clipped.webpack.HotModuleReplacementPlugin)

        const compiler = webpack(clipped.config.webpack.toJSON())
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
            ...clipped.config.webpack.devServer.toJSON()
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
