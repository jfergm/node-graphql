const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {users, tasks} = require('../constants')
const User = require('../models/user')

module.exports = {
  Query: {
    users: () => users,
    user: (_, {id}) => users.find(user => user.id === id)
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
    tasks: ({id}) => {
      return tasks.filter(task => task.userId === id)
    }
  }
}