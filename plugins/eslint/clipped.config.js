module.exports = ({fix = true, useEslintrc = false, format = 'codeframe', test = /\.(j|t)sx?$/} = {}) => [
  {
    eslint: {
      globals: [],
      plugins: [],
      extends: [],
      rules: {},
      overrides: []
    },
    webpack(cfg, api) {
      cfg.module.rules.set('eslint', {
        enforce: "pre",
        test,
        exclude: /node_modules/,
        loader: require.resolve('eslint-loader'),
      })

      cfg.module.rules.eslint.alias('options', () => api.config.eslint)
    }
  },
  api => {
    api.hook('lint')
      .add('eslint', api => {
        const engine = new (require("eslint").CLIEngine)({
          fix,
          root: true,
          env: {node: true},
          baseConfig: useEslintrc ? undefined : api.config.eslint.toConfig(),
          useEslintrc
        })
        const formatter = engine.getFormatter(format)
        const report = engine.executeOnFiles([api.config.src])

        if (report.errorCount || report.warningCount) { 
          api.print(formatter(report.results))
        } else {
          api.print(report.results.some(f => f.output) ? 'All lint errors auto-fixed' : 'No lint errors found')
        }
      })
  }
]
