<template>
  <div class="function-title">
    <h4>{{title}}</h4>
    <span>{{titleEng}}</span>
    <div>{{titleDesc}}</div>
  </div>
</template>

<script>
export default {
  name: "IntroduceTitle",
  props:{
    title:{
      type:String,
      default: ''
    },
    titleEng: {
      type:String,
      default: ''
    },
    titleDesc: {
      type:String,
      default: ''
    }
  }
}
</script>

<style scoped>
.function-title {
  margin: 80px;
  height: 80px;
  text-align: center;

}
.function-title h4{
  font-size: 32px;
  letter-spacing: 6px;
  font-weight: 300;
  margin-bottom: 10px;

}
.function-title span {
  font-size: 14px;
  color: rgb(196, 196, 196);
  font-weight: 300;
  margin: 14px 0;
}
.function-title div {
  position: relative;
  text-align: center;
  margin: 10px auto;
  color: rgb(225, 125, 99);
  font-size: 14px;
  height: 20px;
  width: 118px;
  line-height: 20px;
}
.function-title div:before {
  content: "";
  height: 1px;
  width: 20px;
  position: absolute;
  top: 9px;
  left: -28px;
  background: rgb(225, 125, 99);
}
.function-title div:after {
  content: "";
  height: 1px;
  width: 20px;
  position: absolute;
  top: 9px;
  right: -28px;
  background: rgb(225, 125, 99);
}
</style>