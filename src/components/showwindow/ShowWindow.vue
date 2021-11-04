<template>
<div class="show-window" v-if="isClose">
  <el-row class="show-window-title">
    <el-col :span="20">
      <div class="show-window-title-slot hidden-sm-and-down">
        <slot name="title"></slot>
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
           :style="{'backgroundColor': color[lightType].bgcColor}">

        <div style="position: relative; border-radius: 20px;padding: 10px 0"
             :style="{'backgroundColor': color[lightType].slotAreaBgc}">
          <slot name="main">

          </slot>
        </div>
      </div>
    </el-col>
  </el-row>


</div>
</template>

<script>
export default {
  name: "ShowWindow",
  methods: {
    close(){
      this.isClose = false
    },
    reload(){
      this.$forceUpdate()
    }
  },
  props: {
    lightType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isClose: true,
      color: [{bgcColor: '#50bdff', slotAreaBgc: '#84ceff'},
              {bgcColor: '#202020', slotAreaBgc: '#333333'}]
    }
  }
}
</script>

<style scoped>
.show-window{
  width: calc(100% - 4px);
  border: 2px solid rgba(100,100,100,0.5);
  background-color: #ffffff;
}
.show-window-title{
  background-color: rgba(100,100,100,0.5);
  line-height: 35px;
  height: 35px;
  position: relative;
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

.show-window-title-slot{

  padding-left: 15px;
}

.show-window-main{
  padding: 50px 20px;
  position: relative;
}

</style>