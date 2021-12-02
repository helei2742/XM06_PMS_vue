<template>
  <div class="submit-record-table" v-if="this.$store.getters.getLoginUser!=null">
  <el-table
      v-if="recordList!==[]"
      :data="recordList"
      empty-text="暂无提交记录"
      @selection-change="handleSelectionChange"
      :row-style="this.$store.getters.getCardColorStyle"
      :header-cell-style=" this.$store.getters.getCardColorStyle"

      style="width: 100%;min-width:830px">
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
        prop="user.userName"
        label="提交者用户名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="user.trueName"
        label="提交者姓名"
        width="100">
    </el-table-column>
    <el-table-column
        label="提交日期"
    >
      <template slot-scope="scope">
        <el-tag>
          {{submitDate(scope.row.submitDate)}}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column
        width="140">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="info"
            icon="el-icon-info"
            @click="taskDetail(scope.row)">
          查看任务详情
        </el-button>
      </template>
    </el-table-column>

    <el-table-column
        width="140">
      <template slot="header" slot-scope="scope">
        <el-popconfirm
            v-if="selected.length>0"
            title="确定删除选中记录吗？"
            @confirm="handleDeleteAll"
        >
          <el-button type="warning"
                     size="mini"
                     slot="reference">
            删除选中{{selected.length}}条
          </el-button>
        </el-popconfirm>
      </template>

      <template slot-scope="scope">
        <el-dropdown size="mini" split-button type="primary">
          更多操作
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button
                  size="mini"
                  icon="el-icon-zoom-in"
                  @click="lookDesc(scope.$index, scope.row)">
                查看提交内容
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-download"
                  @click="downloadFile(scope.$index, scope.row)">
                下载提交文件
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item v-if="isMyRecord(scope.row.userId)">
              <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteRecord(scope.$index, scope.row)">
                删除提交记录
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>

  </el-table>

  <el-dialog title="提交内容" :visible.sync="dialogVisible">
    <el-input v-if="currentRecord!=null" type="textarea"
              :value="currentRecord.description"
              placeholder="无提交内容"
              resize="none" autosize :readonly="true">
    </el-input>
  </el-dialog>

  </div>

</template>

<script>
import {downloadFileNetwork} from "@/network/file";
import {convertRes2Blob} from "@/util/fileUtil";
import {deleteSelectedTaskRecordNetwork, deleteTaskSubmitRecordNetwork} from "@/network/task";

export default {
  name: "SubmitRecordTable",
  props: {
    recordList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      currentRecord: null,
      selected: [],
    }
  },
  computed:{
    submitDate(){
      return num =>{
        if(num == null) return '无记录'
        return this.$formatDate(num)
      }
    },
    isMyRecord(){
      return (userId) =>{
        return userId === this.$store.getters.getLoginUser.id
      }
    }
  },
  methods: {
    handleSelectable(row){
      return row.userId === this.$store.getters.getLoginUser.id
    },
    handleDeleteAll(){
      let recordIds = []
      for (let select of this.selected) {
        recordIds.push(select.id)
      }
      let userId = this.$store.getters.getLoginUser.id
      console.log(recordIds)
      deleteSelectedTaskRecordNetwork(recordIds,userId).then(data=>{
        if(data.code === 200){
          this.$message.success('删除记录成功')
        }else {
          this.$alert('删除失败')
        }
      })
    },
    handleSelectionChange(selection){
      this.selected = selection
    },
    taskDetail(taskRecord){
      this.$router.push({
        path: '/index/taskdetail',
        query:{
          task: {},
          taskId: taskRecord.taskId
        }
      })
    },
    /**
     * 查看详情提交记录详情的回调
     * @param index
     * @param record
     */
    lookDesc(index, record){
      this.currentRecord = record
      this.dialogVisible = true
    },

    /**
     *  点击下载提交文件的回调
     * @param index
     * @param record
     */
    downloadFile(index, record){
      let filePath = record.fileUrl
      if(filePath === null || filePath === ''){
        this.$message.error('该记录没有上传文件')
        return
      }
      downloadFileNetwork(filePath).then( response =>{
        console.log(response)
        convertRes2Blob(response)
      }).catch(e => {
        this.$alert('出错了，该上传文件已不存在')
      })
    },

    deleteRecord(index, record){
      let userId = this.$store.getters.getLoginUser.id;
      console.log(record)

      deleteTaskSubmitRecordNetwork(record.id, userId).then(data=>{
        if(data.code === 200){
          this.$message.success('删除提交记录成功')
        }else{
          this.$message.error('删除提交记录失败,'+data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.submit-record-table{
  margin: 40px;
  overflow-x: scroll;
}
</style>