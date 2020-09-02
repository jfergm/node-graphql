const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const cors = require('cors')
const dotEnv = require('dotenv')

const {tasks, users} = require('./constants')

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
const resolvers = {
  Query: {
    greetings: () => "Hello",
    tasks: () => tasks,
    task: (_, {id}) => tasks.find(task => task.id === id),
    users: () => users,
    user: (_, {id}) => users.find(user => user.id === id)
  },
  Task: {
    user: ({userId}) => {
      return users.find( user => user.id === userId)
    }
  },
  User: {
    tasks: ({id}) => {
      return tasks.filter(task => task.userId === id)
    }
  }
}

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