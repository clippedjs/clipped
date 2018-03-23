const path = require('path')

module.exports = async clipped => {
  clipped.rollup = require('rollup')

  clipped.config.rollup = [{
    input: path.resolve(clipped.config.src, 'index.js'),
    output: {
      file: path.resolve(clipped.config.dist, 'index.js'),
      format: 'cjs'
    },
    plugins: [
      require('rollup-plugin-flow')({all: true, pretty: true}),
      require('rollup-plugin-babel')({
        exclude: ['node_modules/**'],
        presets: [
          [require.resolve('babel-preset-backpack')],
          // [require.resolve('babel-preset-flow')]
        ],
        plugins: [
          // require.resolve('babel-plugin-transform-flow-strip-types'),
          // require.resolve('babel-plugin-syntax-flow'),
          require.resolve('babel-plugin-external-helpers')
        ]
      }),
      require('rollup-plugin-node-resolve')({
        jsnext: true,
        main: true,
        preferBuiltins: true
      }),
      require('rollup-plugin-commonjs')({
        namedExports: {
          'node_modules/lodash/index.js': [ 'castArray' ]
        }
      })
    ]
  }]

  clipped.hook('build')
    .add('default', async clipped => {
        await Promise.all(
          clipped.config.rollup.map(
            async (config) => {
              const bundle = await clipped.rollup.rollup(config.toJSON())
              await bundle.write(config.toJSON().output)
            })
        )
    })
}
