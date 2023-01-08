<template>
  <NavBar />

  <div class="container py-5">
    <form class="w-50 m-auto" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4 mt-4">
        <h1 class="h3 mb-3 font-weight-normal">修改公司資料</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">公司名稱</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="form-control"
          placeholder="公司名稱"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label id="useGps" class="mr-2 mt-3">使用Gps驗證</label>
        <select name="useGps" v-model="useGps" required>
          <option value="false">不使用Gps驗證</option>
          <option value="true">使用Gps驗證</option>
        </select>
      </div>

      <div class="form-label-group mb-3">
        <label id="area" class="mr-2 mt-3">公司所在地區</label>
        <select name="area" v-model="area" required>
          <option value="Asia/Taipei">台灣/台北</option>
          <option value="Asia/Tokyo">日本/東京</option>
          <option value="America/New_York">美國/紐約</option>
        </select>
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        送出
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "../../components/NavBar.vue";
import adminAPI from "../../apis/admin";
import { Toast } from "../../utils/helper";
export default {
  name: "edit-Company",
  components: {
    NavBar,
  },

  data() {
    return {
      name: "",
      useGps: "",
      area: "",
    };
  },

  methods: {
    handleSubmit() {
      const name = this.name.trim();
      const useGps = this.useGps;
      const area = this.area.trim();

      // 判斷欄位輸入的正確性
      if (!name || !area || (useGps !== "true" && useGps !== "false")) {
        return Toast.fire({
          icon: "error",
          title: "有欄位填寫錯誤,請重新填寫!",
        });
      }

      // 呼叫後端api
      return adminAPI
        .editCompanyData(name, useGps, area)
        .then((response) => {
          const { data } = response;

          // 回傳status為error時
          if (data.status === "error") {
            throw new Error(data.message);
          }

          // 回傳status為success時
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          // 成功後,跳回首頁
          this.$router.push("/HomePage");
        })
        .catch((error) => {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        });
    },
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticatedUser"]),
  },

  created() {
    const company = this.currentUser.Company;
    this.name = company.name;
    this.useGps = String(company.useGps);
    this.area = company.area;
  },
};
</script>

