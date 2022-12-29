<template>
  <div class="container py-5">
    <NavBar />
    <div class="mt-5">
      <form @submit.prevent.stop="handleSubmit">
      <h1 class="text-center">上下班打卡</h1>
      <div class="time mt-5 text-center">
        <h2>現在日期：{{ nowDate }}</h2>
        <h2>現在時間：{{ nowTime }}</h2>
        <input type="checkbox" id="UseGps" name="UseGps" v-bind:checked="UseGps" @click="changeUseGps" style="display:none;">
        <label for="UseGps" style="display:none;">使用gps驗證打卡</label>
        <button type="submit" class="btn btn-lg btn-info">打卡</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import checkAPI from "../apis/check";
import { Toast } from "../utils/helper"
import getPosition from "../utils/getPosition"
import getDistance from 'geolib/es/getDistance'

export default {
  name: "CheckIn",
  components: {
    NavBar,
  },

  data() {
    return {
      checkTime: null,
      nowDate: null,
      nowTime: null,
      timeZone: '',
      UseGps: ''
    }
  },

  methods: {
    // 動態顯示當前時間method
    getNowFormatDate(v) {
      const dateTime = this.$moment(v).tz(this.timeZone)
      this.nowDate = dateTime.format('YYYY/MM/DD')
      this.nowTime = dateTime.format('LTS')
    },

    // 動態顯示當前時間method
    nowTimes() {
      this.checkTime = new Date().valueOf()
      this.getNowFormatDate(this.checkTime)
      setInterval(this.nowTimes, 1000)
      this.clear()
    },

    // 動態顯示當前時間method
    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null
    },

    // 打卡method
    handleSubmit() {
      const checkTime = this.checkTime
      let gps = ''

    // 判斷是否執行gps驗證
    if (this.UseGps) {

      // 判斷當前瀏覽器是否支援geolocation
      if(!navigator.geolocation){  
        return Toast.fire({
            icon: 'error',
            title: "此瀏覽器不支援定位功能!!!"
          })  
        }
        
        // gps驗證判斷
        return getPosition()
        .then(position => {
          const userCompany = JSON.parse(localStorage.getItem('currentUser')).Company          
          const currentLatitude = position.coords.latitude
          const currentLongitude = position.coords.longitude

          // 判斷截取經緯度，與資料庫儲存的公司地址經緯度，距離是否超過400公尺
          if (getDistance({ latitude: userCompany.latitude, longitude: userCompany.longitude }, { latitude: currentLatitude, longitude: currentLongitude }, 1) > 400) {
            return Toast.fire({
            icon: 'error',
            title: '打卡位置離公司超過400公尺,請確認位置後再重新打卡!'
          })
          }

        // 將當前坐標經緯度串成字串，回填到打卡table的gps欄位
        gps = '(' + currentLatitude + ',' + currentLongitude + ')'

        // 執行打卡api
        return checkAPI.cehckInOnManual( { checkTime, gps } )
        .then(response => {
          const { data } = response

          if (data.status === 'error') {
            throw new Error(data.message)
          }

          return Toast.fire({
            icon: 'success',
            title: data.message
          })
        })
        .catch(error => {
          return Toast.fire({
            icon: 'error',
            title: error.message
          })
        })


        })
        .catch(error => {
            return Toast.fire({
            icon: 'error',
            title: error.message
          })
        }) 
        
      }

      // 無gps打卡執行打卡api
      return checkAPI.cehckInOnManual( { checkTime } )
        .then(response => {
          const { data } = response

          if (data.status === 'error') {
            throw new Error(data.message)
          }

          return Toast.fire({
            icon: 'success',
            title: data.message
          })
        })
        .catch(error => {
          return Toast.fire({
            icon: 'error',
            title: error.message
          })
        })
      
    },

    // 點擊checkbox，變動UseGps值
    changeUseGps() {
      this.UseGps = !this.UseGps
    }
  },

  mounted() {
    this.nowTimes()
  },

  // 取localStorage的company，填入timeZone與UseGps
  created() {
  const userCompany = JSON.parse(localStorage.getItem('currentUser')).Company
  this.timeZone = userCompany.area || 'Asia/Taipei'
  this.UseGps = userCompany.useGps || false
  }
};
</script>
