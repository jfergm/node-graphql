const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  tasks: [
    { 
      type: mongoose.Types.ObjectId,
      ref: 'Task'
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', user)