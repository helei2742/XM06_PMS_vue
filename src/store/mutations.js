import {addCookie, delCookie} from "@/util/cookie";
import router from "../router"

export default {
  screenWidthChange(state, payload){
    state.screenWidth = payload.width
  },
  screenHeightChange(state, payload){
    state.screenHeight = payload.height
  },
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
  },
  changeColorModule(state, payload) {
    state.colorModule = payload.colorModule
  },

  /**
   * 根据path添加标签页tab
   * @param state
   * @param payload
   *                  {
   *                    path: String,  路由路径
   *                    query: Object,  query传的参数
   *                    label: String    标签tab的名字
   *                  }
   *  路由路径path不变，但在该路由页面下有让query发生改变的，需要使用  beforeRouteUpdate()来跟新路由页面数据
   *  否则path的query‘更新了 页面数据还是原来的
   */
  addIfNotHaveTab(state, payload){
    //有该路径的导航栏了，改变当前显示的tab就返回
    for (let tab of state.tabs) {
      if(tab.path === payload.path){
        //更新query
        tab.query = payload.query
        state.crtTabName = tab.name
        return
      }
    }
    let tab = {}
    state.addTabCount+=1
    let name = (state.addTabCount).toString()
    tab.name = name
    tab.path = payload.path
    tab.query = payload.query
    tab.label = payload.label

    state.crtTabName =  name
    state.tabs.push(tab)
  },
  /**
   * 根据name删除标签页tab
   * @param state
   * @param payload
   *                  {
   *                   name: String  标签页tab对应的唯一标识
   *                  }
   */
  removeTab(state, payload){
    let name = payload.name
    let index = 0
    for (let i = 0; i < state.tabs.length; i++) {
      if(name === state.tabs[i].name){
        index = i
        break
      }
    }
    state.tabs.splice(index,1)
    //删除一个后默认来到最后一个标签页
    state.crtTabName = state.tabs[state.tabs.length-1].name
    router.push({
      path: state.tabs[state.tabs.length-1].path,
      query: state.tabs[state.tabs.length-1].query
    })
  }
}