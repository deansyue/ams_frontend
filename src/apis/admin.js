import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  editCompanyData(name, useGps, area) {
    return apiHelper.post('/admin/editCompany', { name, useGps, area }, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}