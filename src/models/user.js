const mongoose = require('mongoose')

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
    },
    password: {
      type: String,
      required: true,
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
