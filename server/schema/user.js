const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  currentRoom: String,
  socket: String,
  active: Boolean
})
// Export Mongoose model
module.exports =  mongoose.model('user', userSchema)
