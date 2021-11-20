import {addCookie, delCookie} from "@/util/cookie";

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
  }
}