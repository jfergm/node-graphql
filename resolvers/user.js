const bcrypt = require('bcryptjs')

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
    }
  },
  User: {
    tasks: ({id}) => {
      return tasks.filter(task => task.userId === id)
    }
  }
}