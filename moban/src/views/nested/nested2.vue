<template>
  <div class="introduction">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="设置银商" name="first">
      <div class="inputSize">
         <el-input v-model="input" placeholder="请输入玩家id" col="2"></el-input>
         <el-button type="primary">设为银商</el-button>
        </div>
      <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="byMid"
      label="银商ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="money"
      label="金币"
      width="180">
    </el-table-column>
    <el-table-column
      prop="setTime"
      label="设置时间">
    </el-table-column>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="用户Id" name="second">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="用户Id">
    <el-input v-model="formInline.user" placeholder="用户Id"></el-input>
  </el-form-item>
  <el-form-item label="充值金额">
    <el-input v-model="formInline.user" placeholder="请输入充值金额"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import { Merchant } from "@/api/management";
export default {
  components: {},
  data() {
    return {
      activeName: "second",
      tableData: [],
      input: "",
      formInline: {
          user: '',
          region: ''
        }
    }
  },
  methods: {
    init(){
      Merchant().then(resp => {
        var _this = this;
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            _this.tableData=resp.data.data;
          }else {
            this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
        console.log('submit!');
      }
  },
  created() {
    var _this=this;
    _this.init()
  },
  mounted() {}
};
</script>
<style>
.inputSize {
  /* float: right; */
  margin-bottom: 15px;
}
.inputSize .el-input {
  width: 200px !important;
}
</style>
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
}
</style>
