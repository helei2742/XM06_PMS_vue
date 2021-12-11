import {LOADJOINEDGROUP} from "@/store/mutations-types-groupmodule";

export default {
  state: {
    currentShowProject: null
  },
  getters:{
    getCurrentProject(state) {
      return state.currentShowProject
    }
  },
  actions: {
    reloadCurrentProject(context){
      if(context.rootState.projectStore.currentShowProject == null) {
      }
    }
  },
  mutations: {

  }
}