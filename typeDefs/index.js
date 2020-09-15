const { gql } = require('apollo-server-express')

const taskTypeDefs = require('./task')
const userTypeDefs = require('./user')

const typeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`

module.exports = [typeDefs, userTypeDefs, taskTypeDefs]