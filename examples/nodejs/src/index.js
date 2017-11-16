const app = require('express')()

app.get('/', (req, res) => {
  return res.json({success: true, message: 'Hello world'})
})

const PORT = process.env.PORT || 8080
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  }

  if (__DEV__) { // webpack flags!
    console.log('> In development')
  }

  console.log(`> Listening on port ${PORT}`)
})
module.exports = app
