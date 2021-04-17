import Vue from 'vue'
import App from './App.vue'
<<<<<<< Updated upstream
=======
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
>>>>>>> Stashed changes

Vue.config.productionTip = false

new Vue({
<<<<<<< Updated upstream
  render: h => h(App),
=======
  vuetify,
  router,
  store,
  render: h => h(App)
>>>>>>> Stashed changes
}).$mount('#app')
