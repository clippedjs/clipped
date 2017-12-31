const glob = require('glob')
const fs = require('fs')

module.exports = async clipped => {
  await clipped.use(require('clipped-preset-webpack-nodejs'))

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
