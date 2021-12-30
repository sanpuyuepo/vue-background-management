<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input placeholder="SPU名称" v-model="spuInfo.spuName"></el-input>
    </el-form-item>

    <el-form-item label="品牌">
      <el-select v-model="spuInfo.tmId" placeholder="请选择品牌">
        <el-option
          v-for="item in trademarkOptions"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="SPU描述"
        v-model="spuInfo.description"
      ></el-input>
    </el-form-item>

    <el-form-item label="SPU图片">
      <el-upload
        :file-list="spuImgList"
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-select
        v-model="attrStr"
        :placeholder="`还有${unselectSaleAttr.length}项未选择`"
      >
        <el-option
          v-for="item in unselectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-plus"
        :disabled="!attrStr"
        style="margin-left: 10px"
        @click="addSaleAttr"
        >添加销售属性</el-button
      >
      <el-table
        border
        style="width: 100%; margin: 20px 0"
        :data="spuInfo.spuSaleAttrList"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="saleAttrName"
          label="属性名"
          width="240"
        ></el-table-column>
        <el-table-column prop="prop" label="属性值列表" width="width">
          <template v-slot="{ row }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
              :disable-transitions="false"
              @close="handleClose(row, index)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput(row)"
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="240">
          <template v-slot="{ $index }">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteSaleAttr($index)"
            ></el-button>
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
  name: "SpuForm",
  data() {
    return {
      spuInfo: {
        tmId: "",
        category3Id: 0,
        description: "",
        spuName: "",
        spuImageList: [],
        spuSaleAttrList: [],
      },
      trademarkOptions: [],
      trademark: "",
      saleAttrOptions: [],
      attrStr: "",
      spuImgList: [],
      // 图片
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  props: ["categoryIds"],
  computed: {
    unselectSaleAttr() {
      if (!this.spuInfo.spuSaleAttrList) return this.saleAttrOptions;
      return this.saleAttrOptions.filter((item) => {
        return this.spuInfo.spuSaleAttrList.every((ele) => {
          return item.name !== ele.saleAttrName;
        });
      });
    },
  },

  methods: {
    // 初始化spu请求数据
    async initSpuData(row) {
      if (row) {
        let spuId = row.id;

        let spuRes = await this.$API.spu.reqSpuInfo(spuId);
        if (spuRes.code === 200) this.spuInfo = spuRes.data;

        let imgRes = await this.$API.spu.reqSpuImageList(spuId);
        if (imgRes.code === 200) {
          imgRes.data.forEach((item) => {
            item.name = item.imgName;
            item.url = item.imgUrl;
          });
          this.spuImgList = imgRes.data;
        }
      }

      let trademarkRes = await this.$API.spu.reqTrademarkList();
      if (trademarkRes.code === 200) {
        this.trademarkOptions = trademarkRes.data;
        trademarkRes.data.forEach((item) => {
          if (this.spuInfo.tmId === item.id) {
            this.trademark = item.tmName;
          }
        });
      }

      let baseSaleRes = await this.$API.spu.reqBaseSaleAttrList();
      if (baseSaleRes.code === 200) this.saleAttrOptions = baseSaleRes.data;
    },

    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 图片上传（新增）
    handleSuccess(response, file, fileList) {
      this.spuImgList = fileList;
    },

    // 图片移除
    handleRemove(file, fileList) {
      this.spuImgList = fileList;
    },

    // 属性值列表
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrStr.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spuInfo.spuSaleAttrList.push(newSaleAttr);
    },

    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },

    showInput(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      // 是否为空
      if (!inputValue.trim()) {
        row.inputVisible = false;
        row.inputValue = "";
        return;
      }
      // 是否重复
      let notExist = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName !== inputValue
      );
      if (!notExist) {
        this.$message({
          type: "warning",
          message: "属性值不能重复",
        });
        row.inputVisible = false;
        row.inputValue = "";
        return;
      }
      let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
      row.inputValue = "";
    },

    // 删除销售属性
    deleteSaleAttr(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1);
    },

    // 保存：新增或修改
    async save() {
      // 参数规整
      this.spuInfo.spuImageList = this.spuImgList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: item.url || (item.response && item.response.data),
        };
      });
      const { category3Id } = this.categoryIds;
      this.spuInfo.category3Id = category3Id;

      if (this.spuInfo.id) {
        let res = await this.$API.spu.reqUpdateSpuInfo(this.spuInfo);
        if (res.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$emit("changeScene", 0);
        }
      } else {
        let res = await this.$API.spu.reqSaveSpuInfo(this.spuInfo);
        if (res.code === 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.$emit("changeScene", 0);
        }
      }
      this.clearData();
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

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
