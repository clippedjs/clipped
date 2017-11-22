import express from 'express'
// // import 'source-map-support/register'
// import app from '../src/index.js'
let app = {}
try {
  app = require('../index.js').default || require('../index.js')
} catch (e) {
  try { app = require('../src/index.js').default || require('../src/index.js') } catch (e) {}
}

const server = express()

const PORT = process.env.PORT || 8080
server.use('/', app)
server.listen(PORT, err => {
  if (err) console.error(err)

  if (__DEV__) { // eslint-disable-line
    console.log('> In development')
  }
  console.log('> Backend listening at port', PORT)
})
