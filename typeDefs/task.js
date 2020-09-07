const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    tasks: [Task!]
    task(id: ID!): Task
  }

  input taskInput {
    name: String!,
    completed: Boolean!
  }

  extend type Mutation {
    createTask(input: taskInput): Task
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!

  }
`