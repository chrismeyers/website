import Vue from 'vue'
import router from './router'
import App from './App'

Vue.config.productionTip = false

new Vue({
  router,
  render: create => create(App)
}).$mount('#app')
