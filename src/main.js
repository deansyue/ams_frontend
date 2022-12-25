import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment-timezone'

const app = createApp(App)

app.use(router).mount('#app')
app.config.globalProperties.$moment = moment
