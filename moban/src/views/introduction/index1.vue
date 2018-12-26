<template>
  <div class="introduction">
    <div class="content-title">跑马灯设置</div>
    <el-form ref="form" :model="formData">
      <el-form-item label>
        <el-input v-model="formData.content" class="inputheight" placeholder="请设置跑马灯内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">重置</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import store from "@/store/index";
import { Paomaden, Paomadeninit } from "@/api/settingmeg";
export default {
  components: {},
  data() {
    return {
      formData: {
        // uid: store.getters.uid,
        content: ""
      }
    };
  },
  methods: {
    init() {
      Paomadeninit(this.formData).then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            var list = resp.data.data;
            this.formData.content = list;
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
    onSave() {
      var _this = this;
      if (!_this.formData.content.trim()) {
        return _this.$message.warning({
          message: "保存内容不能为空",
          center: true,
          duration: 2000
        });
      }
      Paomaden(_this.formData).then(resp => {
        console.log("resp", resp);
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
    onSubmit() {
      // console.log("submit!");
      this.formData.content = "";
    }
  },
  created() {
    this.init();
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
  .inputheight {
    height: 60px;
    input {
      height: 60px;
    }
  }
}
</style>
