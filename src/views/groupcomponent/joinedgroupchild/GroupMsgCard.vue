<template>
<div class="group-message-card">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="groupHead" class="image">
      <div style="padding: 14px;background-color:#cdbdbe">
        <span>{{group.groupName}}</span>
        <div class="bottom clearfix">
          <el-button @click="showMemberIfo" type="text" class="button">查看小组详情</el-button>
        </div>
      </div>
    </el-card>
</div>
</template>

<script>


export default {
  name: "GroupMsgCard",
  props: {
    group:{
      Type: Object,
      default() {
        return null
      }
    },
    index: {
      Type: Number,
      default: 2
    },

  },
  computed:{
    formatDate(){
      return function (num){
        return this.$formatDate(num)
      }
    }
  },
  data(){
    return {
      dialogTableVisible: false,
      groupHead: require('@/assets/img/group_img_default.png')
    }
  },
  methods: {
    showMemberIfo() {
      console.log(this.group)
      this.$router.push({
        path: '/index/groupdetail',
        query: {
          groupName: this.group.groupName,
          group: this.group
        }
      })
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  height: 400px;
  display: block;
  margin: 0 auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.group-message-card{
  position: relative;
}

.group-message-card .described{
  width: 400px;
  text-indent: 2em;
  line-height: 20px;
  overflow: hidden;
  float: left;
  position: relative;
  word-break: break-all;
}
</style>