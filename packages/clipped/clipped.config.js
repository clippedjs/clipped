const glob = require('glob')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = async clipped => {
  await clipped.use(require('clip-webpack-nodejs'))

  clipped.config.webpack
    .mark()
      .resolve
        .set('symlinks', true)
    .back()
      .resolveLoader
        .set('symlinks', true)
    .back()
      .set('externals', [
        nodeExternals({
          modulesFromFile: true,
          whitelist: [/^webpack/]
        })
      ])

  clipped.config.webpack
    .plugins
      .mark()
        .banner
          .modify('args', args => {
            args[0].banner = "require('source-map-support/register')"
            return args
          })

  clipped.config.webpack
    .mark()
      .module
        .rules
          .set('shebang', {
            test: /node_modules[/\\]jsonstream/i,
            loader: require.resolve('shebang-loader')
          })
          .set('rx', {
            test: /rx\.lite\.aggregates\.js/,
            loader: `${require.resolve('imports-loader')}?define=>false`
          })
    .back()
      .plugins
        .use('ignore-electron', webpack.IgnorePlugin, [/^electron$/])

  if (process.env.NODE_ENV === 'test') {
    clipped.config.webpack
      .mark()
        .entry
          .set('index', glob.sync('./test/**/*.test.js'))
      .back()
        .output
          .set('path', clipped.resolve('test-dist'))

    
    clipped.config.webpack
      .module
        .rules
          .babel
            .include
              .add(clipped.resolve('test'))
  }

  clipped.hook('pre-test')
    .add('build', clipped => clipped.execHook('build'))
  clipped.hook('test')
    .add('placeholder', clipped => {})
}
