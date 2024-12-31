const express = require('express')
const { validateSignUpData } = require('../utils/validation')
const bcrypt = require('bcrypt')
const authRouter = express.Router()
const User = require('../models/user')

authRouter.post('/signup', async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req)

    const { password, firstName, lastName, emailId } = req.body

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    })

    await user.save()
    res.send('User created successfully')
  } catch (err) {
    res.status(400).send('ERROR: ' + err.message)
  }
})

authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body

    const user = await User.findOne({ emailId })
    if (!user) {
      throw new Error('Invalid Credentials!')
    }

    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      const token = await user.getJWT()

      res.cookie('token', token, {
        expires: new Date(Date.now() + 8 * 3600000),
      })

      res.send('Login Successful!!!')
    } else {
      throw new Error('Invalid Credentials!')
    }
  } catch (err) {
    res.status(400).send('ERROR: ' + err.message)
  }
})

authRouter.post('/logout', async (req, res) => {
  res.cookie('token', null, { expires: new Date(Date.now()) })
  res.send('Logout successful!!!')
})

module.exports = authRouter
