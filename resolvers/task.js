const { combineResolvers } = require('graphql-resolvers')

const Task = require('../models/task')
const User = require('../models/user')

const { isAuthenticated, isTaskOwner } = require('./middleware')
const task = require('../models/task')

module.exports = {
  Query: {
    tasks: combineResolvers(isAuthenticated, async (_, __, { userId }) => {
      try {
        const tasks = await Task.find({ user: userId })
        return tasks

      } catch(error) {
        throw error
      }
    }),
    task: combineResolvers(isAuthenticated, isTaskOwner, async (_, {id}) => {
      try {
        const task = await Task.findById(id)
        return task

      } catch(error) {
        throw error
      }
    }),
  },
  Mutation: {
    createTask: combineResolvers(isAuthenticated, async (_, { input }, { userId }) => {
      try {
        const user = await User.findById(userId)
        const newTask = Task({ ...input, user: user.id})

        await newTask.save()

        user.tasks.push(newTask.id)

        await user.save()
        
        return newTask
      } catch(error) {
        throw error
      }
    }),
    updateTask: combineResolvers(isAuthenticated, isTaskOwner, async (_, { id, input }) => {
      try {
        const task = Task.findByIdAndUpdate(id, { ...input }, { new: true })

        return task
      } catch(error) {
        throw error
      }
    })
  },
  Task: {
    user: async ({user}) => {
      try {
        const taskUser = await User.findById(user)
        return taskUser
      } catch(error) {
        throw error
      }
    }
  }
}