import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  cehckInOnManual( checkTime ) {
    return apiHelper.post('/checkin/0', { checkTime }, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}