const mongoose = require('mongoose')

module.exports.connection = async () => {
  try {

    let dbConnection = "mongodb://"

    if (process.env.DB_USER && process.env.DB_PASSWORD  && process.env.DB_USER.length > 0 && process.env.DB_PASSWORD.length > 0) {
      dbConnection += process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@"
    }
    dbConnection += process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME

    mongoose.set('debug', true)

    await mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })

    console.log('Database Connected Successfully')
  } catch (error) {
    console.log(error)

    throw error
  }
}

module.exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}