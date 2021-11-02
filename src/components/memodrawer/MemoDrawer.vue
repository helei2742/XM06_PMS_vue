<template>
<div>
  <el-drawer
      :size="'40%'"
      title="便签"
      :visible.sync="isShow"
      direction="ltr"
  >

<!-- 头部   -->
    <template slot="title">
      <div>便签</div>
      <el-button @click="visible = true" type="success" size="mini">
        <i class="el-icon-plus"></i>
        添加便签
      </el-button>
    </template>

    <hr/>

    <div>
      <el-steps space="190px" direction="vertical">
        <el-step :status="memoStatus(m.finish, m.staleDate)"
                 v-for="(m, index) in memo"
                 :title="'便签'+(index+1)+'('+(m.staleDate-new Date().getTime()<0?'已过期':'进行中')+')'" >
          <template slot="description">
            <div>
              <div>代办事项：{{m.memo}}</div>
              <div>过期日期：{{formatDate(m.staleDate)}}</div>
              <div>创建日期：{{formatDate(m.createDate)}}</div>
              <el-popconfirm
                  v-if="!m.finish"
                  confirm-button-text='是的'
                  cancel-button-text='算了'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定该便签已完成吗"
                  @confirm="confirmFinish(m.id)"
              >
                <el-button
                    slot="reference"
                    type="success" size="mini">
                  确认完成
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                  confirm-button-text='是的'
                  cancel-button-text='算了'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除该便签吗"
                  @confirm="removeMemo(m.id)"
              >
                <el-button type="warning" slot="reference" size="mini">
                  <i class="el-icon-close"></i>
                  删除便签
                </el-button>
              </el-popconfirm>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
  </el-drawer>

<!--添加标签弹出框-->
  <el-dialog title="添加便签" :visible.sync="visible">
    <el-form>
      <el-form-item label="便签内容" label-width="50">
        <el-input v-model="memoMsg" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="截至时间" label-width="50">
        <div class="block">
          <el-date-picker
              v-model="staleDate"
              type="datetime"
              format="yyyy年MM月dd日HH时mm分ss秒"
              value-format="yyyy年MM月dd日HH时mm分ss秒"
              placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addMemo">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: "MemoDrawer",
  props:{
    isShow: {
      type: Boolean,
      default: false
    },
    memo: {
      type: Array,
      default: []
    }
  },
  computed:{
    memoStatus(){
      return function (isFinish, slateDate) {
        if(isFinish) return 'success'
        if(slateDate < new Date().getTime()) return 'error'
        if(slateDate - new Date().getTime() < 24*60*60*1000) return 'process'
        return 'wait'
      }
    }
  },
  data() {
    return {
      visible: false,
      staleDate: null,
      memoMsg: ''
    }
  },
  methods: {
    removeMemo(memoId){
      this.$emit('removememo', memoId)
    },
    addMemo(){
      this.visible = false
      this.$emit('addmemo', {
        memo: this.memoMsg,
        staleDate: this.staleDate
      })
    },
    formatDate(num){
      return this.$formatDate(num)
    },
    confirmFinish(memoId){
      this.$emit('confirmfinish', memoId)
    }
  }
}
</script>

<style scoped>

</style>