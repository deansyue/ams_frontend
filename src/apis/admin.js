import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  editCompanyData(name, useGps, area) {
    return apiHelper.post('/admin/editCompany', { name, useGps, area }, { headers: { Authorization: `Bearer ${getToken()}` } })
  },

  getLockedUserData() {
    return apiHelper.get('/admin/getLockedUser', { headers: { Authorization: `Bearer ${getToken()}` } })
  },

  putUserLocked(unlockedUsersId) {
    return apiHelper.put('/admin/putUserLocked', { unlockedUsersId }, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}