<template>
<div class="show-announce-list">
  <el-table empty-text="暂无公告"
            height="450"
            :data="announceList"
            @selection-change="handleSelectionChange"
            :row-style="this.$store.getters.getCardColorStyle"
            :header-cell-style=" this.$store.getters.getCardColorStyle">
    <el-table-column
        type="selection"
        :selectable="handleSelectable"
        width="55">
    </el-table-column>
    <el-table-column
        type="index"
        width="50">
    </el-table-column>
    <el-table-column
                     width="140"
                     sortable
                     label="发布时间">
      <template slot-scope="scope">
        <el-tag>
          {{submitDate(scope.row.createDate)}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="title"
                     label="公告标题">

    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="100">
      <template slot="header" slot-scope="scope">
        <el-popconfirm
            v-if="selected.length>0"
            title="确定删除选中记录吗？"
            @confirm="handleDeleteSelected"
        >
          <el-button type="warning"
                     size="mini"
                     slot="reference">
            删除选中{{selected.length}}条
          </el-button>
        </el-popconfirm>
      </template>

      <template slot-scope="scope">
        <el-button @click="announceDetail(scope.row)" type="text" size="small">查看</el-button>
        <el-button v-if="scope.row.userId===$store.getters.getLoginUser.id"
                   @click="editAnnounce(scope.row)"
                   type="text"
                   size="small">
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>


import {deleteSelectedAnnounceNetwork} from "@/network/announce";

export default {
  name: "ShowAnnounceList",
  props:{
    announceList:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      selected: []
    }
  },
  computed:{
    submitDate(){
      return num =>{
        if(num == null) return '无记录'
        return this.$formatDateToDay(num)
      }
    },
  },
  methods:{
    announceDetail(announce){
      this.$emit('announceDetail', announce)
    },
    editAnnounce(announce){
      this.$emit('editAnnounce', announce)
    },
    handleSelectable(row){
      return row.userId === this.$store.getters.getLoginUser.id
    },
    handleSelectionChange(selection){
      this.selected = selection
    },
    handleDeleteSelected(){
      let Ids = []
      for (let select of this.selected) {
        Ids.push(select.id)
      }
      let userId = this.$store.getters.getLoginUser.id
      console.log(Ids)
      const loading = this.$loading({
        lock: true,
        text: '正在删除选中公告',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      deleteSelectedAnnounceNetwork(Ids, userId).then(data=>{
        if (data.code === 200){
          this.$message.success('删除选择公告成功,请刷新界面获取最新数据')
        }else {
          this.$alert('删除失败，'+data.msg)
        }
      }).finally(()=>{
        loading.close()
      })
    },
  }
}
</script>

<style scoped>
.show-announce-list{
  margin-top: 20px;
  border: 1px solid rgba(100,150,150,0.7);

}
</style>