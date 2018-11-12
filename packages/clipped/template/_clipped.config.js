module.exports = () => [<%- packages.map(package => `\n  require('${package}')()`).join(',') + (packages.length > 0 ? '\n' : '') %>]
