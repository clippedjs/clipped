const path = require('path')

module.exports = ({offline = {}, manifest = {}} = {}) => [
  api => api.describe({
    id: 'org.clipped.pwa',
    name: 'PWA plugin',
    description: 'Provides support for PWA',
    options: {
      offline: {
        type: 'object',
        description: 'Options for offline-plugin'
      },
      manifest: {
        type: 'object',
        description: 'Options for webpack-pwa-manifest'
      }
    },
    after: ['org.clipped.webpack']
  }),
  {
    webpack(cfg, api) {
      for (key in cfg.entry.toConfig()) {
        cfg.entry[key].unshift(require.resolve('./pwa'))
      }
      
      if (offline) {
        cfg.plugins
          .use('offline', require('offline-plugin'), [
            {
              relativePaths: false,
              ServiceWorker: {
                output: 'service-worker.js',
                events: true
              },
              excludes: ['_redirects'],
              cacheMaps: [{ match: /.*/, to: '/', requestTypes: ['navigate'] }],
              publicPath: '/',
              ...offline
            }
          ])
      }

      if (manifest) {
        cfg.plugins
          .use('pwa-manifest', require('webpack-pwa-manifest'), [{
            filename: 'manifest.json',
            name: api.config.packageJson.name,
            short_name: api.config.packageJson.name,
            description: api.config.packageJson.description,
            background_color: '#fff',
            theme_color: '#4990e2',
            'theme-color': '#4990e2',
            start_url: '/',
            icons: [],
            ...manifest
          }])
      }
    }
  }
]
