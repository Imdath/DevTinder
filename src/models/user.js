const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator(value) {
          return validator.isEmail(value)
        },
        message: 'Email is not valid',
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isStrongPassword(value)
        },
        message: 'Enter a strong password',
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate: {
        validator(value) {
          return ['male', 'female', 'others'].includes(value)
        },
        message: 'Gender data is not valid',
      },
    },
    photoUrl: {
      type: String,
      default: 'https://picsum.photos/seed/picsum/200/300',
      validate: {
        validator(value) {
          return validator.isURL(value)
        },
        message: 'Invalid Photo URL',
      },
    },
    about: {
      type: String,
      default: 'This is a default about of the user!',
    },
    skills: {
      type: [String],
      validate: {
        validator(array) {
          return array.length <= 10
        },
        message: 'Skills cannot be more than 10',
      },
    },
  },
  { timestamps: true }
)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
