<template>
    <NavBar />

  <div class="container py-5">
    <h1 class="h3 mt-5 font-weight-normal text-center">解鎖員工上鎖狀態</h1>
    <form class="text-center" @submit.prevent.stop="reload">
      <button type="submit" class="btn-primary mt-5">重新載入</button>
    </form>
    
    <div v-if="lockedUsers.length > 0">
      <form @submit.prevent.stop="handleSubmit">
        <table class="table mt-2">
        <thead class="thead-dark">
          <tr>
            <th scope="col">所屬公司</th>
            <th scope="col">帳號</th>
            <th scope="col">姓名</th>
            <th scope="col">上鎖狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lockedUser in lockedUsers"
            :key="lockedUser.id"
          >
            <th scope="row">
              {{ lockedUser.Company.name }}
            </th>
            <td>
              {{ lockedUser.account }}
            </td>
            <td>{{ lockedUser.name }}</td>
            <td>
            <select name="lock" v-model="lockedUser.lock" required>
              <option value= 1>已上鎖</option>
              <option value= 0>解鎖</option>
          </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-right">
      <button type="submit" class="btn-primary mt-2">送出</button>
      </div>
    </form>
    </div>

    <div class="m-5 text-center" v-else>
      <h1 class="h2">現無上鎖員工</h1>
    </div>
    
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import adminAPI from "../../apis/admin";
import { Toast } from "../../utils/helper";

export default {
  name: "UnlockedUser",
  components: {
    NavBar,
  },

  data() {
    return {
      lockedUsers: []
    };
  },

  methods: {
    // 重新載入
    reload() {
      adminAPI.getLockedUserData()
      .then(response => {
        const { data } = response

        if (data.status === 'error') {
          return Toast.fire({
            icon: 'error',
            title: data.message
          })
        }

        this.lockedUsers = data.data.lockedUser
        this.lockedUsers.map(user => {
          // 將lock從數值轉為字串
          user.lock = String(user.lock)
        })
      })
      .catch(error => {
        return Toast.fire({
          icon: 'error',
          title: error.message
        })
      })
    },

    // 更新上鎖狀態
    handleSubmit() {
      let unlockedUsersId = []
      this.lockedUsers.map(user => {
        // 先判斷輸入的lock是否為1或0以外的值
        if (user.lock !== '1' && user.lock !== '0') {
          return Toast.fire({
            icon: 'error',
            title: '上鎖狀態輸入有誤,請重新確認'
          })
        }
        // 將lock異動為0的員工id記錄起來
        if (user.lock === '0') unlockedUsersId.push(user.id)
      })

      // 若無異動上鎖狀態的員工,視為已更新完成
      if (unlockedUsersId.length < 1) {
         Toast.fire({
          icon: 'success',
          title: '選擇的員工上鎖狀態已更新!!'
        })
        // 重新載入table
        return this.reload()
      }
      
      // 呼叫後端api
      return adminAPI.putUserLocked(unlockedUsersId)
        .then(response => {
         const { data } = response

        // 當status = error
         if (data.status === 'error') {
           return Toast.fire({
            icon: 'error',
            title: data.message
          })
         }

        // status = success
         Toast.fire({
          icon: 'success',
          title: data.message
         })
         // 重新載入table
         return this.reload()
        })
        .catch(error => {
          return Toast.fire({
            icon: 'error',
            title: error.message
          })
        })
    },
  },

  // 呼叫後端api取得全公司有上鎖的員工資料
  created() {
    adminAPI.getLockedUserData()
      .then(response => {
        const { data } = response

        // status = error時
        if (data.status === 'error') {
          return Toast.fire({
            icon: 'error',
            title: data.message
          })
        }

        this.lockedUsers = data.data.lockedUser
        this.lockedUsers.map(user => {
          // 將lock從數值轉為字串
          user.lock = String(user.lock)
        })
      })
      .catch(error => {
        return Toast.fire({
          icon: 'error',
          title: error.message
        })
      })
  },
};
</script>
