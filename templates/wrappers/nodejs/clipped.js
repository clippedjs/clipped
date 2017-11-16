const path = require('path')
const server = require('express')()

const app = require('./index.js')

const PORT = process.env.PORT || 8080
server.use('/', app)
server.listen(PORT)

console.log('> Backend listening at port', PORT)
