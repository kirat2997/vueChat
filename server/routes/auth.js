const express = require('express')
const router = express.Router()

const User = require('../schema/user')

router.post('/signup', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const name = req.body.name

  const user = await User.findOne({username})
  if(user)
    res.sendStatus(420)
  else{
    const user = new User({
      name,
      username,
      password
    })
    const data = await user.save()
    res.json(data)
  }
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({username: req.body.username, password: req.body.password})
  if(!user)
    res.sendStatus(400)
  else{
    res.json(user)
  }
})

module.exports = router