const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const proxy = require('webpack-proxy')

const hasDeps = (deps = []) => {
  try {
    deps.map(require)
  } catch (error) {
    return false
  }
  return true
}

module.exports = ({target = 'web'} = {}) => [
  api => api.describe({
    id: 'org.clipped.webpack',
    name: 'Webpack plugin',
    description: 'Provides support for Webpack bundler'
  }),
  ({config, resolve}) => ({
    webpack: {
      mode: process.env.NODE_ENV,
      context: config.context,
      entry: {
        index: [config.src]
      },
      output: {
        pathinfo: true,
        path: config.dist,
        publicPath: '/'
      },
      externals: {
        'react-native': 'undefined',
        'websocket': 'undefined'
      },
      resolveLoader: {
        modules: [
          'node_modules',
          path.join(__dirname, 'node_modules')
        ]
      },
      resolve: {
        alias: {
          '@': config.src,
          '~': config.src
        },
        extensions: ['*', '.wasm', '.mjs', '.js', '.vue', '.jsx', '.json', '.marko', '.ts', '.tsx', '.mdx'],
        modules: [
          'node_modules',
          resolve('node_modules'),
          path.join(__dirname, 'node_modules')
        ]
      },
      performance: {
        hints: false
      },
      devServer: {
        contentBase: config.dist,
        publicPath: '/',
        port: process.env.PORT || 8080,
        host: process.env.HOST || 'localhost',
        https: false,
        stats: false, // quiet
        hot: true,
        overlay: true,
        compress: true,
        historyApiFallback: true,
        disableHostCheck: true,
        watchOptions: {
          ignored: [
            config.dist,
            /node_modules/
          ]
        }
      },
      devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
      plugins: [],
      module: {
        rules: []
      }
    }
  }),
  {
    webpack(cfg, api) {
      cfg.set('module.rules.js', {
        test: /\.jsx?$/,
        include: [api.config.src],
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'buble-loader'}]
      })
      //
      // const paths = ['node_modules']
      //
      // // loader name, options, needed deps
      // const styles = {
      //   css: [],
      //   less: ['less', {paths}],
      //   sass: ['sass', {indentedSyntax: true, includePaths:paths}, ['node-sass']],
      //   scss: ['sass', {includePaths: paths}, ['node-sass']],
      //   stylus: ['stylus', {paths}],
      //   styl: ['stylus', {paths}]
      // }
      //
      // cfg['resolve.extensions'].push(...Object.values(styles).filter(item => item[0]).map(item => '.' + item[0]))
      //
      // for (ext in styles) {
      //   const item = styles[ext]
      //
      //   if (!hasDeps((item[2] || []).concat([`${ext}-loader`]))) return
      //
      //   cfg.module.rules.set(ext, {
      //     test: new RegExp(`\\.${ext}$`),
      //     include: [api.config.src],
      //     use: [
      //       {key: 'style', value: require.resolve('style-loader')},
      //       {key: 'css', value: require.resolve('css-loader')},
      //       {key: 'postcss', value: {
      //         loader: require.resolve('postcss-loader'),
      //         options: {
      //           // Necessary for external CSS imports to work
      //           // https://github.com/facebookincubator/create-react-app/issues/2677
      //           ident: 'postcss',
      //           plugins: [
      //             require('postcss-flexbugs-fixes'),
      //             require('autoprefixer')({
      //               browsers: [
      //                 '>1%',
      //                 'last 4 versions',
      //                 'Firefox ESR',
      //                 'not ie < 9'
      //               ],
      //               flexbox: 'no-2009',
      //             }),
      //           ],
      //         }
      //       }},
      //       item[0] && {key: ext, value: {loader: require.resolve(`${item[0]}-loader`), options: item[1] || {}}}
      //     ].filter(Boolean)
      //   })
      // }
      //
      // const assets = {
      //   image: [/\.(png|jpe?g|gif|svg)(\?.*)?$/],
      //   audio: [/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/],
      //   font: [/\.(woff2?|eot|ttf|otf)(\?.*)?$/]
      // }
      //
      // for (target in assets) {
      //   const asset = assets[target]
      //   cfg.module.rules.set(target, {
      //     test: asset[0],
      //     include: [api.config.src],
      //     use: [{
      //       key: 'url',
      //       value: {
      //         loader: require.resolve('url-loader'),
      //         options: {
      //           limit: 10000,
      //           name: '[name].[hash:7].[ext]'
      //         }
      //       }
      //     }]
      //   })
      // }
      //
      // cfg.plugins
      //   .use('friendly-errors', require('friendly-errors-webpack-plugin'), [{
      //     onErrors: (severity, errors) => {
      //       if (severity !== 'error') {
      //         return;
      //       }
      //       const error = errors[0];
      //       require('node-notifier').notify({
      //         title: api.config.packageJson.name,
      //         message: severity + ': ' + error.name,
      //         subtitle: error.file || '',
      //         icon: path.join(__dirname, 'api.png')
      //       });
      //     }
      //   }])

      if (process.env.NODE_ENV === 'development') {
        api.hook('pre')
          .add('proxy', () => {
            cfg.module.rules.set('js.use', proxy(cfg.module.rules.js.use))
            if (cfg.module.rules.ts) {
              cfg.module.rules.set('ts.use', proxy(cfg.module.rules.ts.use))
            }
          })
        }
    }
  },
  api => {
    api.hook('watch')
      .add('webpack', api =>
        new Promise((resolve, reject) => {
          const webpackInstance = webpack(api.config.webpack.toJSON())
          webpackInstance.watch({}, (err, stats) => {
            if (err || stats.hasErrors()) {
              console.error(err)
            }

            api.print(stats.toString({
              chunks: false, // Makes the build much quieter
              colors: true // Shows colors in the console
            }))
          })
        })
      )

    api.hook('build')
      .add('webpack', api =>
        new Promise((resolve, reject) => {
          process.env.NODE_ENV = 'production'

          api.config.webpack.plugins
            .use('clean', require('clean-webpack-plugin'), [
              [api.config.dist],
              {root: api.config.context}
            ])

          const webpackInstance = webpack(api.config.webpack.toConfig())
          webpackInstance.run((err, stats = {}) => {
            if (err || stats.hasErrors()) {
              console.error(err)
              reject(err)
            }

            api.print(stats.toString({
              chunks: false, // Makes the build much quieter
              colors: true // Shows colors in the console
            }))
            resolve()
          })
        })
      )
  },
  api => api.config.target === 'node' && [
    {
      webpack(cfg, api) {
        cfg
          .set('target', 'node')
          .set('node', {
            __filename: false,
            __dirname: false
          })
          .set('externals', require('webpack-node-externals')({
            whitelist: [
              /\.(eot|woff|woff2|ttf|otf)$/,
              /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
              /\.(mp4|mp3|ogg|swf|webp)$/,
              /\.(css|scss|sass|less|styl)$/,
              /^webpack/
            ]
          }))
          .set('output.libraryTarget', 'commonjs2')

        cfg.plugins
          .use('banner', webpack.BannerPlugin,  [{
            raw: true,
            entryOnly: false,
            banner: `require('${
              // Is source-map-support installed as project dependency, or linked?
              (require.resolve('source-map-support').indexOf(process.cwd()) === 0)
                // If it's resolvable from the project root, it's a project dependency.
                ? 'source-map-support/register'
                // It's not under the project, it's linked via lerna.
                : require.resolve('source-map-support/register')
            }')`
          }])
      }
    },
    api => {
      api.hook('dev')
      .add('watch-and-nodemon', [
        api => api.execHook('watch'),
        api => new Promise((resolve, reject) => {
          const main = api.config.packageJson.main ? api.resolve(api.config.packageJson.main) : api.config.dist

          nodemon({
            // Main field in package.json or dist/index.js
            script: main || api.config.main || api.config.dist,
            ext: 'js json',
            ignore: ["test/*", "docs/*"]
          })

          nodemon.on('start', function () {
            api.print('🚀 App has started')
          }).on('quit', function () {
            api.print('☠️ App has quit')
            process.exit();
          }).on('restart', function (files) {
            api.print('🔃 App restarted due to: ', files)
          })
        })
      ])
    }
  ],
  api => api.config.target === 'web' && [
    {
      webpack(cfg) {
        cfg.plugins.use('html', require('html-webpack-plugin'), [{
          baseHref: '/',
          template: require.resolve('html-webpack-template/index.ejs'),
          inject: true,
          appMountId: 'app',
          mobile: true
        }])

        if (process.env.NODE_ENV === 'development') {
          cfg.plugins
            .use('hot-module', webpack.HotModuleReplacementPlugin, [])
        }
      }
    },
    api => {
      api.hook('dev')
        .add('webpack-dev-server', api => {
          return new Promise((resolve, reject) => {
            for (key in api.config.webpack.entry.toConfig()) {
              api.config.webpack.entry[key]
                .set('only-dev-server', require.resolve('webpack/hot/only-dev-server'))
                .set('dev-server', require.resolve(`webpack-dev-server/client`))
            }

            new WebpackDevServer(
              webpack(api.config.webpack.toConfig())
            ).listen(api.config.webpack.devServer.port, api.config.webpack.devServer.host, (err, result) => {
              if (err) {
                reject(err)
              }
              api.print(`🚀 App has started on http${api.config.webpack.devServer.https ? 's' : ''}://${api.config.webpack.devServer.host}:${api.config.webpack.devServer.port}`)
            })
          })
        })
    }
  ],
]
