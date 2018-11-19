const path = require('path')

module.exports = () => [
  api => api.describe({
    id: 'org.clipped.react',
    name: 'React plugin',
    description: 'Provides support for React',
    before: ['org.clipped.webpack']
  }),
  {
    babel(cfg) {
      cfg.presets.set('react', [require.resolve('@babel/preset-react'), {}])

      if (process.env.NODE_ENV === 'development') {
        cfg.plugins.set('react-hot-loader', [require.resolve('react-hot-loader/babel')])
      }
    },
    webpack(cfg) {
      for (key in cfg.entry.toConfig()) {
        cfg.entry[key].unshift(require.resolve('react-hot-loader/patch'))
      }
    }
  },
  api => {
    api.hook('init')
      .add('scaffold-react', async api => {
        await api.fs.copy({src: path.resolve(__dirname, 'template'), dest: api.config.src})
        await api.install(['react', 'react-dom'])
      })
  }
]
