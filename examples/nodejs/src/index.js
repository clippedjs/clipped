const app = require('express')()

app.get('/', (req, res) => {
  return res.json({success: true, message: 'Hello world'})
})

export default app
