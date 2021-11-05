import Vue from 'vue'
import Vuex from 'vuex'

import groupStore from "@/store/modules/groupmodule"
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIdStr: null,
    loginUser: null,
    colorModule: 0,
    color: [{bgcColor: '#50bdff', slotAreaBgc: '#84ceff', desBgc: '#b6baba', fontColor: '#202020'},
            {bgcColor: '#202020', slotAreaBgc: '#333333', desBgc: '#3c3f41', fontColor: '#bbbbbb'}]
  },
  modules: {
    groupStore: groupStore
  },
  getters,
  actions,
  mutations
})
