<template>
  <div class="introduction">
    <div class="content-title">微信账号管理：</div>
    <el-row>
      <el-col>
        <div size="small" class="textColor">账号输入格式如：WX:8888888,QQ:888888</div>
      </el-col>
    </el-row>
    <el-form ref="form" :model="formData">
      <el-form-item label>
        <el-input type="textarea" v-model="formData.data"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">还原</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Wecharpost, Saveput } from "@/api/settingmeg";
import store from "@/store/index";
var aa = "";
export default {
  components: {},
  data() {
    return {
      tableDataLoading: true,
      form: {
        desc: ""
      },
      formData: {
        // uid: store.getters.uid,
        data: ""
      }
    };
  },
  methods: {
    init() {
      var _this = this;
      Wecharpost().then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            var list = resp.data;
            _this.form.desc = list.data;
            _this.formData.data = resp.data.data;
            _this.aa = resp.data.data;
          } else {
            _this.$message.error({
              message: "请求异常",
              center: true,
              duration: 2000
            });
          }
        }
      });
    },
    onSave() {
      var _this = this;
      Saveput(_this.formData).then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            _this.$message.success({
              message: "设置成功",
              center: true,
              duration: 2000
            });
          } else {
            _this.$message.error({
              message: resp.data.msg || "请求异常提示",
              center: true,
              duration: 2000
            });
          }
        } else {
          _this.$message.error({
            message: "与服务器通讯异常",
            center: true,
            duration: 2000
          });
        }
      });
    },
    onReset() {
      this.formData.data = this.aa;
    }
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/introduction/index4") {
        this.init();
      }
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.introduction {
  padding: 20px;
  padding-bottom: 300px;
  overflow: hidden;
  .content-title {
    width: 100%;
    height: 40px;
    background-color: rgb(241, 240, 240);
    line-height: 40px;
    margin-bottom: 10px;
    padding-left: 5px;
  }
  .textColor {
    color: burlywood;
  }
}
</style>
