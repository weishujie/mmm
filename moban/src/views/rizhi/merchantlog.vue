<template>
   <div class="introduction">
     <div class="block">
       <div class=inputSize><el-input v-model="formData.uid" placeholder="请输入玩家id"></el-input></div>
        <el-date-picker
          v-model="formData.start"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="formData.end"
          type="date"
          placeholder="选择结束日期">
        </el-date-picker>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="网上上下分" name="first">
      <el-table
    :data="tableData1"
    stripe
    style="width: 100%">
    <el-table-column
      prop="from"
      label="操作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="to"
      label="操作对象">
    </el-table-column>
    <el-table-column
      prop="num"
      label="金额">
    </el-table-column>
    <el-table-column
      prop="dateTime"
      label="时间">
    </el-table-column>
    <el-table-column
      prop="buyType"
      label="功能">
    </el-table-column>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="游戏上下分" name="second">
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="from"
      label="操作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="to"
      label="操作对象">
    </el-table-column>
    <el-table-column
      prop="num"
      label="金额">
    </el-table-column>
    <el-table-column
      prop="dateTime"
      label="时间">
    </el-table-column>
    <el-table-column
      prop="buyType"
      label="功能">
    </el-table-column>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-table>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { Yingshang } from "@/api/log";
import store from "@/store/index";
export default {
  directives: {},
  data() {
    return {
      activeName: "second",
      tableData: [],
      tableData1: [],
      formData: {
        uid: store.getters.uid,
        start: "",
        end: ""
      },
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {
    search() {
      var _this = this;
      Yingshang(_this.formData).then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200&&resp.data.data != "") {
            console.log(resp);
            var list = resp.data.info.dataGame;
            _this.tableData = list;
            var list1 = resp.data.info.dataWeb;
            _this.tableData1 = list1;
          }else {
            this.$message.info({message: '暂无数据',center: true,duration:2000});
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
      console.log("submit!");
    }
  }
};
</script>
<style>
.inputSize {
  display: inline-block;
}
.inputSize .el-input {
  width: 100px !important;
}
</style>  
<style scoped lang="scss">
.title {
  margin-top: 20px;
}
.block {
  .inputSize {
    margin-bottom: 10px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    margin-bottom: 10px;
  }
}
</style>