- Create a repository
- Initialize the respository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test , /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde ( ^ vs ~)

- initialize git
- gitignore
- create a remote repo on github
- push all code to remote origin
- play with routes and route extensions ex. /hello, /, hello/2, /xyz
- order of the routes matter alot
- install postman and create a workspace/collection and execute a test API call
- write logic to handle GET, POST, PATCH, PUT, DELETE API calls and test them on postman
- explore routing and use of ?, +, (), \* in the routes
- use of regex in routes /a/, /.\*fly$/
- reading the query params in the routes
- reading the dynamic routes

- multiple route handlers - play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3], rH4, rH5)
- what is a middleware and why do we need it?
- how express JS basically handles requests behind the scenes
- diff between app.use and app.all
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user routes, except /user/login
- error handling using app.use('/', (err,req,res,next) => {})

- create a cluster on MongoDB official website (Mongo Atlas)
- install mongoose library
- connect your application to the Database "Connection-url"/devTinder
- call the connectDB function and connect to database before starting application on 3000
- create a userSchema and user Model
- create POST /signup API to add data to database
- push some documents using API calls from postman
- error handling using try, catch

- JS object vs JSON (difference)
- add the express.json middleware to your app
- make your signup API dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object does it return
- API - Get user by email
- API - Feed API - GET /feed - get all the users from the database
- Difference between PATCH and PUT
- API - update the user
- explore the Mongoose Documentation for Model API
- what are options in a Model.findOneAndUpdate method, explore more about it
- API - update the user with email ID

- explore schematype options from the documentation
- add required, unique, lowercase, min, minLength, trim
- add default
- create a custom validate function for gender
- improve the DB schema - PUT all appropriate validations on each field in Schema
- add timestamps to the user Schema
- add API level validation on Patch request & Signup post api
- Data Sanitizing - add API validation for each field
- install validator
- explore validator library function and use validator functions for password, email and photoUrl
- NEVER TRUST req.body

- validate data in Signup API
- install bcrypt package
- create password hash using bcrypt.hash and save the user with encrypted password
- create login API
- compare passwords and throw errors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to the user
- create GET /profile API and check if you get the cookie back
- in login API, after email and password validation, create a JWT token and send it back to the user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth middleware
- add the userAuth middleware in profile API and a new sendConnectionRequest API
- set the expiry of JWT token and cookies to 7 days
- create userSchema method to getJWT()
- create userSchema method to validatePassword()

- explore Tinder APIs
- create a list of all APIs you can think of in DevTinder
- group multiple routes under respective routers
- read documentation of express.Router
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- import these routers in app.js
- create POST /logout API
- create PATCH /profile/edit API
- create PATCH /profile/password API => forgot password API
- make sure you validate all data in every POST, PATCH APIs

- create connection request schema
- send connection request API
- proper validation of data
- think about all corner cases
- $or query $and query in mongoose
- schema.pre("save") function
- read more about indexes in mongodb
- why do we need index in DB
- what are the advantages and disadvantages of creating indexes
- read the article about coumpound indexes - mongodb
- read more about the logical queries
- ALWAYS THINK ABOUT CORNER CASES

- write code with proper validations for POST /request/review/:status/:requestId
- thought process - POST vs GET
- read about ref and populate
- create GET /user/requests/received with all the checks
- create GET /user/connections

- logic for GET /user/feed API
- explore the $nin, $ne, $and and other query operators
- pagination

NOTES:

/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

/feed?page=3&limit=10 => 31-40 => .skip(30) & .limit(10)

skip = (page-1) \* limit
