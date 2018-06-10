import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const state = {
  user: {},
  room: null
}

const mutations = {
  USER_DATA: (state, data) => {
    state.user = data
  },
  CURRENT_ROOM: (state, data) => {
    state.room = data
  },
  RESET_DATA: (state) => {
    state.user = {}
    state.room = null
  },
  SOCKET_DISCONNECT: (state) => {
    state.user = {}
  },
  SOCKET_CHECK: (state, data) => {
    console.log(data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [
    createPersistedState()
  ]
})
