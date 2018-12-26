<template>
  <div class="introduction">
      <div class="content-title">
       下级会员列表  
      </div>
      <div class="block">
        <div class=inputSize>
          <el-input v-model="formData.uid" placeholder="请输入玩家id"></el-input>
          <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value"  :label="item.label" :value="item.value">
          </el-option>
        </el-select>
          <el-button type="primary"  @click="init">查询</el-button>
        </div> 
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="uid" label="ID"></el-table-column>
        <el-table-column prop="sum" label="总税收"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
           
            <el-button type="text" size="small" v-if="scope.row.level==2?false:true" @click="setAgent(scope.row.uid)">设置为代理</el-button>
            <el-button type="text" size="small" v-if="scope.row.level==3?false:true" @click="setLeader(scope.row.uid)" >设置为总监</el-button>
          </template>
        </el-table-column> -->
      </el-table>
  </div>
</template>
<script>
import { getMemberList } from "@/api/management";
import store from '@/store/index'
export default {
  directives: {},
  data() {
    return {
      options: [{value: '1',label: '上周'}, {value: '0',label: '本周'}],
      value:"0",
      tableData: [{level:2},{level:3}],
      formData:{uid:""},
    }
  },
  methods: {
    init() {
      this.formData.week=this.value
      getMemberList(this.formData).then(resp => {
       console.log("this.formData:",this.formData)
        console.log("resp:",resp)
        var _this = this;
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            _this.tableData = resp.data.data;
          }else {
            this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    },
  },
  created() {var _this = this;_this.init();},
  watch: {
    $route(to, from) {
      // console.log(to.path,from.path,"path___________")
      if (to.path == "/daqu-manager/agentList") {
        this.init()
      }
    }
  }
};
</script>
<style scoped lang="scss">
.title {margin-top: 20px;}
.inputSize .el-input { width: 200px !important;}
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
   .block{
     .inputSize{
       margin-bottom: 10px;
     }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      margin-bottom: 10px;
    }
  }
}
</style>