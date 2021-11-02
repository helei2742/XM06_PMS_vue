<template>
<div class="submit-record-table">
  <el-table
      v-if="recordList!==[]"
      :data="recordList"
      stripe
      style="width: 100%">
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
        label="提交日期"
    >
      <template slot-scope="scope">
        {{submitDate(scope.row.submitDate)}}
      </template>
    </el-table-column>

    <el-table-column
        width="140">
      <template slot-scope="scope">
        <el-button
            size="mini"
            icon="el-icon-zoom-in"
            @click="lookDesc(scope.$index, scope.row)">
          查看提交内容
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
        width="140">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="success"
            icon="el-icon-download"
            @click="downloadFile(scope.$index, scope.row)">
          下载提交文件
        </el-button>
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

export default {
  name: "SubmitRecordTable",
  props: {
    recordList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dialogVisible: false,
      currentRecord: null
    }
  },
  computed:{
    submitDate(){
      return num =>{
        if(num == null) return '无记录'
        return this.$formatDate(num)
      }
    }
  },
  methods: {
    /**
     * 查看详情提交记录详情的回调
     * @param index
     * @param record
     */
    lookDesc(index, record){
      console.log(record)
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
      })
    }
  }
}
</script>

<style scoped>

</style>