import axios from 'axios'
import store from '../vuex/store'

export async function userSignup (name, username, password) {
  try {
    const response = await axios.request({
      url: '/api/signup',
      method: 'post',
      data: {
        name,
        username,
        password
      }
    })
    if (response.status === 200) {
      // store.commit('USER_DATA', response.data)
      return true
    }
  } catch (e) {
    return false
  }
}

export async function userLogin (username, password) {
  try {
    const response = await axios.request({
      url: '/api/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
    store.commit('USER_DATA', response.data)
    return true
  } catch (error) {
    return false
  }
}

export function checkUser (to, from, next) {
  if (!store.state.user._id) {
    next('/')
  } else {
    next()
  }
}
