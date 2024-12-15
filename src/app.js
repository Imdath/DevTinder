const express = require('express')

const app = express()

const { adminAuth, userAuth } = require('./middlewares/auth')

app.use('/admin', adminAuth)
// app.use('/user', userAuth)

app.post('/user/login', (req, res) => {
  res.send('Logged in successfully')
})

app.get('/user/getData', userAuth, (req, res) => {
  res.send('User data retrieved')
})

app.get('/admin/getAllData', (req, res) => {
  res.send('All data sent')
})

app.get('/admin/deleteData', (req, res) => {
  res.send('Data deleted successfully')
})

app.listen(3000, () => {
  console.log('Server is successfully listening on port 3000....')
})
