<template>
  <div class="project-update-record">
    <el-table
        :fit="false"
        :highlight-current-row="true"
        :data="recordList"
        style="width: 700px;">

      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="record-expand">
            <table>
              <tr>
                <td style="color:#99b9af;">提交描述:</td>
                <td>
                  <span class="record-submit-desc">
                    {{props.row.submitDesc}}
                  </span>
                </td>
              </tr>
            </table>

            <div>
              <span v-if="props.row.uploadFileSrc == null" style="color: red">
                无提交文件
              </span>
              <el-button v-else
                         @click="downloadSubmitFile(props.row.uploadFileSrc)"
                         size="mini">
                点击下载提交的附件
              </el-button>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
          type="index"
          width="50px">
      </el-table-column>
      <el-table-column
          width="250"
          label="用户名">
        <template slot-scope="scope">
          {{scope.row.user.userName}}
        </template>
      </el-table-column>
      <el-table-column
          prop="submitDegree"
          width="120"
          sortable
          label="提交进度">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="提交日期"
          sortable
          width="270">
        <template slot-scope="scope">
          {{formatDate(scope.row.createDate)}}
        </template>
      </el-table-column>
    </el-table>

    <div class="load-btn">
      <el-button v-if="isShowLoadMore"
                 @click="loadMoreRecord"
                 style="width: 100%">查看更多</el-button>
      <div v-else>没有更多了</div>
    </div>
  </div>
</template>

<script>
import ProjectUpdateRecordItem from "@/views/projectcomponent/child/projectupdaterecord/ProjectUpdateRecordItem";
export default {
  name: "ProjectUpdateRecord",
  components: {
    ProjectUpdateRecordItem
  },
  props: {
    recordList: {
      type: Array,
      default() {
        return []
      }
    },
    isShowLoadMore: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formatDate(){
      return time => {
        return this.$formatDate(time)
      }
    }
  },
  methods:{
    downloadSubmitFile(src) {
      this.$emit('downloadSubmit', src)
    },
    loadMoreRecord(){
      this.$emit('loadMoreRecord')
    }
  }
}
</script>

<style>
.project-update-record{
  background-color: #ffffff;
  padding: 10px;
  margin: 0 auto;
  width: 700px;
  text-align: center;
  border-radius: 8px;
}

.record-expand{
  padding: 20px 10px;
  margin-left: 50px;
}
.record-expand> div,table{
  margin: 10px 0;
}

.record-submit-desc{
  width: 330px;
  white-space: pre-wrap;
  display: inline-block;
  margin-left: 10px;
}

.load-btn{
  width: 700px;
}
</style>