const jwt = require('jsonwebtoken')

module.exports.verifyToken = async (req) => {
  try {
    const bearer = req.headers.authorization
    req.email = null
    if(bearer) {
      const token = bearer.split(' ')[1]
      const secret = process.env.JWT_SECRET || 'DefaultSecretForThisApp'
      const verifiedData =  jwt.verify(token, secret)

      req.email = verifiedData.email
    } else {
  
    }
  } catch(error) {
    throw error
  }
 
} 