const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const cors = require('cors')
const dotEnv = require('dotenv')
const Dataloader = require('dataloader')

const { connection } = require('./database/connection')

const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

const { verifyToken } = require('./helpers/context')

const loaders = require('./loaders')

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
    const contextObj = {}
    if (req) {
      await verifyToken(req)
      contextObj.userId = req.userLoggedId
    }
    contextObj.loaders = {
      user: new Dataloader(keys => loaders.user.batchUsers(keys))
    }
    
    return contextObj;

  }
  
})

apolloServer.applyMiddleware({app, path: '/graphql'})

const PORT = process.env.PORT || 3000

app.use('/', (req, res, next) => {
  res.send({message: 'Hello'})
})

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

apolloServer.installSubscriptionHandlers(httpServer);