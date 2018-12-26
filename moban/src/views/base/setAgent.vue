<template>
  <div class="introduction">
    <div class="content-title">代理权限设置</div>
    <div class="inputSize">
      <el-input v-model="input" placeholder="请输入玩家id" col="2"></el-input>
      <el-button type="primary" @click="setDo">设为代理</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="nickname" label="用户昵称">
        
      </el-table-column>
      <el-table-column prop="uid" label="用户id"></el-table-column>
      <el-table-column prop="createTime" label="绑定时间">
      
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { setAgent,getAgent } from "@/api/management";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      input: ""
    }
  },
  methods: {
    setDo() {
      var _this = this;
      let param = {uid:_this.input};
      if(!param.uid){this.$message.warning({message:"输入不能为空",center: true,duration:2000});return}
      setAgent(param).then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            this.$message.success({message:"设置成功",center: true,duration:2000});
            this.init();
          }else {
            this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    },
    init() {
      getAgent().then(resp => {
        console.log("resp:",resp)
        var _this = this;
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            var list = resp.data.data;
            _this.tableData=[];
            list.forEach(itme => {
              _this.tableData.push({nickname:unescape(itme.nickname.replace(/\\/g, "%"))||"",uid:itme.uid,createTime:itme.createTime });
            });
          }else {
            this.$message.error({message: resp.data.msg||'暂无数据',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    }
  },
  created() {var _this=this;_this.init();}
};
</script>
<style>
.inputSize {
  /* float: right; */
  margin-bottom: 20px;
}
.inputSize .el-input {
  width: 200px !important;
  margin-bottom: 10px;
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
   .block{
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      margin-bottom: 10px;
    }
  }
}
</style>
