<template>
<div class="introduce">
  <div>
    <el-carousel :interval="4000"  height="45vw">

      <el-carousel-item v-for="item in getSlideCount" :key="item">
        <img @click="toPage" :src="getSlideImg(item)" class="carousel-img" alt=""/>
      </el-carousel-item>
    </el-carousel>
  </div>



  <introduce-title :title="'我们的功能'"
                   :title-desc="'专为企业项目而生'"
                   :title-eng="'How can we do'"/>

  <function-card/>
  <br/>
  <br/>
  <br/>
  <hr/>

  <introduce-title :title="'开发成员'"
                   :title-desc="'专业的开发团队'"
                   :title-eng="'Who we are'"/>

  <member-card/>
  <br/>
  <br/>
  <hr/>

  <introduce-title :title="'系统使用情况'"
                   :title-desc="'科学的数据分析'"
                   :title-eng="'How many user'"/>


  <system7day-charts/>
  <br/>
  <br/>
  <system-total-charts/>
</div>
</template>

<script>
import System7dayCharts from "@/components/systemcharts/System7dayCharts";
import FunctionCard from "@/views/introducecomponent/functioncard/FunctionCard";
import IntroduceTitle from "@/views/introducecomponent/introducetitle/IntroduceTitle";
import MemberCard from "@/views/introducecomponent/membercard/MemberCard";
import SystemTotalCharts from "@/components/systemcharts/SystemTotalCharts";
import {INTRODUCEBSLIDESHOW} from "@/util/imageUrl";

export default {
  name: "Introduce",
  components: {SystemTotalCharts, MemberCard, IntroduceTitle, FunctionCard, System7dayCharts},
  computed: {
    isLogin() {
      return this.$store.getters.getLoginUser != null
    },
    getSlideImg(){
      return index => INTRODUCEBSLIDESHOW[index-1]
    },
    getSlideCount() {
      return INTRODUCEBSLIDESHOW.length
    }
  },
  methods: {
    toPage() {
      if(this.isLogin){
        this.$router.push("/index")
      }else{
        this.$router.push("/login")
      }
    }
  }
}
</script>

<style scoped>
.introduce{

  text-align: center;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.carousel-img{
  width: 100%;height: auto;
}
.carousel-img:hover{
  cursor:pointer;
}

</style>