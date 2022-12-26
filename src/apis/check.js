import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  cehckInOnManual( checkTime ) {
    return apiHelper.post('/checkin', { checkTime }, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}