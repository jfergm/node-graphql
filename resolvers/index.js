const usersResolver = require('./user')
const tasksResolver = require('./task')

module.exports  = [
  usersResolver,
  tasksResolver
]