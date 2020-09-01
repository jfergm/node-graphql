const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const dotEnv = require('dotenv')

//env variables
dotEnv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.use('/', (req, res, next) => {
  res.send({message: 'Hello'})
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})