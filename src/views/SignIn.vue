<template>
  <div class="container py-5">
    <form class="w-50 m-auto" @submit.prevent.stop="handleSubmit">
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

      <button class="btn btn-lg btn-primary btn-block mb-2 w-50 m-auto" type="submit">
        登入
      </button>
      <router-link
        class="btn-block mt-4 mr-auto ml-auto w-50 pl-4" style="font-size: 22px;"
        :to="'/QRcodeGenerate'"
        >產生打卡用二維條碼</router-link
      >
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
      const account = this.account.trim()
      const password = this.password.trim()

      // 前端驗證
      if (!account || !password) {
        this.account = ''
        this.password = ''
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
          this.$store.commit('setCurrentUser', data.data.user)
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

