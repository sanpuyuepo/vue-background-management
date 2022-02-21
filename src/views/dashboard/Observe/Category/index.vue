<template>
  <div class="bottomView">
    <div class="header">
      <span>销售额类别占比</span>
      <el-button-group>
        <el-button size="mini">全部渠道</el-button>
        <el-button type="primary" size="mini">线上</el-button>
        <el-button type="primary" size="mini">门店</el-button>
      </el-button-group>
    </div>
    <div class="main" ref="main">环形饼图</div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Category",
  data() {
    return {};
  },
  mounted() {
    let myChart = echarts.init(this.$refs.main);
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
  },
};
</script>

<style scoped>
.bottomView {
  height: 400px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.main {
  width: 100%;
  height: 350px;
}

</style>
