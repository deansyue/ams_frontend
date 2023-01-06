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
    }
  },
  actions: {
    fetchCurrentUser({ commit }) {
      authorizationAPI.getCurrentUser()
        .then(response => {
          const { data } = response
          if (data.status === 'error') console.error(data.message)
          commit('setCurrentUser', data.data.user)
        })
        .catch(err => {
          console.error(err.message)
        })
    }
  },
  modules: {
  }
})
