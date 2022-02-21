<template>
  <div class="bottomView">
    <div class="header">
      <span>线上热门搜索</span>
      <el-dropdown>
        <i class="el-icon-more"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-row :gutter="5">
      <el-col :span="12"><LineChart></LineChart></el-col>
      <el-col :span="12"><LineChart></LineChart></el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "./LineChart";

export default {
  name: "Search",
  data() {
    return {};
  },
  components: {
    LineChart,
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
</style>
