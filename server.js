const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const cors = require('cors')
const dotEnv = require('dotenv')

const resolvers = require('./resolvers')

//env variables
dotEnv.config()

const app = express()

app.use(express.json())
app.use(cors())

const typeDefs = gql`
  type Query {
    greetings: String
    tasks: [Task!]
    task(id: ID!): Task
    users: [User!]
    user(id: ID!): User
  }

  input taskInput {
    name: String!,
    completed: Boolean!
    userId: ID!
  }

  type Mutation {
    createTask(input: taskInput): Task
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!

  }
`

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

apolloServer.applyMiddleware({app, path: '/graphql'})

const PORT = process.env.PORT || 3000

app.use('/', (req, res, next) => {
  res.send({message: 'Hello'})
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})