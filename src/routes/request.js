const express = require('express')
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

requestRouter.post(
  '/request/send/:status/:toUserId',
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id
      const toUserId = req.params.toUserId
      const status = req.params.status

      const allowedStatus = ['interested', 'ignored']
      if (!allowedStatus.includes(status)) {
        throw new Error(`Invalid status type, ${status}`)
      }
      const existingToUser = await User.findById(toUserId)
      if (!existingToUser) {
        throw new Error('User not found')
      }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      })
      if (existingConnectionRequest) {
        throw new Error('Connection request already exists!!!')
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      })
      const data = await connectionRequest.save()
      res.json({
        message: `${
          status === 'interested'
            ? 'Connection request sent successfully'
            : 'Request ignored!!!'
        }`,
        data,
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

module.exports = requestRouter
