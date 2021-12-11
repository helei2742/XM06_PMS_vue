<template>
<div class="memo-drawer">
  <el-drawer
      :size="drawerSize"
      title="便签"
      :visible.sync="isShowMemo"
      @open="openMemo"
      direction="ltr"
  >

<!-- 头部   -->
    <template slot="title">
      <div>便签</div>
      <el-button @click="dialogFormVisible = true" type="success" size="mini">
        <i class="el-icon-plus"></i>
        添加便签
      </el-button>
    </template>

    <hr/>

    <div :style="bgStyle">
      <el-timeline >
        <el-timeline-item size="20px"
                          :style="{width: '80%'}"
                          v-for="m in memo"
                          :color="iconColor(m.finish,m.staleDate)"
                          :icon="memoIcon(m.finish,m.staleDate)"
                          :timestamp="formatDate(m.staleDate)"
                          placement="top">
          <el-card>
            <h4>{{ m.memo }}</h4>
            <p :style="{color: iconColor(m.finish,m.staleDate)}">
              创建时间:
              {{formatDate(m.createDate)+'('+(m.staleDate-new Date().getTime()<0?'已过期':'进行中')+')'}}
            </p>

            <div>
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
          </el-card>

        </el-timeline-item>
      </el-timeline>
    </div>

  </el-drawer>

<!--添加标签弹出框-->
  <el-dialog title="添加便签" :visible.sync="dialogFormVisible">
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
import {MEMOBACKGROUND} from "@/util/imageUrl";

export default {
  name: "MemoDrawer",
  props:{
    isShowMemo: {
      type: Boolean,
      default: false
    },
    memo: {
      type: Array,
      default: []
    }
  },
  computed:{
    drawerSize(){
      let screenWidth = this.$store.getters.getScreenSize.width
      if(screenWidth < 1080){
        return '80%'
      }else {
        return '40%'
      }
    },
    memoIcon(){
      return function (isFinish, slateDate) {
        if(isFinish) return 'el-icon-check'
        if(slateDate < new Date().getTime()) return 'el-icon-close'
        if(slateDate - new Date().getTime() < 24*60*60*1000) return 'el-icon-s-promotion'
        return 'el-icon-s-promotion'
      }
    },
    iconColor() {
      return function (isFinish, slateDate) {
        if(isFinish) return '#5bdb5b'
        if(slateDate < new Date().getTime()) return '#fe315d'
        if(slateDate - new Date().getTime() < 24*60*60*1000) return '#af873d'
        return '#06304e'
      }
    },
  },
  data() {
    return {
      visible: false,
      dialogFormVisible: false,
      screenWidth: null,
      staleDate: null,
      memoMsg: '',
      bgStyle: MEMOBACKGROUND
    }
  },
  methods: {
    removeMemo(memoId){
      this.$emit('removememo', memoId)
    },
    addMemo(){
      this.dialogFormVisible = true
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
    },
    openMemo(){
      console.log(this.isShowMemo)
    }
  }
}
</script>

<style scoped>

</style>