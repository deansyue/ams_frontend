import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  changePassword({ oldPassword, newPassword, confirmPassword }) {
    return apiHelper.post('/users/changePassword', { oldPassword, newPassword, confirmPassword }, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}