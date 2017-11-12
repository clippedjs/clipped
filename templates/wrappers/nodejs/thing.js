const path = require('path')
const server = require('express')()

const {handler: app} = require(path.join(process.cwd(), './src'))

const PORT = process.env.PORT || 8080
server.use('/', app)
server.listen(PORT)

process.on('SIGTERM', function () {
  server.close(function () {
    process.exit(0)
  })
})

console.log('> Backend listening at port', PORT)
