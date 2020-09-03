const {users, tasks} = require('../constants')
const uuid = require('uuid')

module.exports = {
  Query: {
    tasks: () => tasks,
    task: (_, {id}) => tasks.find(task => task.id === id),
  },
  Mutation: {
    createTask: (_, { input }) => {
      const newTask = {...input, id: uuid.v4()}
      tasks.push(newTask)
      return newTask
    }
  },
  Task: {
    user: ({userId}) => {
      return users.find( user => user.id === userId)
    }
  }
}