import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null, 
  },
  mutations: {
    "WEB_CONNEXION" : function (state, data) {
        axios.post("http://localhost:3000/login", data).then((res) => {
          this.state.token = res.data.token;
        }).catch(err => {
          console.error(err);
        });
    }, 
  },
  actions: {
  },
  modules: {
  }
})
