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
    loginUser: null
  },
  modules: {
    groupStore: groupStore
  },
  getters,
  actions,
  mutations
})
