<template>
  <div style="width: auto;height: 400px" id="taskSubmitSortChart">
  </div>
</template>

<script>
export default {
  name: "TaskSubmitSortChart",
  data(){
    return {
      option: {
        title: {
          text: '提交时间排名'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (x)=> {

            return (x[0].data/24).toFixed(1) + '天前';
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [
          {
            type: 'bar',
            data: []
          }
        ],
        echart: null
      }
    }
  },
  methods: {
    //初始化echarts
    echartsInit() {
      if(this.echart == null){
        this.echart = this.$echarts.init(document.getElementById('taskSubmitSortChart'))
      }
      this.echart.setOption(this.option)
    },
    setOption(legendData,xAxisData,series) {
      this.option.legend.data = legendData
      this.option.xAxis.data = xAxisData
      this.option.series = series
    },
    loadChart(yAxisData, seriesData){
      this.option.yAxis.data = yAxisData
      this.option.series[0].data = seriesData
      this.echartsInit()
    }
  }
}
</script>

<style scoped>

</style>