const server = require('server')

const PORT = process.env.PORT || 8080

server({
  public: './',
  views: './',
  port: PORT
}, ctx => render('index.html'))

console.log(`> Server listening at port ${PORT}`)
