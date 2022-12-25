<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" :to="'/HomePage'">考勤管理系統</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="'/HomePage'">首頁</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="'/checkIn'">上下班打卡</router-link>
      </li>
      <li class="nav-item dropdown">
        <router-link class="nav-link" :to="'/checkRecord'">打卡記錄表</router-link>
      </li>
    </ul>

    <div class="my-2 my-lg-0">
      <span class="mr-sm-2">帳號：{{account}}</span>
      <span class="mr-sm-2">使用者：{{name}}</span>
      <router-link class="mr-sm-2 text-muted" :to="'/changePassword'">修改密碼</router-link>
      <button class="mr-sm-2 text-muted" @click="logOut()">登出</button>
    </div>
  </div>
</nav>
</template>

<script>
import { Toast } from "../utils/helper"

export default {
  data() {
    return {
      account: "",
      name: ""
    }
  },

  methods: {
    logOut() {
      localStorage.clear()
      Toast.fire({
        icon: "success",
        title: "登出成功"
      })
      this.$router.push('/')
    }
  },

created() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  this.account = currentUser.account || ''
  this.name = currentUser.name  || ''
}
}
</script>
