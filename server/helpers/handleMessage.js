const moment = require('moment')
const Chat = require('../schema/chat')

const generateMessage = (from, text, textClass) => {
    const now = moment().valueOf()
    const createdAt =  moment(now).format('h:mm a')
    return {
        from,
        text,
        createdAt,
        textClass,
        key: moment().valueOf()
    }
}

const loadMessage = async (room) => {
  const chats = await Chat.find({chatRoom: room}).sort({'key': 'asc'})
  return chats
}

const saveMessage = async (data, chatRoom) => {
  const text = data.text
  const from = data.from
  const createdAt = data.createdAt
  const key = data.key
  const chat = new Chat({
    text,
    from,
    createdAt,
    chatRoom,
    key
  })

  await chat.save()
}

module.exports = { generateMessage, saveMessage, loadMessage }
