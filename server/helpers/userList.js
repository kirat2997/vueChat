const User = require('../schema/user')

const updateUserRoom = async (data, socket) => {
  const user = await User.findOneAndUpdate({username: data.username},{currentRoom: data.room, socket}, {new: true})
  if(!user){
    return false
  }
  return user
}

const getUserList = async (room) => {
  const list = await User.find({currentRoom: room})
  return list
}

const removeUser = async (socket) => {
  const user = await User.findOneAndUpdate({socket}, {currentRoom: null, socket: null})
  if(!user)
    return false
  else
    return user
}

const refresh = async (username) => {
  const user = await User.findOneAndUpdate({username}, {currentRoom: null, socket: null})
  return user
}

module.exports = { updateUserRoom, getUserList, removeUser, refresh }