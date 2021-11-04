<template>
<div class="group-message-card">
      <el-card :body-style="{ padding: '0px' }">
        <img src="../../../assets/logo.png" class="image">
        <div style="padding: 14px;">
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
    }
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
      dialogTableVisible: false
    }
  },
  methods: {
    showMemberIfo() {
      console.log(this.group)
      this.group.createDate = this.$formatDate(this.group.createDate)
      this.$router.push({
        path: '/index/groupdetail',
        query: {
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
  width: 100%;
  display: block;
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