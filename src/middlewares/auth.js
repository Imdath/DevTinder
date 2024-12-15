const adminAuth = (req, res, next) => {
  const token = 'xyz'
  const isAdmin = token === 'xyz'
  if (!isAdmin) {
    res.status(401).send('Not Authorized')
  }
  next()
}

const userAuth = (req, res, next) => {
  const token = 'abc'
  const isUser = token === 'abc'
  if (!isUser) {
    res.status(401).send()
  }
  next()
}

module.exports = { adminAuth, userAuth }
