import {addCookie, getCookie} from "@/util/cookie";
import {findUserByUserIdStr} from "@/network/user";
import {SUMCOLORMODULE} from "@/store/mutations-types";

export default {
  getApiDocSrc(state){
    return state.apiDocSrc
  },
  getScreenSize(state){
    return {
      width: state.screenWidth,
      height: state.screenHeight
    }
  },
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
    if(state.userIdStr != null && localUserIdStr == null)
      localUserIdStr = state.userIdStr
    //store 和cookie 都没有，根本没登录过，直接返回
    if(localUserIdStr===null||localUserIdStr===undefined||localUserIdStr ==='')
      return null

    // if(state.loginUser == null){
    //   console.log('-----------')
    //   findUserByUserIdStr(localUserIdStr).then(res =>{
    //     state.loginUser = res.result
    //   })
    // }
    return state.loginUser
  },
  getTabs(state) {
    return state.tabs
  },
  getCrtTabName(state){
    return state.crtTabName
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
  },
  getAppBgc(state) {
    let color = state.color
    let colorModule = state.colorModule
    return {
      'backgroundColor': color[colorModule].appColor,
    }
  },
  getNavbarBgi(state) {
    let color = state.color
    let colorModule = state.colorModule
    return {
      'backgroundImage': color[colorModule].navbarBgi
    }
  }
}