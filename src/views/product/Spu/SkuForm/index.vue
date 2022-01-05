<template>
  <el-form ref="form" label-width="80px">
    <!-- SPU名称 -->
    <el-form-item label="SPU名称">{{ spuName }}</el-form-item>
    <!-- SKU名称 -->
    <el-form-item label="SKU名称">
      <el-input v-model="form.skuName" placeholder="SKU名称"></el-input>
    </el-form-item>
    <!-- 价格(元) -->
    <el-form-item label="价格(元)">
      <el-input v-model.number="form.price" placeholder="价格(元)"></el-input>
    </el-form-item>
    <!-- 重量(千克) -->
    <el-form-item label="重量(千克)">
      <el-input v-model="form.weight" placeholder="重量(千克)"></el-input>
    </el-form-item>
    <!-- 规格描述 -->
    <el-form-item label="规格描述">
      <el-input
        type="textarea"
        v-model="form.skuDesc"
        placeholder="规格描述"
      ></el-input>
    </el-form-item>
    <!-- 平台属性 -->
    <el-form-item label="平台属性">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item
          v-for="(attr, index) in attrInfoList"
          :key="attr.id"
          :label="attr.attrName"
        >
          <el-select
            placeholder="请选择"
            v-model="form.skuAttrValueList[index].valueId"
          >
            <el-option
              v-for="attrValue in attr.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
              :value="attrValue.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!-- 销售属性 -->
    <el-form-item label="销售属性">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item
          v-for="(saleAttr, index) in spuSaleAttrList"
          :key="saleAttr.id"
          :label="saleAttr.saleAttrName"
        >
          <el-select
            placeholder="请选择"
            v-model="form.skuSaleAttrValueList[index].saleAttrValueId"
          >
            <el-option
              v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="saleAttrValue.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!-- 图片列表 -->
    <el-form-item label="图片列表">
      <el-table
        :data="imgTableData"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        >>
        <el-table-column
          type="selection"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="imgUrl" label="图片" width="width">
          <template v-slot="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.imgUrl"
              fit="fill"
              :preview-src-list="[row.imgUrl]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="imgName"
          label="名称"
          width="width"
        ></el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template v-slot="{ row }">
            <el-button
              v-if="!row.isDefault"
              type="primary"
              size="small"
              @click="changeDefault(row)"
              >设为默认</el-button
            >
            <el-button v-else type="success" size="small">默认</el-button>
          </template>
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
      spuName: "",
      // form表单数据收集
      form: {
        spuId: null,
        category3Id: null,
        tmId: null,
        skuName: "",
        price: null,
        weight: "",
        skuDesc: "",
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuDefaultImg: "",
        skuImageList: [],
      },

      // 选择项
      attrInfoList: [],
      spuSaleAttrList: [],
      imgTableData: [],
    };
  },

  methods: {
    // 获取数据
    async getData(row, categoryIds) {
      this.spuName = row.spuName;
      const spuId = row.id;
      this.form.spuId = spuId;
      this.form.category3Id = row.category3Id;
      this.form.tmId = row.tmId;
      const { category1Id, category2Id, category3Id } = categoryIds;

      // 平台属性
      let attrInfoRes = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (attrInfoRes.code === 200) {
        this.attrInfoList = attrInfoRes.data;
        attrInfoRes.data.forEach((item) => {
          let formSkuAttrValueObj = {
            attrId: item.id,
            valueId: null,
          };
          this.form.skuAttrValueList.push(formSkuAttrValueObj);
        });
      }

      // 销售属性
      let spuSaleAttrRes = await this.$API.sku.reqSpuSaleAttrList(spuId);
      if (spuSaleAttrRes.code === 200) {
        this.spuSaleAttrList = spuSaleAttrRes.data;
        spuSaleAttrRes.data.forEach((saleAttr) => {
          let formSaleAttrValueObj = {
            saleAttrId: saleAttr.id,
            saleAttrValueId: null,
          };
          this.form.skuSaleAttrValueList.push(formSaleAttrValueObj);
        });
      }

      // 图片
      let imgRes = await this.$API.sku.reqSpuImageList(spuId);
      if (imgRes.code === 200) {
        imgRes.data.forEach((item) => {
          item.isDefault = 0;
        });
        this.imgTableData = imgRes.data;
      }
    },

    // 图片表格复选
    handleSelectionChange(selection) {
      this.form.skuImageList = selection;
    },
    changeDefault(row) {
      this.imgTableData.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.form.skuDefaultImg = row.imgUrl;
    },

    async save() {
      let res = await this.$API.sku.reqSaveSkuInfo(this.form);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "添加成功",
        });
        this.clearData();
        this.$emit("changeScene", 0);
      }
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
