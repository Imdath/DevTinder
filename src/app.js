const express = require('express')

const app = express()

// this will only handle GET call to the /user
app.get('/user', (req, res) => {
  res.send({ firstName: 'Mohamed', lastName: 'Imdath' })
})

app.post('/user', (req, res) => {
  // save the data to DB
  res.send('Data saved successfully to DB')
})

app.delete('/user', (req, res) => {
  // delete the user from DB
  res.send('User deleted successfully')
})

// this will match all the HTTP methods API calls to /test
app.use('/test', (req, res) => {
  res.send('Hello from the server')
})

app.listen(3000, () => {
  console.log('Server is successfully listening on port 3000....')
})
