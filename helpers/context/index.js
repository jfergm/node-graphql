const jwt = require('jsonwebtoken')
const User = require('../../models/user')

module.exports.verifyToken = async (req) => {
  try {
    const bearer = req.headers.authorization
    req.userLoggedId = null
    if(bearer) {
      const token = bearer.split(' ')[1]
      const secret = process.env.JWT_SECRET || 'DefaultSecretForThisApp'
      const verifiedData =  jwt.verify(token, secret)
      
      const user = await User.findOne({ email: verifiedData.email })
      req.userLoggedId = user.id
    } 
  } catch(error) {
    throw error
  }
 
} 