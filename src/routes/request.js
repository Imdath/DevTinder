const express = require('express')
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')
const mongoose = require('mongoose')

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

requestRouter.post(
  '/request/review/:status/:requestId',
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params
      const loggedInUser = req.user

      const allowedStatus = ['accepted', 'rejected']
      if (!allowedStatus.includes(status)) {
        throw new Error('Status not valid')
      }

      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        throw new Error('Connection Request Id is not valid')
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id.toString(),
        status: 'interested',
      })

      console.log(requestId,'adcsdacsndcsjn')

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: 'Connection Request not found!!!' })
      }

      connectionRequest.status = status
      const data = await connectionRequest.save()

      res.status(200).json({ message: `Connection Request ${status}`, data })
    } catch (error) {
      res.status(400).send('ERROR: ' + error.message)
    }
  }
)



module.exports = requestRouter
