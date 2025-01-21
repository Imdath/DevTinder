const express = require('express')
const connectDB = require('./config/database')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

const allowedOrigins = ['http://localhost:5173', 'http://16.171.8.139']
app.use(
	cors({
		origin: (origin, callback) => {
			if (allowedOrigins.includes(origin) || !origin) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		credentials: true
	})
)
app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/user')

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

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
