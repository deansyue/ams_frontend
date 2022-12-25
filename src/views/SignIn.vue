<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">出勤管理系統</h1>
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="account">account</label>
        <input
          id="account"
          v-model="account"
          type="text"
          class="form-control"
          placeholder="account"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from '../utils/helper'
export default {
  data() {
    return {
      account: "",
      password: "",
      isProcess: false
    };
  },

  methods: {
    handleSubmit() {
      const account = this.account
      const password = this.password

      // 前端驗證
      if (!account || !password) {
        return Toast.fire({
          icon: 'error',
          title: '帳號或密碼不可空白'
        })
      }

      // 前端驗證通過時
      this.isProcess = true
      authorizationAPI
        .signIn({
          account,
          password,
        })
        .then((response) => {
          const { data } = response

          // 回傳status為error時
          if (data.status === 'error') {
            throw new Error(data.message)
          }
          // 回傳status為success時
          this.isProcess = false
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('currentUser', JSON.stringify(data.data.user))
          this.$router.push('/homePage')
        })
        .catch(error => {
          this.isProcess = false
          this.password = ''
          Toast.fire({
            icon: 'error',
            title: error.message
          })
        })
    },
  },
};
</script>

