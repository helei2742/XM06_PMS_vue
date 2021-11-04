import {addCookie, delCookie} from "@/util/cookie";

export default {
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
}