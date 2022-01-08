<template>
  <!-- echarts 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Bar",
  data() {
    return {};
  },
  mounted() {
    let barChart = echarts.init(this.$refs.charts);
    barChart.setOption({
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
          type: "bar",
          data: [23, 24, 18, 25, 27, 28, 25],
        },
      ],
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
