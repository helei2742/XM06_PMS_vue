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

  addIfNotHaveTab(state, payload){
    for (let tab of state.tabs) {
      if(tab.path === payload.path){
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
    state.crtTabName = state.tabs[state.tabs.length-1].name
    router.push({
      path: state.tabs[state.tabs.length-1].path,
      query: state.tabs[state.tabs.length-1].query
    })
  }
}