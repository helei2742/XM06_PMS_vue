<template>
<!--  侧边栏下方的公告-->
<div class="announcement" >
  <div class="announcement-title">最近的公告</div>
  <i class="el-icon-close" @click="closeThis"></i>
  <i class="el-icon-more-outline" @click="toShowAnnouncePath"></i>

  <div v-loading="loading"
       id="review_box"
       @mouseover="rollStop()"
       @mouseout="rollStart(60)">

    <ul id="comment1">
      <li v-for="(announce,index) in announceList">
        <el-link type="info" @click="toAnnounceDetail(announce)">
          <div style="overflow: hidden;text-overflow:ellipsis;white-space:nowrap;width:150px">
            {{ (index+1)+'-'+announce.title}}
          </div>
        </el-link>
      </li>
    </ul>
    <ul id="comment2"></ul>
  </div>
</div>
</template>

<script>
import {pageQueryAnnounceNetwork} from "@/network/announce";

export default {
  name: "Announcement",
  data (){
    return {
      timer: null,
      announceList:[],
      loading: true,
    }
  },
  mounted() {

    this.loading = true
    pageQueryAnnounceNetwork(1,1,1,10).then(data=>{
      if(data.code === 200){
        let pageInfo = data.result
        setTimeout(()=>{
          this.roll(60)
        },2000)

        this.announceList = pageInfo.list
      }else {
      }
    }).finally(()=>{
      this.loading = false
    })
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    closeThis() {
      this.rollStop()
      this.$emit('closeThis')
    },
    toShowAnnouncePath(){
      this.$router.push('/index/showannounce')
    },
    toAnnounceDetail(announce){
      this.$router.push({
        path: '/index/announcedetail',
        query:{
          announce,
          announceId: announce.id
        }
      })
    },
    roll(t) {
      if(this.announceList.length<5) return
      let ul1 = document.getElementById("comment1");
      let ul2 = document.getElementById("comment2");
      let ulbox = document.getElementById("review_box");
      ul2.innerHTML = ul1.innerHTML;
      ulbox.scrollTop = 0;
      this.rollStart(t);
    },
    rollStart(t) {
      if(this.announceList.length<5) return
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
  },
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

.announcement> .el-icon-more-outline{
  font-size: 18px;
  position: absolute;
  left: 8px;
  top: 5px
}
.announcement> .el-icon-more-outline:hover{
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