<template>
<div class="function-card-item" :style="cardItemStyle">
  <h3>{{title}}</h3>
  <div>
    {{description}}
  </div>
</div>
</template>

<script>
export default {
  name: "FunctionCardItem",
  props: {
    title: {
      type: String,
      default: '功能标题'
    },
    description: {
      type: String,
      default: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息'
    },
    bgc: {
      type: String,
      default: '#7e8dc8'
    },
    fontColor: {
      type: String,
      default: '#ffffff'
    }
  },
  computed: {
    cardItemStyle(){
      return {'backgroundColor': this.bgc,'color':this.fontColor}
    }
  }
}
</script>

<style scoped>
.function-card-item{
  margin: 10px;
  position: relative;
  height: 384px;
  padding: 10px 15px;
  min-width: 230px;
}
.function-card-item > h3{
  font-size: 32px;
  font-weight: 500;
}
.function-card-item >div{
  padding: 0 20px;
  white-space: normal;
  font-size: 17px;
  line-height: 1.7;
  max-width: 42em;
  height: 180px;
}
</style>