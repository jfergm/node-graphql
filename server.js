const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const cors = require('cors')
const dotEnv = require('dotenv')

const { connection } = require('./database/connection')

const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

const { verifyToken } = require('./helpers/context')

//env variables
dotEnv.config()

const app = express()

connection()

app.use(express.json())
app.use(cors())


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await verifyToken(req)
    return {
      id: req.userLoggedId
    }
  }
})

apolloServer.applyMiddleware({app, path: '/graphql'})

const PORT = process.env.PORT || 3000

app.use('/', (req, res, next) => {
  res.send({message: 'Hello'})
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})