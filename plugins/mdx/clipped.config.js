module.exports = () => [
  api => api.describe({
    id: 'org.clipped.mdx',
    name: 'Mdx plugin',
    description: `Adds '.mdx' support`,
    after: ['org.clipped.webpack']
  }),
  {
    webpack(cfg) {
      cfg.module.rules.use('mdx', {
        test: /\.mdx?$/,
        include: [api.config.src],
        exclude: /(node_modules|bower_components)/,
        use: [{
          key: 'babel',
          value: {
            loader: require.resolve('babel-loader'),
            options: {}
          }
        },{
          key: 'mdx',
          value: {
            loader: require.resolve('mdx-loader'),
            options: {}
          }
        }]
      })
      cfg['module.rules.mdx.use.babel'].alias('options', () => api.config.babel)
    }
  }
]
