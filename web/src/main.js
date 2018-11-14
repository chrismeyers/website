import Vue from 'vue'
import router from './router'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

Vue.config.productionTip = false

new Vue({
  router,
  render: create => create(App)
}).$mount('#app')
