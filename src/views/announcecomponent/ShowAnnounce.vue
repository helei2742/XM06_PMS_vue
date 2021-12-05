<template>
<div class="show-announce">
  <show-window v-loading="loading">
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>公告管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>公告查询</span>
    </div>

    <div slot="main">
      <div class="show-announce-select">
        <div>
          <el-button size="mini"
                     :type="this.queryType === allQueryType.allAnnounce?'success':'primary'"
                     :disabled="this.queryType === allQueryType.allAnnounce"
                     @click="handleQueryTypeChange(allQueryType.allAnnounce)"
                     round>
            所有公告
          </el-button>
        </div>
        <div>
          <el-button size="mini"
                     :type="this.queryType === allQueryType.myAnnounce?'success':'primary'"
                     :disabled="this.queryType === allQueryType.myAnnounce"
                     @click="handleQueryTypeChange(allQueryType.myAnnounce)"
                     round>
            我发布的公告
          </el-button>
        </div>
        <div>
          <el-select v-model="orderType" placeholder="请选择" size="mini">
            <el-option label="创建时间降序" :value="allSortType.createDateDesc"/>
            <el-option label="创建时间升序" :value="allSortType.createDateAsc"/>
          </el-select>
        </div>
        <div>
          <el-button size="mini"
                     round
                     @click="handleSort"
                     type="select">
            排序
          </el-button>
        </div>
      </div>


      <div>
        <show-announce-list :announce-list="announceList"
                            @editAnnounce="editAnnounce"
                            @announceDetail="announceDetail"/>

      </div>
      <div style="text-align: center">
        <el-pagination
            :small="isUseSmall"
            :pager-count="5"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="limit"
            layout="total,prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>

    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {pageQueryAnnounceNetwork} from "@/network/announce";
import ShowAnnounceList from "@/views/announcecomponent/showannouncechild/ShowAnnounceList";
export default {
  name: "ShowAnnounce",
  components: {ShowAnnounceList, ShowWindow},
  data(){
    return {
      loading: false,
      userId: this.$store.getters.getLoginUser.id,
      allSortType: {
        createDateDesc: 1,
        createDateAsc: 2
      },
      allQueryType:{
        allAnnounce: 1,
        myAnnounce:2
      },
      orderType: 1,
      queryType: 1,

      currentPage: 1,
      limit: 10,

      announceList: [],
      total: 0,
    }
  },
  computed:{
    isUseSmall(){
      return this.$store.getters.getScreenSize.width < 765;
    }
  },
  methods:{
    handleCurrentChange(val){
      this.pageQueryAnnounce(this.queryType,this.orderType,val)
    },
    handleQueryTypeChange(queryType){
      if(queryType === this.queryType)
        return

      //不同类型
      this.queryType = queryType
      this.reset()
      this.pageQueryAnnounce(this.queryType,this.orderType,this.currentPage)
    },
    handleSort(){
      this.reset()
      this.pageQueryAnnounce(this.queryType,this.orderType,this.currentPage)
    },
    reset(){
      this.currentPage = 1
    },
    pageQueryAnnounce(queryType,orderType, currentPage){
      this.loading = true

      pageQueryAnnounceNetwork(queryType,orderType,
          currentPage,this.limit,this.userId).then(data=>{
        if(data.code === 200){
          let pageInfo = data.result
          this.announceList = pageInfo.list
          this.total = pageInfo.total
        }else {
          this.$message.error('查询失败,'+data.msg)
        }
      }).finally(()=>{
        this.loading = false
      })
    },
    announceDetail(announce){
      this.$router.push({
        path:'/index/announcedetail',
        query:{
          announce: announce,
          announceId: announce.id
        }
      })
    },
    editAnnounce(announce){
      this.$router.push({
        path: '/index/editannounce',
        query:{
          announce: announce,
          announceId: announce.id
        }
      })
    }
  },
  mounted() {
    this.pageQueryAnnounce(this.queryType,this.orderType,this.currentPage)
  }
}
</script>

<style scoped>
.show-announce-select{
  display: flex;

  justify-content: left;
  flex-wrap: wrap;
}
.show-announce-select>div{
  margin-top: 10px;
  margin-left: 15px;
}
</style>