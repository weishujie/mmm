<template>
  <div class="introduction">
     <div class="content-title">
        我的权益
     </div>
     <table style="text-align: left">
        <tr>
          <td><img :src="headimgurl" class="uImg" alt="用户头像" /></td>
          <td>
            {{uname}}<br/><br/>
            ID:{{uid}}
          </td>
        </tr>
        <tr>
          <td>当前等级</td>
          <td>{{agent}}</td>
        </tr>
        <tr>
          <td></td>
          <td><el-col class="smallText">{{levelDescirp}}</el-col></td>
        </tr>
        <tr>
          <td>我的权益</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>提取权益<img class="rolImg" :src="distillImg"/><el-col v-model="distillDescription" class="redText"></el-col></td>
        </tr>
        <tr>
          <td></td>
          <td>三级返利<img class="rolImg" :src="imgthir" /></td>
        </tr>
        <!-- <tr>
          <td></td>
          <td>自身返利<img class="rolImg" :src="imgFaild" id="selfImg"/><el-col id="selfDescription"  class="redText">需成为代理</el-col></td>
        </tr>-->
        <tr>
          <td></td>
          <td>业绩提成<img class="rolImg" :src="achievementImg"/><el-col v-model="achievementDescription"  class="redText"></el-col></td>
        </tr>
    </table>
  </div>
</template>
<script>
import store from '@/store/index'
export default {
  data() {
    return {
      headimgurl: "",
      uname: unescape(store.getters.name.replace(/\\/g, "%")),
      uid: store.getters.uid,
      agent: "",
      needPersonCount:0,
      levelDescirp:"",
      imgthir:"../static/image/pay/success.png",
      distillImg:"",
      achievementImg:"",
      distillDescription: "需成为代理",
      achievementDescription:"需加入大区",
    }
  },
  methods: {
    init(){
      var _this=this;
      console.log("level:",store.getters.level)
      //_this.needPersonCount=resp.data.needPersonCount
      _this.imgthir="../static/image/pay/success.png"
      if(store.getters.level<2){
        //_this.levelDescirp="还需推广"+needPersonCount+"人成为代理";
      }else if (store.getters.level==2){
        //_this.levelDescirp="还需推广"+needPersonCount+"人成为总代理";
        _this.distillImg="../static/image/pay/success.png";
        _this.distillDescription="";
      }else if (store.getters.level>2){
        _this.levelDescirp=""
        _this.distillImg="../static/image/pay/success.png";
        _this.distillDescription="";
        _this.achievementImg="../static/image/pay/success.png";
        _this.achievementDescription="";
      }
      if(store.getters.level==2){_this.agent="代理"}else if(store.getters.level==3){_this.agent="大区总监"}else if(store.getters.level==4){_this.agent="大区经理"}else if(store.getters.level==9){_this.agent="管理员"}
    }
  },
  created() {var _this=this;_this.init();}
};
</script>
<style scoped lang="scss">
.inputSize { margin-bottom: 20px;}
.inputSize .el-input {width: 200px !important;}
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
.uImg{height:80px;width:99px;}
.redText{font-size:10px;color: red;}
.smallText{font-size: 10px;font-weight: 300;}
.rolImg{width: 16px;height: 14px;margin: auto 8px;background-color: firebrick;}
td{padding:6px;}
</style>
