import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment-timezone'
import store from './store'

const app = createApp(App)

app.use(router).mount('#app')
app.use(store)
app.config.globalProperties.$moment = moment
