import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  changePassword({ oldPassword, newPassword, confirmPassword }) {
    return apiHelper.put('/users/putUserPassword', { oldPassword, newPassword, confirmPassword }, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}