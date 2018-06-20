const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const history = require('connect-history-api-fallback')
const bodyParser = require('body-parser')
const path = require('path')

const { generateMessage, saveMessage, loadMessage } = require('./helpers/handleMessage')
const { updateUserRoom, getUserList, removeUser, refresh, findUserById, findUserByName, findUserBySocket, setInactive } = require('./helpers/userList')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/chatApp-test')
mongoose.connect('mongodb://kirat2997:qqqqqqqq1@ds153980.mlab.com:53980/chatapp')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', require('./routes/auth'))

app.use("/", express.static(path.resolve(__dirname, '..', 'client','dist')))
app.use("/", history({disableDotRule: true}))
app.use("/", express.static(path.resolve(__dirname, '..', 'client','dist')))

io.on('connect', (socket) => {
  // console.log(socket.id, 'CONNECTED')
  
  socket.on('refreshSocket', async (params) => {
    await refresh(params)
  })

  socket.on('join', async (params, callback) => {
    
    socket.join(params.room)
    const prevOccurance = await findUserByName(params)
    const user = await updateUserRoom(params, socket.id)
    if (!user){
      return callback('ERROR OCCURED')
    }

    const userList = await getUserList(params.room)
    io.to(params.room).emit('updateUserList', userList)
    if(!prevOccurance.currentRoom || prevOccurance.currentRoom !== params.room){
      socket.emit('newMessage', generateMessage(`Admin`, `Welcome ${params.name}`, 'admin'))
      socket.broadcast.to(params.room).emit('newMessage', generateMessage(`Admin`, `${params.name} has joined.`, 'admin'))
    }
    callback()
  })

  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('userTyping', `${data.from} is typing..`)
  })
  
  socket.on('newRoom', (data) => {
    socket.emit('updateRoomName', data)
  })

  socket.on('doneTyping', (data) => {
    socket.broadcast.to(data.room).emit('done', ``)
  })

  socket.on('loadChat', async (room)=>{
    const chats = await loadMessage(room)
    socket.emit('chats', chats)
  })

  socket.on('createMessage', async (data) => {
    socket.emit('newMessage', generateMessage(`You`, data.text, 'user'))
    socket.broadcast.to(data.room).emit('newMessage', generateMessage(data.from, data.text, 'user'))
    await saveMessage(generateMessage(data.from, data.text, 'user'), data.room)
  })

  socket.on('logout', async (data, room) => {
    const user = await removeUser(socket.id)
    if(user && room){
      const userList = await getUserList(room)
      io.to(room).emit('updateUserList', userList)
      io.to(room).emit('newMessage', generateMessage('Admin', `${user.name} has left`, 'admin'))
    }
  })

  socket.on('disconnect', async () => {
    // console.log(socket.id, 'DISCONNECTED')
    const currentUser = await findUserBySocket(socket.id)
    if(currentUser){
      await setInactive(currentUser._id)
      setTimeout(async ()=>{
        const backUser =  await findUserById(currentUser._id)
        if(!(backUser.active && backUser.currentRoom === currentUser.currentRoom)){
          if(!backUser.active)
            await removeUser(socket.id)
          const userList = await getUserList(currentUser.currentRoom)
          io.to(currentUser.currentRoom).emit('updateUserList', userList)
          io.to(currentUser.currentRoom).emit('newMessage', generateMessage('Admin', `${currentUser.name} has left`, 'admin'))
          socket.leave(currentUser.currentRoom)
        }
      }, 5000)
    }
  })
})

let port = process.env.PORT || 3000

server.listen(port, () => {
  console.log('SERVER UP')
})