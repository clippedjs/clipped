const path = require('path')
const presetWebpack = require('clipped-preset-webpack')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')
const merge = require('deepmerge')

module.exports = async (clipped) => {
  clipped.config.dockerTemplate = path.resolve(__dirname, 'docker-template')

  if (!clipped.config.webpackFrontend) clipped.config.webpackFrontend = {}
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
    .use('style')
    .loader(require.resolve('style-loader'))
    .loader(require.resolve('css-loader'))

  clipped.config.webpack.module
    .rule('stylus')
    .test(/\.styl$/)
    .include
    .add(clipped.resolve('src'))
    .end()
    .use('style')
    .loader(require.resolve('style-loader'))
    .loader(require.resolve('css-loader'))
    .loader(require.resolve('stylus-loader'))

  clipped.config.webpack.module
    .rule('scss')
    .test(/\.scss$/)
    .include
    .add(clipped.resolve('src'))
    .end()
    .use('style')
    .loader(require.resolve('style-loader'))
    .loader(require.resolve('css-loader'))
    .loader(require.resolve('sass-loader'))

  clipped.config.webpack.module
    .rule('sass')
    .test(/\.sass$/)
    .include
    .add(clipped.resolve('src'))
    .end()
    .use('style')
    .loader(require.resolve('style-loader'))
    .loader(require.resolve('css-loader'))
    .loader(require.resolve('sass-loader'))
    .options({
      indentedSyntax: true
    })

  clipped.config.webpack.module
    .rule('vue')
    .test(/\.vue$/)
    .include
    .add(clipped.resolve('src'))
    .end()
    .use('vue')
    .loader(require.resolve('vue-loader'))
    .options({
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
    })
  clipped.config.webpack.resolve.alias
    .set('vue', 'vue/dist/vue.js')

  clipped.config.webpack
    .plugin('html')
    .use(HtmlWebpackPlugin, [{
      template: require.resolve('html-webpack-template/index.ejs'),
      inject: false,
      appMountId: 'root'
    }])

  clipped.config.webpack.module
    .rule('babel')
    .use('babel')
    .tap(options => merge(options, {presets: [require.resolve('babel-preset-react')]}))

  clipped.config.webpack.merge({
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    plugins: [
      new Webpack.HashedModuleIdsPlugin(),
      new Webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new Webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      })
    ]
  })

  console.log(JSON.stringify(clipped.config.webpack.toConfig().module.rules, null, 2))

  clipped.hook('dev')
    .add('webpack-dev-server', clipped =>
      new Promise((resolve, reject) => {
        const HOST = 'localhost'
        const PORT = clipped.config.webpackFrontend.port || 8080
        const url = `http://${HOST}:${PORT}`

        // clipped.config.webpack.entry('index')
        //   .prepend(require.resolve('webpack/hot/dev-server'))
        //   .prepend(`${require.resolve('webpack-dev-server/client')}?${url}`)

        // console.log(clipped.config.webpack.toConfig())
        const compiler = Webpack(clipped.config.webpack.toConfig())
        new WebpackDevServer(
          compiler,
          {
            contentBase: clipped.config.dist,
            port: clipped.config.webpackFrontend.port || 8080,
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
            ...clipped.config.webpack.toConfig().devServer
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
