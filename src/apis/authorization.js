import { apiHelper } from '../utils/helper'

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/signin', {
      account,
      password
    })
  }
}