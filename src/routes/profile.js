const express = require('express')
const profileRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const {
  validateEditProfileData,
  validatePasswordChange,
} = require('../utils/validation')
const User = require('../models/user')
const validator = require('validator')
const bcrypt = require('bcrypt')

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user
    res.send(user)
  } catch (err) {
    res.status(400).send('ERROR: ' + err.message)
  }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error('Invalid Edit Request!!!')
    }

    const loggedInUser = req.user

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

    await loggedInUser.save()

    res.json({data: loggedInUser,message:'Profile updated successfully'})
  } catch (error) {
    res.status(400).send('ERROR: ' + error.message)
  }
})

profileRouter.put('/profile/password', userAuth, async (req, res) => {
  try {
    const { emailId } = req.user
    const { oldPassword, newPassword } = req.body
    const user = await User.findOne({ emailId })
    const isPasswordValid = await user.validatePassword(oldPassword)

    validatePasswordChange(isPasswordValid, newPassword, oldPassword)

    const loggedInUser = req.user
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    loggedInUser.password = hashedPassword
    await loggedInUser.save()

    res.send('Password changed successfully')
  } catch (error) {
    res.status(400).send('ERROR: ' + error.message)
  }
})

module.exports = profileRouter
