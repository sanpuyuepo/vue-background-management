<template>
  <el-form ref="form" label-width="80px">
    <!-- SPU名称 -->
    <el-form-item label="SPU名称">海绵宝宝</el-form-item>
    <!-- SKU名称 -->
    <el-form-item label="SKU名称">
      <el-input v-model="skuName" placeholder="SKU名称"></el-input>
    </el-form-item>
    <!-- 价格(元) -->
    <el-form-item label="价格(元)">
      <el-input v-model="skuPrice" placeholder="价格(元)"></el-input>
    </el-form-item>
    <!-- 重量(千克) -->
    <el-form-item label="重量(千克)">
      <el-input v-model="skuWeight" placeholder="重量(千克)"></el-input>
    </el-form-item>
    <!-- 规格描述 -->
    <el-form-item label="规格描述">
      <el-input
        type="textarea"
        v-model="skuSpecificationDescription"
        placeholder="规格描述"
      ></el-input>
    </el-form-item>
    <!-- 平台属性 -->
    <el-form-item label="平台属性">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="屏幕尺寸">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="无线通信">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!-- 销售属性 -->
    <el-form-item label="销售属性">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="颜色">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!-- 图片列表 -->
    <el-form-item label="图片列表">
      <el-table :data="imgTableData" style="width: 100%" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="图片" width="width"></el-table-column>
        <el-table-column prop="address" label="名称" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <el-button type="primary" size="small">设为默认</el-button>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-button type="primary" @click="save">保存</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      skuName: "",
      skuPrice: null,
      skuWeight: null,
      skuSpecificationDescription: "",
      formInline: {
        user: "",
        region: "",
      },
      imgTableData: [
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
      ],
    };
  },
  methods: {
    save() {
      console.log("save...");
    },
    cancel() {
      this.clearData();
      this.$emit("changeScene", 0);
    },

    // 清除数据
    clearData() {
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style scoped></style>
