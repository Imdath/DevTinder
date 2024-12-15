const express = require('express')

const app = express()

app.get(
  '/user',
  (req, res, next) => {
    console.log('1st response')
    // res.send('1st response')
    next()
  },
  (req, res, next) => {
    console.log('2nd response')
    // res.send('2nd response')
    next()
  },
  (req, res) => {
    console.log('3rd response')
    res.send('3rd response')
  }
)

app.listen(3000, () => {
  console.log('Server is successfully listening on port 3000....')
})
