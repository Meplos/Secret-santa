import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import axios from "axios"
import i18n from './i18n'
Vue.config.productionTip = false

Vue.prototype.$appName = "Secret Santa"

new Vue({
  axios,
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
