const path = require('path')
const rollup = require('rollup')
// const {uglify} = require('rollup-plugin-uglify')
// const {minify} = require('uglify-es')

module.exports = ({name = null, type = 'library', babel = {}, formats = ['cjs'], commonjs = {}, postcss = {}, globals = {}, external = [], moduleName = '', alias = {}, replace = {}} = {}) => [
  babel && require('@clipped/plugin-babel')({type, ...babel}),
  {
    rollup: {
      external,
      plugins: []
    }
  },
  {
    rollup(cfg, {config}) {
      cfg.input = path.resolve(config.src, 'index.js')
      cfg.output = formats.map(format => ({
        name: moduleName,
        file: path.resolve(config.dist, `${name || config.packageJson.name}.${format}.js`),
        format,
        globals,
        sourcemap: true
      }))

      // Support babel
      if (babel) {
        cfg.plugins
          .use('babel', require('rollup-plugin-babel'), [{}])
          .alias('babel.args.0', () => config.babel)
      }

      if (postcss) {
        cfg.plugins
          .use('postcss', require('rollup-plugin-postcss'), [{
            extract: true,
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: true,
            ...postcss
          }])
      }

      if (commonjs) {
        cfg.plugins.use('commonjs', require('rollup-plugin-commonjs'), [commonjs])
      }

      if (Object.keys(alias).length > 0) {
        cfg.plugins.use('alias', require('rollup-plugin-alias'), [alias])
      }

      if (Object.keys(replace).length > 0) {
        cfg.plugins.push(require('rollup-plugin-replace')(replace).transform)
      }

      if (process.env.NODE_ENV === 'development') {
        cfg.plugins.use('progress', require('rollup-plugin-progress'), [{}])
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
        if (babel) {
          cfg.plugins.use('babel-minify', require('rollup-plugin-babel-minify'), [{}])
        } else {
          cfg.plugins.use('uglify', uglify, [{}, minify])
        }
      }

      cfg.plugins.use('multi-entry', require('rollup-plugin-multi-entry'), [])
    }
  },
  api => {
    api.hook('build')
      .add('rollup', async api => {
        const bundle = await rollup.rollup(api.config.rollup.toConfig())
        await Promise.all([].concat(api.config.rollup.toConfig().output).map(bundle.write))
      })

    api.hook('watch')
      .add('rollup', async api => {
        if (!api.config.rollup.plugins.has('progress')) {
          api.config.rollup.plugins.use('progress', require('rollup-plugin-progress'), [{}])
        }

        return new Promise((resolve, reject) => {
          const watcher = rollup.watch({
            ...api.config.rollup.toConfig(),
            watch: {
              clearScreen: true
            }
          })
          watcher.on('event', async e => {
            switch (e.code) {
              case 'BUNDLE_START':
                api.print('🚀  Watch mode started')
                break
              case 'ERROR':
              case 'FATAL':
                reject(e.error)
                break
              case 'BUNDLE_END':
                process.exitCode = 0
                api.print('Finished bundling, waiting for file change...')
                break                
            }
          })
        })
      })
  }
]
