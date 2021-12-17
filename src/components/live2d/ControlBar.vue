<template>
<div class="kananbusume-control-bar">
  <ul v-if="isShowKanBanMuSuMe">
    <li>
      <el-tooltip effect="dark" content="关闭" placement="bottom-end">
        <i @click="closeKanBanMuSuMe" class="el-icon-close"></i>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip effect="dark" content="拍照" placement="bottom-end">
        <i @click="$emit('camera')" class="el-icon-camera"></i>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip effect="dark" content="声明" placement="bottom-end">
        <i @click="$emit('announce')" class="el-icon-warning-outline"></i>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip effect="dark" content="更换皮肤" placement="bottom-end">
        <i @click="$emit('change')" class="el-icon-refresh-right"></i>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip effect="dark" content="播放列表" placement="bottom-end">
        <i @click="$emit('audio')" class="el-icon-headset"></i>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip effect="dark" content="播放控制" placement="bottom-end">
        <i @click="$emit('audioControl')" class="el-icon-video-play"></i>
      </el-tooltip>
    </li>
  </ul>
  <ul v-else>
    <li>
      <el-tooltip effect="dark" content="叫出看板娘" placement="bottom-end">
        <i @click="displayKanBanMuSuMe" class="el-icon-view"></i>
      </el-tooltip>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "ControlBar",
  data(){
    return {
      isShowKanBanMuSuMe: true
    }
  },
  methods:{
    closeKanBanMuSuMe(){
      this.isShowKanBanMuSuMe = false
      this.$emit('closeIt')
    },
    displayKanBanMuSuMe(){
      this.isShowKanBanMuSuMe = true
      this.$emit('showIt')
    }
  }
}
</script>

<style scoped>
.kananbusume-control-bar{
  position: relative;
}
.kananbusume-control-bar>ul{
  list-style: none;
  position: absolute;
  right:30px;
  top: 20px;
}
.kananbusume-control-bar > ul>li>i{
  font-size: 25px ;
  right: 5px;
}
.kananbusume-control-bar > ul>li>i:hover{
  cursor: pointer;
}
</style>