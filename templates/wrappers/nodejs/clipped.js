const path = require('path')
const server = require('express')()

let app
try {
  app = require(path.resolve(process.cwd(), './src')).handler
} catch (e) {
  app = require(path.resolve(process.cwd())).handler
}

const PORT = process.env.PORT || 8080
server.use('/', app)
server.listen(PORT)

console.log('> Backend listening at port', PORT)
