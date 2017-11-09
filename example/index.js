const app = require('express')()

app.get('/', (req, res) => {
  return res.json({success: true, message: 'Hello world'})
})

const PORT = process.env.PORT || 8080
app.listen(PORT)
console.log('> Server listening at port ', PORT)
