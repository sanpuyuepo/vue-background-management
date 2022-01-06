<template>
  <el-card style="margin: 20px 0">
    <el-table :data="skuList" style="width: 100%" border>
      <el-table-column align="center" type="index" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="130" align="center">
        <template v-slot="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.skuDefaultImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="150">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="150">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template v-slot="{ row }">
          <el-button
            v-if="row.isSale === 1"
            type="success"
            icon="el-icon-download"
            size="mini"
            title="下架"
            @click="changeSaleStatus(row)"
          ></el-button>
          <el-button
            v-else
            type="info"
            icon="el-icon-upload2"
            size="mini"
            title="上架"
            @click="changeSaleStatus(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            title="编辑"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            title="查看详情"
            @click="getSkuDetailById(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="删除"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- drawer -->
    <el-drawer :visible.sync="drawer" :with-header="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ drawerData.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ drawerData.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ drawerData.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <!-- <el-col :span="16">{{drawerData.skuAttrValueList}}</el-col> -->
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="attr in drawerData.skuAttrValueList"
              :key="attr.id"
              style="margin-right: 5px"
            >
              {{ attr.attrId }}-{{ attr.valueId }}
            </el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="400px" style="width: 400px">
            <el-carousel-item
              v-for="img in drawerData.skuImageList"
              :key="img.id"
            >
              <img :src="img.imgUrl" :alt="img.imgName" style="height: 400px" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
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
  </el-card>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      skuList: [],
      // drawer
      drawer: false,
      drawerData: {},
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList() {
      let res = await this.$API.sku.reqSkuList(this.page, this.limit);
      if (res.code === 200) {
        this.skuList = res.data.records;
        this.total = res.data.total;
      }
    },

    // 修改上下架状态
    async changeSaleStatus(row) {
      // 下架
      if (row.isSale === 1) {
        let res = await this.$API.sku.reqSkuCancelSale(row.id);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "下架成功",
          });
          this.getSkuList();
        }
      } else {
        let res = await this.$API.sku.reqSkuOnSale(row.id);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "上架成功",
          });
          this.getSkuList();
        }
      }
    },

    // drawer detail
    async getSkuDetailById(row) {
      let res = await this.$API.sku.reqSkuDetail(row.id);
      if (res.code === 200) {
        this.drawer = true;
        this.drawerData = res.data;
      }
    },

    // 分页回调
    handleSizeChange(val) {
      this.limit = val;
      this.getSkuList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getSkuList();
    },
  },
};
</script>

<style>
el-carousel__item img {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}
/* 深度选择器 */
.el-carousel >>> .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(18, 176, 238);
}
</style>
