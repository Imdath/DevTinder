const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
      enum: {
        values: ['male', 'female', 'others'],
        message: `{VALUE} is not a valid gender type`,
      },
      // validate: {
      //   validator(value) {
      //     return ['male', 'female', 'others'].includes(value)
      //   },
      //   message: 'Gender data is not valid',
      // },
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

userSchema.methods.getJWT = async function () {
  const user = this

  const token = await jwt.sign({ _id: user._id }, 'DEV@Tinder$790', {
    expiresIn: '7d',
  })

  return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this
  const passwordHash = user.password

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  )

  return isPasswordValid
}

const UserModel = new mongoose.model('User', userSchema)

module.exports = UserModel
