const path = require('path')
const rollup = require('rollup')

module.exports = ({type = 'library', babel = {}, formats = ['cjs']} = {}) => [
  babel && require('@clipped/plugin-babel')({type, ...babel}),
  {
    rollup: {
      external: [],
      plugins: []
    }
  },
  {
    rollup(cfg, {config}) {
      cfg.input = config.src
      cfg.output = formats.map(format => ({
        file: path.resolve(config.dist, `index.${format}.js`),
        format,
        globals: {},
        sourcemap: true
      }))

      // Support babel
      if (babel) {
        cfg.plugins
          .use('babel', require('rollup-plugin-babel'), [{}])
          .alias('args.0', () => config.babel)
      }

      // if (['umd', 'iife'].includes(cfg.output.format)) {
        cfg.plugins
          .use('node-resolve', require('rollup-plugin-node-resolve'), [{
            main: false,
            module: true,
            jsnext: true,
            extensions: ['.js', '.json'],
            preferBuiltIns: true,
            browser: true
          }])
      // }

      if (process.env.NODE_ENV !== 'development') {
        cfg.plugins.use('uglify', require('rollup-plugin-uglify').uglify, [{}, require('uglify-es').minify])
      }
    }
  },
  api => {
    api.hook('build')
      .add('rollup', async api => {
        const bundle = await rollup.rollup(api.config.rollup.toJSON())
        await bundle.write(config.toConfig().output)
      })
  }
]
