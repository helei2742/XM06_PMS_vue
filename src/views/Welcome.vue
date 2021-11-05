<template>
<div :style="bgStyle" class="welcome">
  <div class="title" >
    欢迎来到项目管理系统
  </div>
</div>
</template>

<script>
import {WELCOMEBACKGROUND} from "@/util/imageUrl";

export default {
  name: "Welcome",
  activated() {
    this.$message.success('欢迎进入项目管理系统')
  },
  data() {
    return {
      bgStyle: WELCOMEBACKGROUND
    }
  }
}
</script>

<style scoped>
.welcome {
  height: 100vh;
  position: relative;
}


.title{

  position: absolute;
  font-size: 120px;
  font-weight: 800;

  -webkit-text-stroke: 4px rgba(255,255,255,1);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;

  left: 50%;
  margin-left: -50vh;
}

</style>