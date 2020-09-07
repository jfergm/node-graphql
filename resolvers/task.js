const { combineResolvers } = require('graphql-resolvers')

const Task = require('../models/task')
const User = require('../models/user')

const { isAuthenticated } = require('./middleware')

module.exports = {
  Query: {
    tasks: () => tasks,
    task: (_, {id}) => tasks.find(task => task.id === id),
  },
  Mutation: {
    createTask: combineResolvers(isAuthenticated ,async (_, { input }, { id }) => {
      try {
        const user = await User.findById(id)
        const newTask = Task({ ...input, user: user.id})

        await newTask.save()

        user.tasks.push(newTask.id)

        await user.save()
        
        return newTask
      } catch(error) {
        throw error
      }
    })
  },
  Task: {
    user: ({userId}) => {
      return users.find( user => user.id === userId)
    }
  }
}