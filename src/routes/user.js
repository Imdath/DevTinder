const express = require('express')
const { userAuth } = require('../middlewares/auth')
const userRouter = express.Router()
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

const userPopulateStrings = [
  'firstName',
  'lastName',
  'photoUrl',
  'age',
  'gender',
  'about',
  'skills',
]

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: 'interested',
    }).populate('fromUserId', userPopulateStrings)

    res.json({ message: 'Data fetched successfully', data: connectionRequests })
  } catch (error) {
    res.status(400).send('ERROR: ' + error.message)
  }
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: 'accepted' },
        { toUserId: loggedInUser._id, status: 'accepted' },
      ],
    })
      .populate('fromUserId', userPopulateStrings)
      .populate('toUserId', userPopulateStrings)

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId
      }
      return row.fromUserId
    })
    res.json({ data })
  } catch (error) {
    res.status(400).send('ERROR: ' + error.message)
  }
})

userRouter.get('/user/feed', userAuth, async (req,res) => {
  try{
    const loggedInUser = req.user 

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10 
    const skip = (page - 1) * limit
  
    const connectionRequests = await ConnectionRequest.find({
      $or:[{fromUserId: loggedInUser._id},{toUserId: loggedInUser}]
    }).select('fromUserId toUserId')
  
    const hideUsersFromFeed = new Set()
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString())
      hideUsersFromFeed.add(req.toUserId.toString())
    })
  
    const users = await User.find({
      $and:[
        {_id: {$nin: Array.from(hideUsersFromFeed)}},
        {_id: {$ne: loggedInUser._id}}
      ]
    }).select(userPopulateStrings).skip(skip).limit(limit)
  
    res.send(users)
  
  }
  catch(error){
  res.status(400).json({message: error.message})
  }
  })

module.exports = userRouter
