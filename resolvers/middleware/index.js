const { skip } = require('graphql-resolvers')

module.exports.isAuthenticated = (_, __, { id }) => {
  if(!id) {
    throw new Error('Access denied')
  }

  return skip
}