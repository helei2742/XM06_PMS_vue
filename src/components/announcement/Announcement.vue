<template>
<!--  侧边栏下方的公告-->
<div class="announcement">
  <div class="announcement-title">系统公告</div>
  <i class="el-icon-close" @click="closeThis"></i>

  <div id="review_box" @mouseover="rollStop()" @mouseout="rollStart(60)">
    <ul id="comment1">
      <li>别点人脸相关的</li>
      <li>别点人脸相关的</li>
      <li>别点人脸相关的</li>
      <li>别点人脸相关的</li>
      <li>别点人脸相关的</li>
      <li>别点人脸相关的</li>
    </ul>
    <ul id="comment2"></ul>
  </div>
</div>
</template>

<script>
export default {
  name: "Announcement",
  data (){
    return {
      timer: null,
    }
  },
  mounted() {
    this.roll(60);
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    closeThis() {
      this.rollStop()
      this.$emit('closeThis')
    },
    roll(t) {
      let ul1 = document.getElementById("comment1");
      let ul2 = document.getElementById("comment2");
      let ulbox = document.getElementById("review_box");
      ul2.innerHTML = ul1.innerHTML;
      ulbox.scrollTop = 0;
      this.rollStart(t);
    },
    rollStart(t) {
      let ul1 = document.getElementById("comment1");
      let ul2 = document.getElementById("comment2");
      let ulbox = document.getElementById("review_box");
      this.rollStop();
      this.timer = setInterval(() => {
        // 当滚动高度大于列表内容高度时恢复为0
        if (ulbox.scrollTop >= ul1.scrollHeight) {
          ulbox.scrollTop = 0;
        } else {
          ulbox.scrollTop++;
        }
      }, t);
    },
    rollStop() {
      clearInterval(this.timer);
    }
  }
}
</script>

<style scoped>
.announcement{
  position: relative;
}
.announcement > .el-icon-close {
  font-size: 18px;
  position: absolute;
  right: 8px;
  top: 5px
}
.announcement > .el-icon-close:hover{
  color: #3a8ee6;
  cursor: pointer;
}

.announcement-title{
  color: #F86B63;
  text-align: center;
}

#review_box{
  /*padding: 6px;*/
  height: 130px;
  overflow: hidden;
}
li {
  list-style: none;
}
</style>