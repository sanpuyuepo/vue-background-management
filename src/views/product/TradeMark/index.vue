<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 添加/编辑 对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      width="30%"
    >
      <el-form :model="tmForm" :rules="rules" ref="tmForm">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          style="width: 500px"
          prop="tmName"
        >
          <el-input auto-complete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('tmForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- table -->
    <el-table style="100%;" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template v-slot="{ row }">
          <el-button type="text" size="small" @click="updateTradeMark(row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteTradeMark(row)"
            >删除</el-button
          >
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
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      //
      dialogFormVisible: false,
      formLabelWidth: "100px",
      //
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请上传品牌LOGO图片" }],
      },
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    title() {
      return this.tmForm.id ? "编辑品牌" : "添加新品牌";
    },
  },
  methods: {
    async getData() {
      const { page, limit } = this;
      try {
        let res = await this.$API.trademark.reqTradeMarkList(page, limit);
        if (res.code === 200) {
          this.total = res.data.total;
          this.list = res.data.records;
        }
      } catch (error) {}
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },

    // 添加/编辑
    showDialog() {
      this.dialogFormVisible = true;
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    handleAvatarSuccess(res, file) {
      // res: 上传成功后返回前端的数据
      // file: 上传成功后返回的数据
      console.log(res);
      console.log(file);
      this.tmForm.logoUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    updateTradeMark(row) {
      this.showDialog();
      this.tmForm = { ...row };
    },
    deleteTradeMark(row) {
      // 弹框提示
      this.$confirm(`是否确认删除: ${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let res = await this.$API.trademark.reqDeleteTradeMark(row.id);
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.getData();
            }
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
            type: "info",
          });
        });
    },

    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let res = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (res.code === 200) {
            this.$message({
              message: this.tmForm.id ? "编辑品牌成功" : "添加品牌成功",
              type: "success",
            });
            this.page = this.tmForm.id ? this.page : 1;
            this.getData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
