const User = require('../schema/user')

const updateUserRoom = async (data, socket) => {
  const user = await User.findOneAndUpdate({username: data.username},{currentRoom: data.room, socket, active: true}, {new: true})
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
  const user = await User.findOneAndUpdate({socket}, {currentRoom: null, socket: null, active: false}, {new: true})
  if(!user)
    return false
  else
    return user
}

const refresh = async (username) => {
  const user = await User.findOneAndUpdate({username}, {currentRoom: null, socket: null, active: false}, {new: true})
  return user
}

const findUserByName = async (params) => {
  const user = await User.findOne({username: params.username})
  return user
}

const findUserBySocket = async (socket) => {
  const user = await User.findOne({socket})
  return user
}

const findUserById = async (userId) => {
  const user = await User.findOne({_id: userId})
  return user
}

const setInactive = async (userId) => {
  const user = await User.findOneAndUpdate({_id: userId}, {active: false}, {new: true})
}

module.exports = { updateUserRoom, getUserList, removeUser, refresh, findUserById, findUserByName, findUserBySocket, setInactive }