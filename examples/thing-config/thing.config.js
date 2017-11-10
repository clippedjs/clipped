module.exports = {
  name: 'example',
  type: 'nodejs',
  build: {
    docker: {
      path: './custom-dockerfile/Dockerfile'
    }
  }
}
