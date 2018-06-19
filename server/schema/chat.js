const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
  text: String,
  from: String,
  chatRoom: String,
  createdAt: String,
  textClass: {
    type: String,
    default: 'user'
  },
  key: String
})
// Export Mongoose model
module.exports =  mongoose.model('chat', chatSchema)
