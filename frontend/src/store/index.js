import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null, 
  },
  mutations: {
    "WEB_CONNEXION" : function (state, data) {
        this.$axios.post("http://localhost:3000/login", data).then((res) => {
          this.state.token = res.data.token;
        }); 
    } 
  },
  actions: {
  },
  modules: {
  }
})
