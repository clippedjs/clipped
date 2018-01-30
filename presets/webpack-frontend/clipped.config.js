const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')
const merge = require('deepmerge')

module.exports = async (clipped) => {
  try {
  clipped.config.dockerTemplate = path.resolve(__dirname, 'docker-template')

  await clipped.use(require('@clipped/preset-webpack'))

  // Other assets
  clipped.config.webpack
    .module
      .rules
        .mark()
          .set('image', {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            include: [clipped.config.src],
            use: []
          })
            .image
              .use
                .add('url', {
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                  }
                })
        .back()
          .set('audio', {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            include: [clipped.config.src],
            use: []
          })
            .audio
              .use
                .add('url', {
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                  }
                })
        .back()
          .set('font', {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            include: [clipped.config.src],
            use: []
          })
            .font
              .use
                .add('url', {
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                  }
                })

  // Stylesheet
  clipped.config.webpack
    .module
      .rules
        .mark()
          .set('css', {
            test: /\.css$/,
            include: [clipped.config.src],
            use: []
          })
          .css
            .use
              .add('style', require.resolve('style-loader'))
              .add('css', require.resolve('css-loader'))
        .back()
          .set('stylus', {
            test: /\.styl$/,
            include: [clipped.config.src],
            use: []
          })
          .stylus
            .use
              .add('style', require.resolve('style-loader'))
              .add('css', require.resolve('css-loader'))
              .add('stylus', require.resolve('stylus-loader'))
        .back()
          .set('scss', {
            test: /\.scss$/,
            include: [clipped.config.src],
            use: []
          })
          .scss
            .use
              .add('style', require.resolve('style-loader'))
              .add('css', require.resolve('css-loader'))
              .add('sass', require.resolve('sass-loader'))
        .back()
          .set('sass', {
            test: /\.sass$/,
            include: [clipped.config.src],
            use: []
          })
          .sass
            .use
              .add('style', require.resolve('style-loader'))
              .add('css', require.resolve('css-loader'))
              .add('sass', {
                loader: require.resolve('sass-loader'),
                options: {
                  indentedSyntax: true
                }
              })

  // Framework specific
  // Vuejs
  clipped.config.webpack
    .mark()
      .module
        .rules
            .set('vue', {
              test: /\.vue$/,
              include: [clipped.resolve('src')],
              use: []
            })
              .vue
                .use
                  .add('vue', {
                    loader: require.resolve('vue-loader'),
                    options: {
                      loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': [
                          require.resolve('vue-style-loader'),
                          require.resolve('css-loader'),
                          require.resolve('sass-loader')
                        ],
                        'sass': [
                          require.resolve('vue-style-loader'),
                          require.resolve('css-loader'),
                          require.resolve('sass-loader') + '?indentedSyntax'
                        ],
                        'stylus': [
                          require.resolve('vue-style-loader'),
                          require.resolve('css-loader'),
                          require.resolve('stylus-loader')
                        ]
                      }
                    }
                  })
    .back()
      .resolve
        .alias
          .set('vue', 'vue/dist/vue.js')

  // React.js
  clipped.config.webpack
    .module
      .rules
        .babel
          .use
            .babel
              .options
                .presets
                  .add('react', [require.resolve('babel-preset-react')])

  // HTML template plugin
  clipped.config.webpack
    .plugins
      .use('html', HtmlWebpackPlugin, [{
        template: require.resolve('html-webpack-template/index.ejs'),
        inject: false,
        appMountId: 'root'
      }])

  // Chunk and hash
  clipped.config.webpack
    .mark()
      .output
        .set('filename', '[name].[hash].js')
        .set('chunkFilename',  '[hash].js')
    .back()
      .plugins
        .use('hashedModule', Webpack.HashedModuleIdsPlugin)
        .use('vendor-commonsChunk', Webpack.optimize.CommonsChunkPlugin, [{name: 'vendor'}])
        .use('manifest-commonsChunk', Webpack.optimize.CommonsChunkPlugin, [{name: 'manifest', chunks: ['vendor']}])

  clipped.hook('dev')
    .add('webpack-dev-server', clipped =>
      new Promise((resolve, reject) => {
        const HOST = 'localhost'
        const PORT = clipped.config.port || 8080
        const url = `http://${HOST}:${PORT}`

        // clipped.config.webpack.entry('index')
        //   .prepend(require.resolve('webpack/hot/dev-server'))
        //   .prepend(`${require.resolve('webpack-dev-server/client')}?${url}`)

        // console.log(clipped.config.webpack.toJSON())
        const compiler = Webpack(clipped.config.webpack.toJSON())
        new WebpackDevServer(
          compiler,
          {
            contentBase: clipped.config.dist,
            port: clipped.config.port || 8080,
            https: false,
            historyApiFallback: true,
            noInfo: false,
            overlay: true,
            quiet: false,
            publicPath: '/',
            // hot: true,
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
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
