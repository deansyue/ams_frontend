import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/signin', {
      account,
      password
    })
  },

  getCurrentUser() {
    return apiHelper.get('/users/getCurrentUser', { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}