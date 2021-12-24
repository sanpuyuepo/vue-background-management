<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select placeholder="请选择" v-model="categoryForm.category1Id" @change="handleCategory1">
        <el-option
          v-for="item in list1"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="二级分类">
      <el-select placeholder="请选择" v-model="categoryForm.category2Id" @change="handleCategory2">
        <el-option v-for="item in list2" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="三级分类">
       <el-select placeholder="请选择" v-model="categoryForm.category3Id" @change="handleAttr">
        <el-option v-for="item in list3" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <!-- <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item> -->
  </el-form>
</template>

<script>
export default {
  name: "CategorySelector",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      categoryForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.getCategory1();
  },
  methods: {
    // 获取一级分类
    async getCategory1() {
      let res = await this.$API.attr.reqCategory1List();
      if (res.code === 200) {
        this.list1 = res.data;
      }
    },
    // 根据一级分类获取二级分类
    async handleCategory1() {
      // 一级分类发生变化时，置空二三级分类
      this.list2 = [];
      this.list3 = [];
      this.categoryForm.category2Id = '';
      this.categoryForm.category3Id = '';
      const {category1Id} = this.categoryForm;
      let res = await this.$API.attr.reqCategory2List(category1Id);
       if (res.code === 200) {
        this.list2 = res.data;
      }
    },

    // 根据二级分类获取三级分类
    async handleCategory2() {
      // 二级分类发生变化时，置空三级分类
      this.list3 = [];
      this.categoryForm.category3Id = '';
      const {category2Id} = this.categoryForm;
      let res = await this.$API.attr.reqCategory3List(category2Id);
       if (res.code === 200) {
        this.list3 = res.data;
      }
    },

    handleAttr() {
      console.log('good...');
    },

    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style scoped></style>
