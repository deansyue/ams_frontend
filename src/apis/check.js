import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  cehckInOnManual( checkTime, gps ) {
    return apiHelper.post('/checkin', { checkTime, gps }, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}