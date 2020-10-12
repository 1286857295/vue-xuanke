import Vue from 'vue'
import Vuex from 'vuex'
import vueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(vueResource)
export default new Vuex.Store({
  state: {
    userType:"3",
    userId:"",
    teaData:[],
    stuData:[],
    courseData:[],
    roomData:[]
  },
  mutations: {
  },
  actions: {
    
  },
  modules: {
  }
})
