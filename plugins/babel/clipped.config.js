module.exports = ({type = 'library', target = 'browser', jsx = false} = {}) => [
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
      },
      target: {
        type: 'enum',
        default: 'browser',
        valid: ['browser', 'library'],
        description: 'Build target of Babel'
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
    }
  },
  {
    babel(cfg) {
      cfg.presets.set('env', [
        require.resolve('@babel/preset-env'),
        {
          ...(type === 'library' ? {useBuiltIns: false} : {}),
          modules: false,
          targets: target === 'browser' ? {ie: 9} : {node: target.replace('node:', '') || 6},
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
