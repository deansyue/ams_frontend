<template>
  <NavBar />

  <div class="container-fluid">
    <form class="mt-5" @submit.prevent.stop="handleSubmit">
      <div class="row">
        <div class="col">
          <span class="h3 font-weight-normal">查詢打卡</span>
        </div>

        <div class="col">
          <input
            id="startDate"
            v-model="startDate"
            type="date"
            class="form-control p-0"
            placeholder="start Date"
            required
            autofocus
          />
        </div>

        <span class="h3 font-weight-normal">~</span>

        <div class="col">
          <input
            id="endDate"
            v-model="endDate"
            type="date"
            class="form-control"
            placeholder="end Date"
            required
            autofocus
          />
        </div>

        <div class="col">
          <button
            class="btn btn-primary btn-block mb-2 w-50 m-auto"
            type="submit"
          >
            查詢
          </button>
        </div>
      </div>
    </form>

    <table class="table mt-5">
      <thead class="thead-dark">
        <tr>
          <th scope="col">日期</th>
          <th scope="col">星期</th>
          <th scope="col">班次</th>
          <th scope="col">上班時間</th>
          <th scope="col" v-if="useGps">上班位置</th>
          <th scope="col">下班時間</th>
          <th scope="col" v-if="useGps">下班位置</th>
          <th scope="col">出缺勤</th>
          <th scope="col">備註</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="checkRecordData in checkRecordDatas"
          :key="checkRecordData.date"
        >
          <th scope="row">
            {{ checkRecordData.date }}
          </th>
          <td>
            {{ checkRecordData.week }}
          </td>
          <td>{{ checkRecordData.calFg }}</td>
          <td>
            {{
              checkRecordData.Attendances.workTime
                ? checkRecordData.Attendances.workTime
                : ""
            }}
          </td>
          <td v-if="useGps">
            {{
              checkRecordData.Attendances.workGps
                ? checkRecordData.Attendances.workGps
                : ""
            }}
          </td>
          <td>
            {{
              checkRecordData.Attendances.offTime
                ? checkRecordData.Attendances.offTime
                : ""
            }}
          </td>
          <td v-if="useGps">
            {{
              checkRecordData.Attendances.offGps
                ? checkRecordData.Attendances.offGps
                : ""
            }}
          </td>
          <td>
            {{
              checkRecordData.Attendances.attFg
                ? checkRecordData.Attendances.attFg
                : ""
            }}
          </td>
          <td>{{ checkRecordData.rem }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "../components/NavBar.vue";
import checkRecordAPI from "../apis/checkRecord";
import { Toast } from "../utils/helper";

export default {
  name: "CheckRecord",
  components: {
    NavBar,
  },

  data() {
    return {
      startDate: "",
      endDate: "",
      timeZone: "",
      checkRecordDatas: [],
      useGps: "",
    };
  },

  methods: {
    // 打卡記錄-日期區間查詢
    handleSubmit() {
      const startDateArray = this.startDate.split("/");
      const endDateArray = this.endDate.split("/");
      for (let i = 0; i < 3; i++) {
        if (startDateArray[i] === "" || endDateArray[i] === "") {
          return Toast.fire({
            icon: "error",
            title: "需輸入完整日期,請重新輸入",
          });
        }
      }

      // 清空checkRecordDatas
      this.checkRecordDatas = [];

      const startDate = this.$moment(this.startDate)
        .tz(this.timeZone)
        .valueOf();
      const endDate = this.$moment(this.endDate).tz(this.timeZone).valueOf();
      const timeZone = this.timeZone;

      // 呼叫後端api
      return checkRecordAPI
        .getCheckRecord({ startDate, endDate, timeZone })
        .then((response) => {
          const { data } = response;

          // 回傳錯誤狀態時
          if (data.status === "error") {
            return Toast.fire({
              icon: "error",
              title: data.message,
            });
          }

          this.checkRecordDatas = data.data.checkData;
        })
        .catch((error) => {
          return Toast.fire({
            icon: "error",
            title: error.message,
          });
        });
    },
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticatedUser"]),
  },

  // 取vuex的company的資料進行數值初始化
  created() {
    this.useGps = this.currentUser.Company.useGps || false;
    this.timeZone = this.currentUser.Company.area || "Asia/Taipei";

    const timeZone = this.timeZone;
    const currentDate = this.$moment().tz(this.timeZone);
    const startDate = this.$moment(
      currentDate.format("YYYY/MM") + "/01"
    ).valueOf();
    const endDate = currentDate.valueOf();

    this.startDate = this.$moment(startDate).tz(timeZone).format("YYYY-MM-DD");
    this.endDate = this.$moment(endDate).tz(timeZone).format("YYYY-MM-DD");

    // 呼叫後端api
    return checkRecordAPI
      .getCheckRecord({ startDate, endDate, timeZone })
      .then((response) => {
        const { data } = response;

        // 回傳錯誤狀態時
        if (data.status === "error") {
          return Toast.fire({
            icon: "error",
            title: data.message,
          });
        }

        this.checkRecordDatas = data.data.checkData;
      })
      .catch((error) => {
        return Toast.fire({
          icon: "error",
          title: error.message,
        });
      });
  },
};
</script>
