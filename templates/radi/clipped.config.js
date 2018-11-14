const path = require('path')

module.exports = () => [
  require('@clipped/plugin-webpack')({jsx: 'Radi.r'}),
  {
    babel(cfg, api) {
      cfg.plugins.set('radi-listen', require.resolve('babel-plugin-transform-radi-listen'))
    },
    webpack(cfg, api) {
      cfg.set('resolve.extensions.radi', '.radi')

      cfg.module.rules.set('radi', {
        test: /\.radi$/,
        include: [api.config.src],
        exclude: /(node_modules|bower_components)/,
        use: [{
          key: 'radi',
          value: {
            loader: require.resolve('radi-loader')
          }
        }]
      })
    }
  },
  api => {
    api.hook('init')
      .add('scaffold-radi', async api => {
        await api.fs.copy({src: path.resolve(__dirname, 'template'), dest: api.config.src})
      })
  }
]
