<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="main" ref="main"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "LineChart",
  data() {
    return {};
  },
  mounted() {
    // 初始化实例
    let lineChart = echarts.init(this.$refs.main);
    // 配置项
    lineChart.setOption({
      tooltip: {},
      legend: {},
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 50, 9],
          smooth: true,
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.header i {
  color: #d9d9d9;
}
.main {
  width: 100%;
  height: 350px;
}
</style>
