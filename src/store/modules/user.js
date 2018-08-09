import Vue from 'vue'
import _ from 'lodash'
import * as types from '../mutation-type'
import menu from '@/menu'
import router from '@/router'

const state = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  loggedIn: false,
  userInfo: null,
  menu: []
}

const getters = {
  username (state) {
    return state.username
  },
  menu (state) {
    return state.menu
  }
}

const mutations = {
  [types.SET_USERNAME] (state, username) {
    state.username = username
    localStorage.setItem('username', username)
  },
  [types.SET_USER_TOKEN] (state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
    state.loggedIn = true
    state.menu = _.compact(menu.map(m => {
      if (m.children) {
        const subms = _.compact(m.children.map(subm => {
          if (state.userInfo.permission.includes(subm.label)) {
            return subm
          }
        }))
        return subms.length > 0 ? {
          label: m.label,
          children: subms
        } : undefined
      } else {
        if (state.userInfo.permission.includes(m.label)) {
          return m
        }
      }
    }))
  },
  [types.LOGOUT] (state) {
    state.userInfo = null
    state.loggedIn = false
    state.menu = []
    state.token = ''
    localStorage.removeItem('token')
    state.username = ''
    localStorage.removeItem('username')
    router.push('/login')
  }
}

const actions = {
  async login ({ commit, dispatch }, data) {
    try {
      const res = await Vue.http.post('/users/login', data)
      if (res.data.code === 0) {
        commit(types.SET_USER_TOKEN, res.data.data.token)
        // const userInfoRes = await dispatch('getUserInfo')
        return res
      } else {
        dispatch('logout')
        return res
      }
    } catch (e) {
      dispatch('logout')
      return e
    }
  },
  async getUserInfo ({ commit, dispatch, state }) {
    try {
      const res = await Vue.http.post('/users/info', {
        token: state.token
      })
      if (res.data.code === 0) {
        commit(types.SET_USERNAME, res.data.data.username)
        commit(types.SET_USER_INFO, res.data.data)
        return res
      } else {
        dispatch('logout')
        return res
      }
    } catch (e) {
      dispatch('logout')
      return e
    }
  },
  logout ({ commit }) {
    commit(types.LOGOUT)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
