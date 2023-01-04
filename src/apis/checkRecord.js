import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  getCheckRecord ({ startDate, endDate, timeZone }) {
    const searchParams = new URLSearchParams({ startDate, endDate, timeZone })
    return apiHelper.get(`/checkRecord/getCheckRecord?${searchParams.toString()}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}