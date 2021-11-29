<template>

    <div style="width: 300px;height: 400px" id="taskSubmitChart">
    </div>

</template>

<script>
export default {
  name: "TaskSubmitChart",
  data() {
    return{
      option:{
        tooltip: {
          formatter: '{b} : {c}人'
        },

        series: [
          {
            name: '提交人数',
            type: 'gauge',
            progress: {
              show: true
            },
            splitNumber: 1,
            detail: {
              valueAnimation: true,
              formatter: '{value}人'
            },
            min: 0,                 // 最小的数据值,默认 0 。映射到 minAngle。
            max: 0,
            axisTick:false,
            axisLabel: {            // 刻度标签。
              show: true,             // 是否显示标签,默认 true。
            },
            pointer:{
              show: true,             // 是否显示指针,默认 true。
              length: "70%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 4,               // 指针宽度,默认 8。
            },
            title: {                // 仪表盘标题。
              show: true,             // 是否显示标题,默认 true。
              offsetCenter: [0,"20%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              fontSize: 15,           // 文字的字体大小,默认 15。

            },
            data: [
              {
                value: 0,
                name: '提交人数'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('taskSubmitChart')).setOption(this.option)
    },
    loadChart(max, dataValue){
      console.log(max,dataValue)
      this.option.series[0].data[0].value = dataValue
      this.option.series[0].max = max
      this.option.series[0].splitNumber = max

      this.echartsInit()
    }
  }
}
</script>

<style scoped>
#taskSubmitChart{
  margin-top: 20px;
  border-radius: 13px;
  border: 1px solid rgba(100,100,100,0.7);
  box-shadow: 8px 8px 2px 1px rgba(100,100,100,0.4);
}

</style>