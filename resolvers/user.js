const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { combineResolvers } = require('graphql-resolvers')

const User = require('../models/user')
const Task = require('../models/task')

const { isAuthenticated } = require('./middleware')

module.exports = {
  Query: {
    user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
      try {
        const user = await User.findOne({ email })
        return user
      } catch(error)  {
        throw error
      }
    })
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        let user = await User.findOne({email: input.email})
        console.log(user)
        if(user) {
          throw new Error('Email taken')
        } else {
          const hashPassword = await bcrypt.hash(input.password, 12)
          const newUser = new User({...input, password: hashPassword})
          return await newUser.save()
        }
      } catch(error) {
        throw error
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({email: input.email})

        if(!user) {
          throw new Error('Incorrect email')
        }

        const isPasswordCorrect = await bcrypt.compare(input.password, user.password)
        
        if(!isPasswordCorrect) {
          throw new Error('Incorrect password')
        } 

        const secret = process.env.JWT_SECRET || 'DefaultSecretForThisApp'
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' })

        return { token }
      } catch(error) {
        console.log(error)
        throw error
      }
     }
  },
  User: {
    tasks: async ({ id }) => {
      try {
        const tasks = await Task.find({ user: id})
        return tasks
      } catch(error) {
        throw error
      }
    }
  }
}