import express from 'express'
import app from '../src/index.js'

const server = express()

const PORT = process.env.PORT || 8080
server.use('/', app)
server.listen(PORT, err => {
  if (err) console.error(err)

  if (__DEV__) { // webpack flags!
    console.log('> In development')
  }
  console.log('> Backend listening at port', PORT)

})
