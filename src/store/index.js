import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const key = 'sessionUser'
const store = new Vuex.Store({
  state() {
    return {
      sessionUser: null
    }
  },
  getters: {
    sessionUser: function (state) {
      if (state.sessionUser) {
        return state.sessionUser
      }
      let localSessionUser = localStorage.getItem(key)
      if (localSessionUser) {
        state.sessionUser = JSON.parse(localSessionUser)
      } else {
        state.sessionUser = {
          'userId': 0,
          'logonStatus': false,
          'account': '',
          'username': '游客'
        }
      }
      return state.sessionUser
    }
  },
  mutations: {
    setSessionUser(state, value) {
      state.sessionUser = value
      localStorage.setItem(key, JSON.stringify(value))
    },
    clearSessionUser(state) {
      state.sessionUser = {
        'userId': 0,
        'logonStatus': false,
        'account': '',
        'username': '游客'
      }
      localStorage.removeItem(key)
    }
  }
})

export default store