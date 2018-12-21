module.exports = () => [
  api => api.describe({
    id: 'org.clipped.typescript',
    name: 'Typescript plugin',
    description: 'Provides support for Typescript',
    after: ['org.clipped.webpack']
  }),
  {
    typescript: {
      compilerOptions: {
        lib: ['es2015'],
        target: 'es5',
        strict: true,
        declarationMap: true,
        sourceMap: true
      },
      include: ['./src/**/*'],
      exclude: ['node_modules']
    },
    webpack(cfg, api) {
      cfg.module.rules.set('ts', {
        test: /\.tsx?$/,
        include: [api.config.src],
        exclude: /(node_modules|bower_components)/,
        use: [{
          key: 'ts',
          value: {
            loader: require.resolve('ts-loader'),
            options: {}
          }
        }]
      })
      cfg.module.rules.alias('ts.options.compilerOptions', () => api.config.typescript.compilerOptions)
    },
    rollup(cfg, api) {
      cfg.plugins
        .use('typescript', require('rollup-plugin-typescript2'), [{}])
        .alias('typescript.args.0.tsconfigOverride', () => api.config.typescript)
    }
  }
]
