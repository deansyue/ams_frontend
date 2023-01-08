<template>
  <div class="container py-5 text-center mt-5">
    <h1 class="mb-5">打卡用二維條碼產生器</h1>
    <form @submit.prevent.stop="generateQRcode">
      <div class="d-flex">
        <label
          class="form-label-group mb-2 ml-auto"
          style="font-size: 30px"
          for="user"
          >user account</label
        >
        <input
          id="user"
          v-model="user"
          type="text"
          class="form-control w-50 ml-5 mr-auto"
          placeholder="請輸入想產生打卡QRcode的員工帳號"
          required
          autofocus
        />
      </div>
      <button class="btn btn-primary mt-2" type="submit">
        產生打卡用二維條碼
      </button>
      <router-link
        class="btn btn-primary mt-2 ml-5"
        style="width: 170px"
        :to="'/SignIn'"
        >回到登入畫面</router-link
      >
    </form>
    <div class="mt-5" v-if="value !== ''">
      <span class="h1">{{ generateAccount }}的打卡QRcode</span>
      <br />
      <qrcode-vue :value="value" :size="size"></qrcode-vue>
      <br />
      <br />
      <button class="btn btn-info mr-1" v-on:click="upsize">放大</button>
      <button class="btn btn-info" v-on:click="downsize">縮小</button>
    </div>
  </div>
</template>


<script>
import QrcodeVue from "qrcode.vue";
import bcrypt from "bcryptjs";
import getPosition from "../utils/getPosition";
import getDistance from "geolib/es/getDistance";
import QRcodeAPI from "../apis/qrcode";
import { baseURL, Toast } from "../utils/helper";
export default {
  components: {
    QrcodeVue,
  },

  data() {
    return {
      value: "",
      size: 300,
      user: "",
      generateAccount: "",
    };
  },

  methods: {
    // 放大二維條碼
    upsize() {
      this.size = this.size + 100;
    },

    // 縮小二維條碼
    downsize() {
      this.size = this.size - 100;
    },

    // 產生二維條碼
    generateQRcode() {
      this.user = this.user.trim();
      if (!this.user) {
        return Toast.fire({
          icon: "error",
          title: "user欄位不可空白,請輸入",
        });
      }

      // 判斷當前瀏覽器是否支援geolocation
      if (!navigator.geolocation) {
        this.value = ''
        return Toast.fire({
          icon: "error",
          title: "此功能需使用定位功能,但此瀏覽器不支援定位功能!!!",
        });
      }

      // 呼叫findUserData api取得填入帳號的公司資訊
      return QRcodeAPI.findCompanyData(this.user)
        .then((userData) => {
          const { data } = userData;
          if (data.status === "error") {
            throw new Error(data.message);
          }

          // gps驗證判斷
          getPosition()
            .then((position) => {
              // 取得公司經緯
              const userCompany = {
                latitude: data.data.company.latitude,
                longitude: data.data.company.longitude,
              };

              // 取得使用者當前經緯度
              const currentLatitude = position.coords.latitude;
              const currentLongitude = position.coords.longitude;

              // 判斷當前經緯度，與資料庫儲存的公司地址經緯度，距離是否超過100公尺
              if (
                getDistance(
                  {
                    latitude: userCompany.latitude,
                    longitude: userCompany.longitude,
                  },
                  { latitude: currentLatitude, longitude: currentLongitude },
                  1
                ) > 100
              ) {
                this.value = ''
                return Toast.fire({
                  icon: "error",
                  title: "此功能需在公司才能使用,請確認位置後再重新執行!",
                });
              }

              // 取得公司時區的當日日期,並將日期加密
              let datehash = this.$moment()
                .tz(data.data.company.area)
                .format("YYYY/MM/DD");
              datehash = bcrypt.hashSync(datehash, bcrypt.genSaltSync(10));
              // 二維條碼value為qrcode打卡路由,給予使用者id及加密日期
              this.value = `${baseURL}/qrcode/checkin?id=${data.data.user.id}&date=${datehash}`;
              this.generateAccount = this.user;
              this.user = "";
              return Toast.fire({
                icon: "success",
                title: `${this.generateAccount}打卡用二維條碼產生成功`,
              });
            })
            .catch((error) => {
              this.value = ''
              return Toast.fire({
                icon: "error",
                title: error,
              });
            });
        })
        .catch((error) => {
          this.value = ''
          return Toast.fire({
            icon: "error",
            title: error,
          });
        });
    },
  },
};
</script>