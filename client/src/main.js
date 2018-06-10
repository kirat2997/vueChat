// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

import('../node_modules/vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)

Vue.config.productionTip = false
sync(store, router)

const socket = io('http://localhost:3000')
Vue.use(VueSocketIO, socket, store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  socket,
  store,
  template: '<App/>',
  components: { App }
})
