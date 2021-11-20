<template>
<div class="show-window" v-if="isClose">
  <el-row class="show-window-title">
    <el-col :span="16">
      <div class="hidden-sm-and-down">
        <slot name="title"></slot>
      </div>
    </el-col>

    <el-col :offset="2" :span="4">
      <div class="light-tool">
        <!--选择显示模式，（白天或晚上）-->
        <el-switch
            :value="lightType"
            active-color="#3c3f41"
            inactive-color="#ffd04c"
            :active-value="1"
            :inactive-value="0"
            @change.self="colorModuleChange"
            active-icon-class="el-icon-moon"
            inactive-icon-class="el-icon-sunny">
        </el-switch>

      </div>
    </el-col>

    <el-col class="show-window-button" :span="4">
      <div @click="reload" class="el-icon-refresh"></div>
      <div @click="close" class="el-icon-close"></div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">
      <div class="show-window-main"
           :style="bgcColor">

        <div style="position: relative; border-radius: 20px;padding: 10px 0"
             :style="slotAreaColor">
          <slot name="main">

          </slot>
        </div>
      </div>
    </el-col>
  </el-row>


</div>
</template>

<script>
import {CHANGECOLORMODULE} from "@/store/mutations-types";

export default {
  name: "ShowWindow",
  computed: {
    bgcColor(){
      return {'backgroundColor': this.color[this.lightType].bgcColor}
    },
    slotAreaColor(){
      return {'backgroundColor': this.color[this.lightType].slotAreaBgc}
    }
  },
  methods: {
    close(){
      this.isClose = false
    },
    reload(){
      this.$forceUpdate()
    },
    colorModuleChange(module) {
      this.lightType = module
      this.$store.commit(CHANGECOLORMODULE, {colorModule: module})
    }
  },
  data() {
    return {
      lightType: 0,
      isClose: true,
      color: this.$store.getters.getColor
    }
  },
  activated() {
    this.lightType = this.$store.getters.getColorModule
  }
}
</script>

<style scoped>
.show-window{
  width: calc(100% - 14px);
  border: 2px solid rgba(100,100,100,0.5);
  background-color: transparent;
  margin-top: 5px;
  margin-left: 8px;
  border-radius: 12px;
}
.show-window-title{
  /*background-color: rgba(100,100,100,0.5);*/
  background-color: transparent;
  line-height: 35px;
  height: 35px;
  position: relative;
  padding-left: 10px;
  border-bottom: 1px rgba(100,100,100,0.5) solid;
}
.show-window-button{
  overflow: visible;
}
.show-window-button>div[class='el-icon-close']{
  position: absolute;
  font-size: 20px;
  line-height: 35px;
  right: 15px;
}
.show-window-button>div[class='el-icon-close']:hover{
  cursor: pointer;
}
.show-window-button>div[class='el-icon-refresh']{
  position: absolute;
  font-size: 20px;
  line-height: 35px;
  right: 50px;
}
.show-window-button>div[class='el-icon-refresh']:hover{
  cursor: pointer;
}


.show-window-main{
  padding: 50px 20px;
  position: relative;
}
.light-tool{
  margin-right: 5px;
  margin-left: 4px;
}
</style>