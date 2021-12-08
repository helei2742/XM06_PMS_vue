<template>
<div>
  <ShowWindow key="informView">
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>查看通知</span>
    </div>
    <div slot="main">

      <div class="inform-view-main-area">

        <el-tabs :tab-position="tabPosition"
                 :stretch="true"
                 @tab-click="groupViewChangeHandler"
                 style="height: 500px"
                 type="border-card">

          <el-tab-pane v-for="group in groupList"
                       :lazy="true"
                       :groupId="group.id">
<!--  给小组的名称标签    -->
            <span slot="label">
              <i :style="cardStyle"
                 v-if="notReadCount(group.id)>0" class="red-point">
              </i>
              {{group.groupName}}
            </span>

<!--  通知内容部分  -->
            <el-col :span="24"
                    v-loading="loading"
                    element-loading-text="加载数据中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    style="height: 500px;">
              <inform-info-card
                                :ref="group.id"
                                @queryHistory="queryGroupHistory"
                                :group-id="group.id"
                                :card-style="cardStyle"
                                :refs-name="group.groupName"
                                :inform-info-list="informInfoList"/>

            </el-col>
          </el-tab-pane>

        </el-tabs>

<!--输入框-->
        <el-row>
          <el-col :span="22">
            <el-input v-model="message"
              type="textarea"
              autosize/>
          </el-col>
          <el-col :span="2">
            <el-button @click="send" type="primary" style="width: 100%;">发送</el-button>
          </el-col>
        </el-row>

      </div>

    </div>
  </ShowWindow>
</div>
</template>

<script>
import ShowWindow from '@/components/showwindow/ShowWindow'
import InformInfoCard from '@/views/informcomponent/child/InformInfoCard'

import {queryJoinedGroupAllNetwork} from "@/network/group";
import {clearNotReadNetWork, queryHistoryGroupInformNetwork, queryInformIn3dayNetwork} from "@/network/inform";
import {debounce} from "@/util/baseUtil";

export default {
  name: "InformView",
  components:{
    ShowWindow,
    InformInfoCard
  },
  data() {
    return {
      loading: false,

      groupList: null,   //小组列表
      groupIdMapList: {}, // 小组id映射到小组的消息列表
      groupIdMapSocket: {}, //小组id映射到对于的websocke实例
      informInfoList: [],  //当前的消息列表

      message: null,       // 发送的消息
      userId: null,
      groupId: null,           // 当前小组id
      websocket: null,       // 当前小组对于的websocket
      // baseUrl: 'ws://127.0.0.1:9000/XM06/api/websocket'
      baseUrl: 'ws://www.ylxteach.net/XM06/api/websocket'
    }
  },
  computed:{
    debounceMessageNotify(){
      return debounce(this.messageNotify, 15000)
    },
    /**
     * 屏幕宽度动态改变tab的位置
     */
    tabPosition() {
      let screenWidth = this.$store.getters.getScreenSize.width
      if(screenWidth < 735){
        return 'top'
      }else {
        return 'left'
      }
    },
    groupName(){
      return (groupId)=>{
        for (let group of this.groupList) {
          if(group.id === groupId) return group.groupName
        }
        return ''
      }
    },
    notReadCount(){
      //计算当前未读消息数
      return (groupId) => {
        let res = 0
        for (let i of this.groupIdMapList[groupId]) {
          if(i.notRead) res++
        }
        return res
      }
    },
    cardStyle() {
      return this.$store.getters.getCardColorStyle
    }
  },
  methods: {
    /**
     * 点击窗口左侧导航条的回调
     */
    groupViewChangeHandler(tabPaneComponent){
      let groupId = tabPaneComponent.$attrs.groupId

      this.groupId = groupId
      this.informInfoList = this.groupIdMapList[groupId]
      this.websocket = this.groupIdMapSocket[groupId]

      if(this.websocket == null){
        console.log('websocket为空')
        this.initWebSocket(groupId, this.groupIdMapSocket, this.groupIdMapList)
      }

      //循环获取未读列表
      let notReadList = []
      for (let informInfo of this.informInfoList) {
        if(informInfo.notRead){
          notReadList.push(informInfo.id)
        }
      }
      if(notReadList.length > 0){
        //发送消息到服务器，让列表中的消息为已读
        clearNotReadNetWork(this.userId,this.groupId,notReadList).then(data=>{
          console.log(data)
          if(data.code === 200){
            for (let informInfo of this.informInfoList) {
              informInfo.notRead = false
            }
          }else {
            this.$message.error('出错了，请返回主页刷新重试')
          }
        })
      }

    },

    //关闭WebSocket连接
    closeWebSocket() {
      this.websocket.close();
      this.$message.success('websocket.close: 关闭websocket连接')
    },

    //发送消息
    send() {
      try {
        let informInfo = {message: this.message, groupId: this.groupId, }
        this.websocket.send(JSON.stringify(informInfo));
        this.message = null
      } catch (err) {
        this.$message.error('发送消息失败')
      }
    },

    /**
     * 初始化相应组的websocket，
     * 并填充 groupIdMapSocket, groupIdMapList两个容器
     */
    initWebSocket(groupId, groupIdMapSocket, groupIdMapList){
      let websocket = null
      if ('WebSocket' in window) {
        websocket = new WebSocket(this.baseUrl +"/" + this.userId+"/"+groupId)

        //连接发生错误的回调方法
        websocket.onerror = function () {
          console.log("websocket.onerror: WebSocket连接发生错误");
        }
        //连接成功建立的回调方法
        websocket.onopen = function () {
          console.log("websocket.onopen: WebSocket连接成功");
        }
        //接收到消息的回调方法
        websocket.onmessage = (event)=> {
          let informInfo = JSON.parse(event.data)
          console.log(informInfo)

          //存储消息，并重新排序
          groupIdMapList[groupId].push(informInfo)
          groupIdMapList[groupId].sort((i1,i2)=>{
            return i1.sendDate - i2.sendDate
          })
          let sendUserId = parseInt(informInfo.sendUser.userIdStr)

          if(this.userId !== sendUserId && informInfo.notRead){
            this.debounceMessageNotify()
          }

          this.$refs[groupId][0].scrollToBottom()
        }
        //连接关闭的回调方法
        websocket.onclose = function () {
          console.log("websocket.onclose: WebSocket连接关闭");
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        onbeforeunload = function () {
          this.closeWebSocket();
        }

        //存储该websocket
        groupIdMapSocket[groupId] = websocket
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },

    messageNotify(){
      this.$notify({
        title: '消息提示',
        message: '收到了一条小组的消息',
        duration: 0
      })
    },
    /**
     * 调用网络请求，获取小组的消息记录
     *  query中包含属性 groupId, limit, page
     */
    queryGroupHistory(query){
      if(query.isInformIn3day){
        console.log('3tian内的')
        this.loading = true
        queryInformIn3dayNetwork(query).then(data=>{
          if(data.code === 200){
            this.groupIdMapList[query.groupId].push(...data.result)
            this.groupIdMapList[query.groupId].sort((i1,i2)=>{
              return i1.sendDate - i2.sendDate
            })
          }
        }).finally(()=>{
          this.loading = false
        })
      }
      else {
        this.loading = true
        queryHistoryGroupInformNetwork(query).then(data=>{
          if(data.code === 200){
            let pageInfo = data.result
            this.groupIdMapList[query.groupId].push(...pageInfo.list)
            this.groupIdMapList[query.groupId].sort((i1,i2)=>{
              return i1.sendDate - i2.sendDate
            })

            if(!pageInfo.hasNextPage){
              console.log( this.$refs[query.groupId] )
              this.$refs[query.groupId][0].noMoreHistory()
            }
          }else {
            this.$message.error('查询消息记录失败'+data.msg)
          }
        }).finally(()=>{
          this.loading = false
        })
      }
    }
  },
  mounted() {
    //获取加入的小组
    this.userId = this.$store.getters.getLoginUser.id

    queryJoinedGroupAllNetwork(this.userId).then(data=>{
      console.log(data)
      if(data.code === 200){
        this.groupList = data.result

        if(this.groupList != null && this.groupList.length > 0){

          //初始化socket和消息内容
          for (let group of this.groupList) {
            let key = group.id
            this.groupIdMapList[key] = []
            this.groupIdMapSocket[key] = null
            this.initWebSocket(key, this.groupIdMapSocket, this.groupIdMapList)
          }

          this.groupId = this.groupList[0].id
          this.websocket = this.groupIdMapSocket[this.groupId]
          this.informInfoList = this.groupIdMapList[this.groupId]
        }

      }else{
        this.$message.error('出错了，', data.msg)
      }
    })
  }

}
</script>

<style scoped>
.red-point{
  position: absolute;
  top: 14px;
  left: 10px;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
}

</style>