<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector
        @cusGetCategoryId="getCategoryIds"
        :unavailable="scene !== 0"
      ></CategorySelector>
    </el-card>

    <el-card style="margin: 20px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 10px 0px"
          :disabled="!categoryIds.category3Id"
          @click="addSPU"
          >添加SPU</el-button
        >
        <!-- 展示列表 -->
        <el-table :data="tableData.records" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="240">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="240">
            <template v-slot="{ row }">
              <el-button
                type="success"
                size="small"
                icon="el-icon-plus"
                title="添加sku"
              ></el-button>
              <el-button
                type="warning"
                size="small"
                icon="el-icon-edit"
                title="修改spu"
                @click="update(row)"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="el-icon-info"
                title="查看当前spu的全部sku"
              ></el-button>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  style="margin-left: 10px"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  title="删除spu"
                  slot="reference"
                >
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- pagination -->
        <el-pagination
          style="margin-top: 20px; text-align: center"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene === 1"
        ref="spu"
        @changeScene="changeScene"
        :categoryIds="categoryIds"
      ></SpuForm>
      <SkuForm v-show="scene === 2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";

export default {
  name: "Spu",
  data() {
    return {
      tableData: {},
      categoryIds: {},
      // 切换场景
      scene: 0,
      // 分页
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  components: {
    SpuForm,
    SkuForm,
  },

  methods: {
    getCategoryIds(ids) {
      this.categoryIds = ids;
      this.getSpuList();
    },

    async getSpuList() {
      const { category3Id } = this.categoryIds;
      try {
        let res = await this.$API.spu.reqSpuList(
          this.page,
          this.limit,
          category3Id
        );
        if (res.code === 200) {
          this.tableData = res.data;
          this.total = res.data.total;
        }
      } catch (error) {}
    },
    // 场景切换
    changeScene(scene) {
      this.scene = scene;
      this.getSpuList();
    },
    // 添加SPU
    addSPU() {
      this.scene = 1;
      this.$refs.spu.initSpuData();
    },
    // 修改SPU
    update(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    // 删除Spu
    async deleteSpu(row) {
      let res = await this.$API.spu.reqDeleteSpu(row.id);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getSpuList();
      }
    },

    // 分页回调
    handleSizeChange(val) {
      this.limit = val;
      this.getSpuList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getSpuList();
    },
  },
};
</script>

<style scoped></style>
