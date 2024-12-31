const validator = require('validator')

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body

  if (!firstName || !lastName) {
    throw new Error('Name is not valid!')
  } else if (!validator.isEmail(emailId)) {
    throw new Error('Email is not valid!')
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Enter a strong password!')
  }
}

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    'firstName',
    'lastName',
    'photoUrl',
    'age',
    'gender',
    'about',
    'skills',
  ]
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  )

  return isEditAllowed
}

const validatePasswordChange = (isPasswordValid, newPassword, oldPassword) => {
  if (!isPasswordValid) {
    throw new Error('Please enter the correct old password')
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error('Enter a strong new password')
  } else if (oldPassword === newPassword) {
    throw new Error('Both old and new password cannot be the same')
  }
}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validatePasswordChange,
}
