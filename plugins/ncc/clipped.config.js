const fs = require('fs')
const path = require('path')

module.exports = () => api => {
  api.describe({
    id: 'org.clipped.ncc',
    name: '@zeit/ncc plugin',
    description: 'Builds single exectable with ncc',
  })
  
  api.hook('build:ncc')
    .add('ncc', async api => {
      await api.fs.mkdir({path: api.config.toConfig().dist})
      fs.writeFileSync(path.resolve(api.config.toConfig().dist, 'index.js'), await require('@zeit/ncc')(api.config.toConfig().src))
    })
}
