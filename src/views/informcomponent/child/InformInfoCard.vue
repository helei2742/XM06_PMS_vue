<template>

<div :ref="refsName" class="inform-info-card">

<!-- 没有消息的显示-->
  <el-empty v-if="informInfoList==null||informInfoList.length<1"
            :image="emptyImgUrl"
            :description="refsName+'小组还没有未读消息'">
  </el-empty>

  <div style="text-align: center">
    <el-link v-if="haveHistory" @click="queryHistoryInform">查找历史消息</el-link>
    <span v-else>没有更多的消息了</span>
  </div>


  <div v-for="informInfo in informInfoList" class="inform-info-card-row">

<!-- 消息上方显示姓名和日期 -->
    <div v-if="leftOrRight(informInfo.sendUser.username)">
      <el-link   target="_blank">
        {{informInfo.sendUser.username}}
      </el-link>
      <el-tag type="info" size="mini" style="margin: 0 15px">
        {{formatDate(informInfo.sendDate)}}
      </el-tag>
    </div>
    <div v-else class="date-right">
      <!-- 显示日期-->
      <el-tag type="info" size="mini" style="margin: 0 15px">
        {{formatDate(informInfo.sendDate)}}
      </el-tag>
      <el-link   target="_blank" style="margin-right: 10px">
        {{informInfo.sendUser.username}}
      </el-link>
    </div>

<!--清除浮动。。-->
    <div style="clear: both"></div>

<!-- 显示头像和消息内容-->
<!--别人发的显示在左边 -->
    <div v-if="leftOrRight(informInfo.sendUser.username)" >
      <img  class="inform-message-head" :src="headImgUrl" />
      <div class="inform-message-content">
        <i></i>
        {{informInfo.message}}
        <span v-if="informInfo.notRead" class="red-point"></span>
      </div>
    </div>
<!--自己发的显示在右-->
    <div v-else>
      <img  class="inform-message-head right" :src="headImgUrl" />
      <div class="inform-message-content right">
        {{informInfo.message}}
        <i></i>
      </div>
      <div style="clear: both"></div>
    </div>

  </div>

<!--  占位-->
  <div class="inform-info-card-row" style="height: 50px;visibility: hidden"></div>
</div>

</template>

<script>
import Scroll from "@/components/scroll/Scroll";
export default {
  name: "InformInfoCard",
  components: {Scroll},
  props:{
    groupId: {
      type: Number,
      default: 0
    },
    informInfoList: {
      type: Array,
      default(){
        return null
      }
    },
    refsName: '',
    cardStyle: {
      type: Object,
      default() {
        return {backgroundColor: '#b6baba',color: '#202020'}
      }
    }
  },
  data() {
    return {
      isShow: true,
      headImgUrl: require("@/assets/img/head_default.png"),
      emptyImgUrl: require("@/assets/img/empty.gif"),
      currentPage: 1,
      limit: 20,
      haveHistory: true,
      informIn3day: true  // 是否查询3天内的消息，（存放内存)
    }
  },
  computed:{
    leftOrRight(){
      return function (userName){
        let name = this.$store.getters.getLoginUser.userName
        return userName !== name;
      }
    },
    formatDate(){
      return (num)=>{
        return this.$formatDate(num)
      }
    }
  },
  // updated() {
  //   this.scrollBottom()
  //     // //更新消息时，滚动条滑倒最下面
  //     // setTimeout(()=>{
  //     //   this.$refs[this.refsName].scrollTop = this.$refs[this.refsName].scrollHeight;
  //     // },0);
  // },
  methods: {
    queryHistoryInform() {
      this.$emit("queryHistory",{
        userId: this.$store.getters.getLoginUser.id,
        groupId: this.groupId,
        page: this.currentPage++,
        limit: this.limit,
        isInformIn3day: this.informIn3day
      })
      this.informIn3day = false
    },
    scrollToBottom() {
      //滚动条滑倒最下面
      setTimeout(()=>{
        this.$refs[this.refsName].scrollTop = this.$refs[this.refsName].scrollHeight;
      },0);
    },
    noMoreHistory(){
      this.haveHistory = false
    }
  }
}
</script>

<style scoped>

.date-right{

  float: right;
  right: 0;
}

.inform-info-card{
  height: 100%;
  background-color: rgba(1,1,1,0.1);
  overflow-y:scroll;
  padding: 10px;
}

.inform-info-card-row{
  position: relative;
  padding: 10px 0;
 }

.inform-message-head{
  width:40px;
  border: 1px solid rgba(1,1,1,0.2);
  border-radius:50%;
  vertical-align:top;
}

.right{
  float: right;
}

.inform-message-content{
  position: relative;
  margin: 0 13px;
  display: inline-block;
  padding: 10px 12px;
  width: 250px;
  border-radius: 4px;
  background-color: #3d7ff3;
  white-space: pre-wrap;
  text-align: justify;
  text-justify: newspaper;
  word-break: break-all;
}


div[class='inform-message-content']>i:before{

  content: '';
  width: 0;
  height:0;
  border-width: 10px;
  border-style: solid;
  border-color:  transparent #3d7ff3 transparent  transparent;
  position: absolute;
  top: 10px;
  left: -18px;
}

div[class='inform-message-content right']>i:after{
  content: '';
  width: 0;
  height:0;
  border-width: 10px;
  border-style: solid;
  border-color:  transparent transparent  transparent #3d7ff3;
  position: absolute;
  top: 10px;
  right: -18px;
}



.red-point{
  position: absolute;
  top: 14px;
  right: -8px;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
}

</style>