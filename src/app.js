const express = require('express')
const connectDB = require('./config/database')
const app = express()
const User = require('./models/user')

app.post('/signup', async (req, res) => {
  const user = new User({
    firstName: 'Neymar',
    lastName: 'Junior',
    emailId: 'ney@mailinator.com',
    password: 'neyplayboy',
  })

  try {
    await user.save()
    res.send('User created successfully')
  } catch (err) {
    res.status(400).send('Error saving the user:' + err.message)
  }
})

connectDB()
  .then(() => {
    console.log('Database connected successfully...')
    app.listen(3000, () => {
      console.log('Server is successfully listening on port 3000....')
    })
  })
  .catch((err) => {
    console.error('Database connection failed!!!')
  })
