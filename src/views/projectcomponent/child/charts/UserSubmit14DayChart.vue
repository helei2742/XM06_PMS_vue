<template>
<!--  项目用户14天的提交情况-->
  <div v-loading="loading">
    <div style="width:auto;height:480px;padding: 15px;min-width: 320px"

         id="userSubmit14DayChart">
    </div>
  </div>

</template>

<script>
import {queryUserProjectSubmit14dayNetwork} from "@/network/charts";

export default {
  name: "UserSubmit14DayChart",
  data(){
    return {
      loading: false,
      option: {
        title: {
          text: '14天内各成员的提交情况',
          left:'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: "{a} <br/>{b} : {c}%"
        },
        legend: {
          data: [],
          y: 'bottom'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        toolbox: {

          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          name: '占总项目进度百分比',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: []
      }
    }
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('userSubmit14DayChart')).setOption(this.option)
    },
    setOption(legendData,xAxisData,series){
      this.option.legend.data = legendData
      this.option.xAxis.data = xAxisData
      this.option.series = series
    },
    loadChart(projectId) {
      this.loading = true
      queryUserProjectSubmit14dayNetwork(projectId).then(data=>{
        let legendData = data.userNames
        let xAxisData = data.dates
        let series = []
        for (let username of legendData) {
          let seriesItem = {
            name: username,
            type: 'line'
          }
          let dateMapDegree = data.userDaySubmit[username]
          let seriesItemData = []
          for (let e of dateMapDegree) {
            let v = e[Object.keys(e)[0]]
            seriesItemData.push(Math.round(v * 100))
          }
          seriesItem.data = seriesItemData
          series.push(seriesItem)
        }
        this.setOption(legendData,xAxisData,series)

        this.echartsInit()
      }).finally(()=>{
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>