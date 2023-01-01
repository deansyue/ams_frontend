import { apiHelper } from '../utils/helper'

export default {
  findCompanyData( userAccount ) {
    return apiHelper.post('/qrcode/findcompanydata', { userAccount })
  },

}