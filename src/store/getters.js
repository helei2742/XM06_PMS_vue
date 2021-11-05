import {addCookie, getCookie} from "@/util/cookie";
import {findUserByUserIdStr} from "@/network/user";
import {SUMCOLORMODULE} from "@/store/mutations-types";

export default {
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
  },
  getColorModule(state) {
    return state.colorModule
  },
  getColor(state) {
    return state.color
  },
  getCardColorStyle(state){
    let color = state.color
    let colorModule = state.colorModule
    return {
      'backgroundColor': color[colorModule].desBgc,
      'color': color[colorModule].fontColor
    }
  }
}