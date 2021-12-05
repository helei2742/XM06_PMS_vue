<template>
<div class="announcement-detail" v-if="announce!=null">
  <show-window v-loading="loading">
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>公告管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>公告详情</span>
    </div>

    <div slot="main" style="padding: 20px">
      <div class="announce-detail-text">
        <h2>{{announce.title}}</h2>
        <el-input type="textarea"
                  :show-word-limit="true"
                  :rows="20"
                  :minlength="1"
                  :maxlength="7000"
                  v-model="announce.mainBody">
        </el-input>
<!--        <div style="text-indent:2em;white-space: pre-wrap" v-html="announce.mainBody"></div>-->
      </div>

      <div v-if="user!=null" style="text-align: right">
        <el-link type="success"><span style="font-size: 20px">{{user.userName}}</span></el-link>
        <div>{{formatDate(announce.createDate)}}</div>
      </div>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {queryAnnounceByIdNetwork} from "@/network/announce";
import {queryUserByIdNetwork} from "@/network/user";
export default {
  name: "AnnounceDetail",
  components: {ShowWindow},
  data(){
    return {
      announce: null,
      loading: false,
      user: null
    }
  },
  methods:{
    formatDate(time){
      return this.$formatDateToDay(time)
    }
  },
  activated() {
    let announce = this.$route.query.announce
    let announceId = this.$route.query.announceId

    if(announce.id === undefined){
      this.loading = true
      queryAnnounceByIdNetwork(announceId).then(data=>{
        if(data.code === 200){

          data.result.mainBody = data.result.mainBody.slice(9,data.result.mainBody.length)
          this.announce = data.result

          return queryUserByIdNetwork(this.announce.userId)
        }else{
          this.$alert('加载公告失败')
        }
      }).then(data=>{
        this.user = data.result
      }).finally(()=>{
        this.loading = false
      })

    }else {
      this.announce = announce
      queryUserByIdNetwork(this.announce.userId).then(data=>{
        this.user = data.result
      })
    }
  }
}
</script>

<style scoped>
.announce-detail-text{
  min-height: 65vh;
}
.announce-detail-text>h2{
  text-align: center;
}

</style>