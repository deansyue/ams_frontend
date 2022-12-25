<template>
  <div class="container py-5">
    <NavBar />
    <div class="mt-5">
      <form @submit.prevent.stop="handleSubmit">
      <h1 class="text-center">上下班打卡</h1>
      <div class="time mt-5 text-center">
        <h2>現在日期：{{ nowDate }}</h2>
        <h2>現在時間：{{ nowTime }}</h2>
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
      timeZone: 'Asia/Taipei'
    }
  },

  methods: {
    getNowFormatDate(v) {
      this.nowDate = v.format('YYYY/MM/DD')
      this.nowTime = v.format('LTS')
    },

    nowTimes() {
      this.checkTime = this.$moment().tz(this.timeZone)
      this.getNowFormatDate(this.checkTime)
      setInterval(this.nowTimes, 1000)
      this.clear()
    },

    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null
    },

    handleSubmit() {
      const checkTime = this.checkTime.format()

      checkAPI.cehckInOnManual( { checkTime } )
        .then(response => {
          const { data } = response

          if (data.status === 'error') {
            throw new Error(data.message)
          }

          Toast.fire({
            icon: 'success',
            title: data.message
          })
        })
        .catch(error => {
          Toast.fire({
            icon: 'error',
            title: error.message
          })
        })
      
    }
  },

  mounted() {
    this.nowTimes()
  }
};
</script>
