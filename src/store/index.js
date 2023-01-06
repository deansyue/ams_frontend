import { createStore } from 'vuex'
import authorizationAPI from "../apis/authorization"

export default createStore({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      role: '',
      Company: {
        id: '',
        area: '',
        latitude: '',
        longitude: '',
        useGps: '',
      }
    },
    isAuthenticatedUser: false,
    isAuthenticatedAdmin: false
  },
  getters: {
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }

      // 判斷role前先將註冊變為false
      state.isAuthenticatedUser = false
      state.isAuthenticatedAdmin = true

      if (currentUser.role === 1) {
        state.isAuthenticatedUser = true
      } else if (currentUser.role === 0) {
        state.isAuthenticatedAdmin = true
      }
    },

    // 登出，清空資料
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticatedAdmin = false
      state.isAuthenticatedUser = false
      localStorage.removeItem('token')
    }
  },
  actions: {
    fetchCurrentUser({ commit }) {
      authorizationAPI.getCurrentUser()
        .then(response => {
          const { data } = response
          if (data.status === 'error') {
            commit('revokeAuthentication')
            console.error(data.message)
            return false
          }
          commit('setCurrentUser', data.data.user)
          return true
        })
        .catch(err => {
          commit('revokeAuthentication')
          console.error(err.message)
          return false
        })
    }
  },
  modules: {
  }
})
