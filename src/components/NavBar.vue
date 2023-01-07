<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" :to="'/HomePage'">考勤管理系統</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" :to="'/HomePage'">首頁</router-link>
      </li>

      <div class="d-flex" v-if="currentUser.role === 1">
        <li class="nav-item">
        <router-link class="mr-2 nav-link" :to="'/CheckIn'">上下班打卡</router-link>
      </li>
      <li class="nav-item dropdown">
        <router-link class="mr-2 nav-link" :to="'/CheckRecord'">打卡記錄表</router-link>
      </li>
      </div>
      
      <div class="d-flex" v-if="currentUser.role === 0">
        <li class="nav-item dropdown">
        <router-link class="mr-2 nav-link" :to="'/admin/EditCompany'">修改公司資料</router-link>
      </li>
       <li class="nav-item dropdown">
        <router-link class="mr-2 nav-link" :to="'/admin/UnlockedUser'">解鎖員工帳號</router-link>
      </li>
      </div>
      
    </ul>

    <div class="d-flex my-2 my-lg-0">
      <span class="mr-sm-2">帳號：{{currentUser.account}}</span>
      <span class="mr-sm-2">使用者：{{currentUser.name}}</span>
      <div class="d-flex" v-if="currentUser.role === 1">
        <router-link class="mr-sm-2 text-muted" :to="'/ChangePassword'">修改密碼</router-link>
      </div>
      <button class="mr-sm-2 text-muted" @click="logOut()">登出</button>
    </div>
  </div>
</nav>
</template>

<script>
import { Toast } from "../utils/helper"
import { mapState } from "vuex"

export default {
  methods: {
    logOut() {
      this.$store.commit('revokeAuthentication')
      Toast.fire({
        icon: "success",
        title: "登出成功"
      })
      this.$router.push('/SignIn')
    }
  },

  computed: {
    ...mapState(['currentUser', 'isAuthenticatedUser'])
  }
}
</script>
