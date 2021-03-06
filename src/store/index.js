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
    // apiDocSrc: 'http://localhost:9000/XM06/doc.html',
    /**
     * 后端接口文档地址
     */
    apiDocSrc: 'http://www.ylxteach.net/XM06/doc.html',
    screenWidth: 0,
    screenHeight: 0,
    userIdStr: null,
    loginUser: null,

    /**
     * 存放每个标签页的path路径，query参数， name为每个标签页的唯一标识,标签名label
     */
    tabs:[
      {
        label: '首页',
        name: '1',
        path: '/index/welcome',
        query: {}
      }
    ],
    /**
     *   当前标签页
     */
    crtTabName: '1',
    /**
     *   每打开一个标签页加一，用于产生标签页的唯一标识
     */
    addTabCount: 1,

    colorModule: 0,// 颜色，对应下方color的索引
    //主题颜色，bgcColor 为ShowWindow组件除去标题行的背景颜色，slotAreaBgc为main插槽区域的颜色，
    //desBgc为插槽区域中，卡片块的颜色， fontColor为插槽区域字体颜色
    //appColor 为页面的背景颜色
    color: [{bgcColor: '#ffffff', slotAreaBgc: '#dcdfe6',
              appColor: '#ffffff', navbarBgi: 'radial-gradient(circle, #ffffff,#ccffff)',
              desBgc: '#eeeff3', fontColor: '#202020'},

            {bgcColor: '#202020', slotAreaBgc: '#333333',
              appColor: '#545c64', navbarBgi: 'radial-gradient(circle,#999999, #000000)',
              desBgc: '#3c3f41', fontColor: '#bbbbbb'}],

  },
  modules: {
    groupStore: groupStore,
    projectStore: projectStore
  },
  getters,
  actions,
  mutations
})
