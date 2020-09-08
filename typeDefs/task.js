const { gql } = require('apollo-server-express')

module.exports = gql`
  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }

  extend type Query {
    tasks: [Task!]
    task(id: ID!): Task
  }

  extend type Mutation {
    createTask(input: taskInput!): Task
    updateTask(id: ID!, input: taskUpdateInput!): Task
  }

  input taskInput {
    name: String!
    completed: Boolean!
  }

  input taskUpdateInput {
    name: String
    completed: Boolean
  }
`