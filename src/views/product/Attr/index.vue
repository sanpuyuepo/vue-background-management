<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector @cusGetCategoryId="getAttrInfoList" :show="!showTable"></CategorySelector>
    </el-card>

    <el-card style="margin: 20px 0">
      <!-- attr table -->
      <div v-show="showTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 10px 0px"
          :disabled="isDisabled"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="tableData" stripe style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="180">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template v-slot="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                type="success"
                style="margin-left: 10px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="180" align="center">
            <template v-slot="{ row }">
              <el-button
                type="warning"
                size="small"
                icon="el-icon-edit"
                @click="updateAttr(row)"
                >编辑</el-button
              >
              <el-button type="danger" size="small" icon="el-icon-delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- add attr -->
      <div v-show="!showTable">
        <el-form :inline="true" ref="form" :model="attrForm" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              v-model="attrForm.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!hasAttrName"
          >添加属性值</el-button
        >
        <el-table
          border
          style="width: 100%; margin: 20px 0"
          :data="attrForm.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template v-slot="{ row, $index }">
              <el-input
                :ref="$index"
                v-show="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="toLook(row)"
                @keyup.native.enter="$event.target.blur"
              ></el-input>
              <span v-show="!row.flag" @click="toEdit(row, $index)">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}属性值吗？`"
                @onConfirm="deleteAttrVal($index)"
              >
                <el-button
                  type="danger"
                  size="small"
                  slot="reference"
                  icon="el-icon-delete"
                >
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" :disabled="attrForm.attrValueList.length < 1" @click="save"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Attr",
  data() {
    return {
      tableData: [],
      showTable: true,
      // 添加属性按钮禁用
      isDisabled: true,
      attrForm: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  computed: {
    hasAttrName() {
      return !!this.attrForm.attrName;
    },
  },
  methods: {
    toLook(row) {
      // 校验输入值: 空值和重复值
      if (row.valueName.trim() === "") {
        this.$message("输入值不能为空");
        return;
      }

      let isRepeat = this.attrForm.attrValueList.some((item) => {
        if (row !== item) return row.valueName === item.valueName;
      });

      if (isRepeat) {
        this.$message("输入值已存在");
        row.valueName = "";
        return;
      }

      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    async getAttrInfoList(ids) {
      const { category1Id, category2Id, category3Id } = ids;
      this.attrForm.categoryId = category3Id;
      this.isDisabled = false;
      let res = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (res.code === 200) {
        this.tableData = res.data;
      }
    },
    // 添加
    addAttr() {
      this.showTable = false;
    },
    addAttrValue() {
      this.attrForm.attrValueList.push({
        attrId: this.attrForm.attrId,
        id: 0,
        valueName: "",
        flag: true, // 切换输入和展示状态
      });
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs[this.attrForm.attrValueList.length - 1].focus();
      });
    },
    // 删除属性值
    deleteAttrVal(index) {
      this.attrForm.attrValueList.splice(index, 1);
    },
    // 编辑
    updateAttr(row) {
      this.showTable = false;
      // 添加flag,切换输入框
      row.attrValueList.forEach((item) => {
        item.flag = false;
      });
      this.attrForm = cloneDeep(row);
    },
    // 删除属性
    deleteAttr(row) {},
    // 保存属性信息
    async save() {
      this.attrForm.attrValueList.filter((item) => {
        if (item.valueName != "") {
          delete item.flag;
          return true;
        }
      });
      try {
        await this.$API.attr.reqAddAttrInfo(this.attrForm);
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.showTable = true;
        this.getAttrInfoList();
      } catch (error) {}
    },
    // 取消
    cancel() {
      this.showTable = true;
      this.attrForm = Object.assign(this.attrForm, {
        attrName: "",
        attrValueList: [],
      });
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
