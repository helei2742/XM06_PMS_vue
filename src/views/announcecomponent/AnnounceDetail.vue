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
      <div class="announce-detail-text" :style="$store.getters.getCardColorStyle">
        <h2>{{announce.title}}</h2>
        <el-input type="textarea"
                  :readonly="true"
                  resize="none"
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
      return this.$formatDate(time)
    },
    loadData(announce, announceId){
      return new Promise((resolve, reject)=>{
        if(announce.id === undefined){
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
          }).catch(e => {
            reject(e)
          }).finally(()=>{
            resolve()
          })

        }else {
          announce.mainBody = announce.mainBody.slice(9,announce.mainBody.length)
          this.announce = announce
          queryUserByIdNetwork(announce.userId).then(data=>{
            this.user = data.result
          }).catch(e => {
            reject(e)
          }).finally(()=>{
            resolve()
          })
        }
      })
    }
  },
  mounted() {
    let announce = this.$route.query.announce
    let announceId = this.$route.query.announceId
    this.loading = true
    this.loadData(announce,announceId).finally(()=>{
      this.loading = false
    })
  },
  beforeRouteUpdate (to, from, next) {

    let announce = to.query.announce
    let announceId = to.query.announceId
    this.loading = true
    this.loadData(announce,announceId).finally(()=>{
      this.loading = false
      next()
    })
  }
}
</script>

<style scoped>
.announce-detail-text{
  min-height: 65vh;
  padding: 15px 10px;
}
.announce-detail-text>h2{
  text-align: center;
}

</style>