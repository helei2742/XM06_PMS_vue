import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {getCookie, addCookie, delCookie} from "@/util/cookie";
import {findUserByUserIdStr} from "@/network/user";

export default new Vuex.Store({
  state: {
    userIdStr: null,
    loginUser: null
  },
  mutations: {
    loginSuccess(state, payload){
      state.userIdStr = payload.userIdStr
      addCookie('userIdStr', payload.userIdStr, 24*7)
    },
    logout(state) {
      state.userIdStr = null
      state.loginUser = null
      delCookie('userIdStr')
    },
    checkSuccess(state, payload) {
      state.loginUser = payload.loginUser
    }
  },
  getters: {
    getUserIdStr(state){
      let localUserIdStr = getCookie('userIdStr')
      if(state.userIdStr == null && localUserIdStr != null){
        state.userIdStr = localUserIdStr
      }else if(localUserIdStr == null && state.userIdStr != null){
        addCookie('userIdStr', state.userIdStr, 24*7)
      }
      return state.userIdStr
    },
    getLoginUser(state){
      let localUserIdStr = getCookie('userIdStr')
      if(state.loginUser == null){
        findUserByUserIdStr(localUserIdStr).then(res =>{
          state.loginUser = res.result
        })
      }
      return state.loginUser
    }
  },
  actions: {
  },
  modules: {
  }
})
