module.exports = ({jsx = false} = {}) => [
  api => api.describe({
    id: 'org.clipped.babel',
    name: 'Babel plugin',
    description: 'Provides support for Babel transpiler',
    options: {
      jsx: {
        type: 'enum',
        default: false,
        valid: [false, String, 'vue', 'react'],
        description: 'What jsx pragma to use in Babel'
      }
    },
    after: ['org.clipped.webpack']
  }),
  {
    babel: {
      presets: [],
      plugins: [
        [
          require.resolve('@babel/plugin-proposal-object-rest-spread'),
          {
            useBuiltIns: true,
            loose: true
          }
        ],
        [require.resolve('@babel/plugin-proposal-class-properties')]
      ]
    },
    webpack(cfg, api) {
      cfg.set('module.rules.js.use.babel', {
        loader: require.resolve('babel-loader'),
      })
      cfg.module.rules.alias('js.use.babel.options', () => api.config.babel)
    },
    rollup(cfg) {
      cfg.plugins
        .use('babel', require('rollup-plugin-babel'), [{}])
        .alias('babel.args.0', () => config.babel)

      if (process.env.NODE_ENV !== 'development') {
        cfg.plugins.use('babel-minify', require('rollup-plugin-babel-minify'), [{}])
      }
    }
  },
  {
    babel(cfg, api) {
      cfg.presets.set('env', [
        require.resolve('@babel/preset-env'),
        {
          ...(api.config.target !== 'web' ? {useBuiltIns: false} : {}),
          modules: false,
          targets: api.config.target === 'web' ? {ie: 9} : {node: api.config.target.replace('node:', '') || 6},
          exclude: ['transform-regenerator', 'transform-async-to-generator'],
        }
      ])

      if (jsx === 'vue') {
        cfg.plugins.push(require.resolve('babel-plugin-transform-vue-jsx'))
      } else if (jsx === 'react') {
        cfg.plugins.push(require.resolve('@babel/plugin-transform-react-jsx'))
      } else if (typeof jsx === 'string') {
        cfg.plugins.push([
          require.resolve('@babel/plugin-transform-react-jsx'),
          { pragma: jsx }
        ])
      }
    },
  }
]
