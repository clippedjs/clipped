module.exports = async clipped => {
  <%- clippedPresets.map(preset => `await clipped.use(require('${preset}'))`).join('\n  ') %>
}
