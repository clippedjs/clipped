const server = require('server')
const {render} = server.reply
const {error} = server.router
const {status} = server.reply

const PORT = process.env.PORT || 8080

server(
  {
    public: './',
    views: './',
    port: PORT
  },
  ctx => render('index.html'),
  error(ctx => status(500).send(ctx.error.message))
)

console.log(`> Server listening at port ${PORT}`)
