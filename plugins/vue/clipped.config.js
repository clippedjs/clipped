const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = () => [
  api => api.describe({
    id: 'org.clipped.vue',
    name: 'Vue plugin',
    description: 'Provides support for Vue',
    before: ['org.clipped.webpack']
  }),
  ({config}) => ({
    webpack(cfg) {
      cfg.resolve.extensions.push('.vue')

      cfg.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')

      // Replace style-loader with vue-style-loader
      cfg.module.rules.forEach(({key}) => {
        if (cfg.module.rules[key].use.style) {
          cfg.module.rules[key].use.set('style', require.resolve('vue-style-loader'))
        }
      })

      cfg.module.rules.set('vue', {
        test: /\.vue$/,
        include: [config.src],
        use: [{key: 'vue', value: {loader: require.resolve('vue-loader'), options: {compiler: require('vue-template-compiler')}}}],
      })

      cfg.plugins.use('vue-loader-plugin', VueLoaderPlugin, [{productionMode: process.env.NODE_ENV === 'production'}])
    }
  }),
  api => {
    api.hook('init')
      .add('scaffold-vue', async api => {
        await api.fs.copy({src: path.resolve(__dirname, 'template'), dest: api.config.src})
        await api.install(['vue', 'vue-template-compiler'])
      })
  }
]
