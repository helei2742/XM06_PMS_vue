import Vue from 'vue'
import Vuex from 'vuex'

import groupStore from "@/store/modules/groupmodule"
import projectStore from "@/store/modules/projectmodule"

import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenWidth: 0,
    screenHeight: 0,
    userIdStr: null,
    loginUser: null,
    colorModule: 0,// 颜色，对于下方color的索引
    //主题颜色，bgcColor 为ShowWindow组件除去标题行的背景颜色，slotAreaBgc为main插槽区域的颜色，
    //desBgc为插槽区域中，卡片块的颜色， fontColor为插槽区域字体颜色
    //appColor 为页面的背景颜色
    color: [{bgcColor: '#ffffff', slotAreaBgc: '#dcdfe6',
              appColor: '#ffffff', navbarBgi: 'radial-gradient(circle, #ffffff,#ccffff)',
              desBgc: '#b6baba', fontColor: '#202020'},

            {bgcColor: '#202020', slotAreaBgc: '#333333',
              appColor: '#545c64', navbarBgi: 'radial-gradient(circle,#999999, #000000)',
              desBgc: '#3c3f41', fontColor: '#bbbbbb'}]
  },
  modules: {
    groupStore: groupStore,
    projectStore: projectStore
  },
  getters,
  actions,
  mutations
})
