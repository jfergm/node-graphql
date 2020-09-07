const { skip } = require('graphql-resolvers')
const Task = require('../../models/task')

module.exports.isAuthenticated = (_, __, { userId }) => {
  if(!userId) {
    throw new Error('Access denied')
  }

  return skip
}

module.exports.isTaskOwner = async (_, { id },  { userId }) => {
  try {
    const task = await Task.findById(id)

    if(!task) {
      throw new Error('Task does not exist')
    } else if(task.user.toString() !== userId) {
      throw new Error('Not allowed')
    }

    return skip
  } catch(error) {
    throw error
  }
}