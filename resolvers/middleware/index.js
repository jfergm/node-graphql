const { skip } = require('graphql-resolvers')
const Task = require('../../models/task')

module.exports.isAuthenticated = (_, __, { id }) => {
  if(!id) {
    throw new Error('Access denied')
  }

  return skip
}

module.exports.isTaskOwner = async (_, { id },  context) => {
  try {
    const task = await Task.findById(id)

    if(!task) {
      throw new Error('Task does not exist')
    } else if(task.user.toString() !== context.id) {
      throw new Error('Not allowed')
    }

    return skip
  } catch(error) {
    throw error
  }
}