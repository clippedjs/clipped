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

      console.log(clipped.config.webpack.plugins.toJSON())
    
  clipped.config.webpack
    .plugins
      .banner
        .args
          .

  clipped.config.webpack
    .plugin('banner')
    .tap(args => {
      args[0].banner = `require('source-map-support/register')`
      return args
    })

  clipped.config.webpack.module
    .rule('shebang')
    .test( /node_modules[/\\]jsonstream/i)
    .use('shebang').loader(require.resolve('shebang-loader')).end()

  clipped.config.webpack
    .plugin('ignore-electron')
      .use(webpack.IgnorePlugin, [/^electron$/])

  clipped.config.webpack.resolve.modules
    .add('node_modules')
  clipped.config.webpack.resolveLoader.modules
    .add('node_modules')

  clipped.config.webpack.module
    .rule('rx')
    .test(/rx\.lite\.aggregates\.js/)
    .use('import').loader(`${require.resolve('imports-loader')}?define=>false`).end()

  // Compile for testing
  clipped.config.webpack.when(process.env.NODE_ENV === 'test', config => {
    config.entry('index')
      .clear()
      .end()

    config.output
      .path(clipped.resolve('test-dist'))

    for (let entry of glob.sync('./test/**/*.test.js')) {
      config.entry('index')
        .add(entry)
        .end()
    }

    config.module
      .rule('babel')
      .test(/\.js$/)
        .include
        .add(clipped.resolve('test'))
  })

  clipped.hook('pre-test')
    .add('build', clipped => clipped.execHook('build'))
  clipped.hook('test')
    .add('placeholder', clipped => {})
}
