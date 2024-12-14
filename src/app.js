const express = require('express')

const app = express()

app.use('/hello', (req, res) => {
  res.send('Hello World')
})

// this function is known as request handler
app.use('/test', (req, res) => {
  res.send('Hello from the server')
})

app.listen(3000, () => {
  console.log('Server is successfully listening on port 3000....')
})
