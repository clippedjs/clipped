const {CLIEngine} = require('eslint')
const {rules: standardRules} = require('eslint-config-standard')

module.exports = ({babel = false, fix = true, useEslintrc = false, format = 'codeframe', test = /\.(j|t)sx?$/, standardjs = true} = {}) => [
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
        enforce: 'pre',
        test,
        exclude: /node_modules/,
        loader: require.resolve('eslint-loader')
      })

      cfg.module.rules.eslint.alias('options', () => api.config.eslint)
    }
  },
  standardjs && {
    eslint (cfg) {
      Object.assign(cfg, {
        extends: [
          require.resolve('eslint-config-standard'),
          require.resolve('eslint-config-standard-jsx')
        ],
        // Unfortunately we can't `require.resolve('eslint-plugin-standard')` due to:
        // https://github.com/eslint/eslint/issues/6237
        // ...so we have no choice but to rely on it being hoisted.
        plugins: ['standard'],
        rules: {
          // Disable rules for which there are eslint-plugin-babel replacements:
          // https://github.com/babel/eslint-plugin-babel#rules
          'new-cap': 'off',
          'no-invalid-this': 'off',
          'object-curly-spacing': 'off',
          'semi': 'off',
          'no-unused-expressions': 'off',
          ...(!babel ? {} : {
            // Ensure the replacement rules use the options set by eslint-config-standard rather than ESLint defaults.
            'babel/new-cap': standardRules['new-cap'],
            // eslint-config-standard doesn't currently have an explicit value for these two rules, so
            // they default to off. The fallbacks are not added to the other rules, so changes in the
            // preset configuration layout doesn't silently cause rules to be disabled.
            'babel/no-invalid-this': standardRules['no-invalid-this'] || 'off',
            'babel/object-curly-spacing': standardRules['object-curly-spacing'] || 'off',
            'babel/semi': standardRules.semi,
            'babel/no-unused-expressions': standardRules['no-unused-expressions']
          })
        },
        settings: {
          react: {
            // https://github.com/yannickcr/eslint-plugin-react#configuration
            // This is undocumented, but equivalent to "latest version".
            version: '999.999.999'
          }
        }
      })
    }
  },
  api => {
    api.hook('lint')
      .add('eslint', api => {
        const engine = new CLIEngine({
          fix,
          root: true,
          env: {node: true},
          baseConfig: useEslintrc ? undefined : api.config.eslint.toConfig(),
          useEslintrc
        })
        const formatter = engine.getFormatter(format)
        const report = engine.executeOnFiles([api.config.context])

        if (fix) {
          CLIEngine.outputFixes(report)
        }

        if (report.errorCount || report.warningCount) {
          api.print(formatter(report.results))
        } else {
          api.print(report.results.some(f => f.output) ? 'All lint errors auto-fixed' : 'No lint errors found')
        }
      })
  }
]
