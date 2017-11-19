import express from 'express'
// import 'source-map-support/register'

const app = express()

app.get('/', (req, res) => res.json({success: true, message: 'Hello world'}))

export default app
