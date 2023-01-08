<template>
    <NavBar />
    <div class="container py-5">
    <form class="w-50 m-auto" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4 mt-4">
        <h1 class="h3 mb-3 font-weight-normal">修改密碼</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="oldPassword">舊密碼</label>
        <input
          id="oldPassword"
          v-model="oldPassword"
          type="password"
          class="form-control"
          placeholder="請輸入舊密碼"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="newPassword">新密碼</label>
        <input
          id="newPassword"
          v-model="newPassword"
          type="password"
          class="form-control"
          placeholder="請輸入新密碼"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="confirmPassword">確認密碼</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          class="form-control"
          placeholder="請再輸入一次新密碼"
          required
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        送出
      </button>
    </form>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import userAPI from "../apis/user";
import { Toast } from "../utils/helper";
export default {
  name: "change-password",
  components: {
    NavBar,
  },

  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },

  methods: {
    handleSubmit() {
      const oldPassword = this.oldPassword.trim();
      const newPassword = this.newPassword.trim();
      const confirmPassword = this.confirmPassword.trim();

      // 前端驗證
      if (!oldPassword || !newPassword || !confirmPassword) {
        return Toast.fire({
          icon: "error",
          title: "欄位不可空白",
        });
      }

      userAPI
        .changePassword({
          oldPassword,
          newPassword,
          confirmPassword,
        })
        .then((response) => {
          const { data } = response;

          this.oldPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";

          // 回傳status為error時
          if (data.status === "error") {
            throw new Error(data.message);
          }
          // 回傳status為success時
          // 清空localStorage資料,導回登入畫面
          this.$store.commit('revokeAuthentication')
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          this.$router.push('/SignIn')
        })
        .catch((error) => {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        });
    },
  },
};
</script>

