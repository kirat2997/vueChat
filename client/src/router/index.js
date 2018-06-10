import Vue from 'vue'
import Router from 'vue-router'
import Join from '@/components/Join'
import Home from '@/components/Home'
import Intro from '@/components/Intro'
import Room from '@/components/Room'

import { checkUser } from '../utils/helpers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Join',
      component: Join
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: checkUser,
      children: [
        {
          path: '',
          component: Intro
        },
        {
          path: 'room/:name',
          component: Room
        }
      ]
    }
  ]
})
