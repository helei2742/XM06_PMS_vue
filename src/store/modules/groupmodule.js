import {queryJoinedGroupAllNetwork,
        queryMyGroupAllNetwork} from "@/network/group";
import {LOADJOINEDGROUP, LOADMYGROUP} from "@/store/mutations-types-groupmodule";

/**
 * 获取其中 state的数据绑定到data中会不是响应式的，使用时直接用getters获取传入
 */
export default {
  state: {
    joinedGroup: null,
    myGroup: null,
    currentShowGroup: null
  },
  getters:{
    getMyGroup(state) {
      return state.myGroup
    },
    getJoinedGroup(state) {
      return state.joinedGroup
    },
    getCurrentShowGroup(state) {
      return state.currentShowGroup
    }
  },
  actions: {
    //异步请求数据
    reloadJoinedGroup(context){
      if(context.rootState.groupStore.joinedGroup == null) {
        let userId = context.getters.getLoginUser.id
        context.commit(LOADJOINEDGROUP, {userId: userId})
      }
    },
    reloadMyGroup(context) {
      if(context.rootState.groupStore.myGroup == null) {
        let userId = context.getters.getLoginUser.id
        context.commit(LOADMYGROUP, {userId: userId})
      }
    },
    reloadCurrentShowGroup(context){
      if(context.rootState.groupStore.currentShowGroup == null){

      }
    }
  },
  mutations: {
    loadJoinedGroup(state, payload){
      let userId = payload.userId
      if(state.joinedGroup == null) {
        queryJoinedGroupAllNetwork(userId).then(data=>{
          state.joinedGroup = data.result
        }).catch(e => {
          console.log(e)
        })
      }
    },
    loadMyGroup(state, payload){
      let userId = payload.userId
      if(state.myGroup == null) {
        queryMyGroupAllNetwork(userId).then(data=>{
          state.myGroup = data.result
        }).catch(e => {
          console.log(e)
        })
      }
    },
    setCurrentShowGroup(state, payload) {
      this.currentShowGroup = payload.currentShowGroup
    }
  }
}
