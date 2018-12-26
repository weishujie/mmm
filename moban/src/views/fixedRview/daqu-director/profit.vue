<template>
  <div class="introduction">
    <div class="content-title">提升收益</div>
    <div class="rightMain">
      <p id="descriptionID" class="Mes">玩家扫描你的二维码下载游戏,将会给你带来意想不到的的收益!</p>
      <div id="qrcode"></div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { getProfit } from "@/api/management";
export default {
  data() {
    return {};
  },
  methods: {
    qrcode() {
      var _this = this;
      var textValue = "";
      getProfit().then(resp => {
        console.log("resp:", resp);
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            textValue = resp.data.data;
            document.getElementById("qrcode").innerHTML=""
            let qrcode = new QRCode("qrcode", {
              width: 150,
              height: 150,
              text: textValue
            });
            console.log("qrcode_object:", qrcode);
            console.log("qrcode_text:", textValue);
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
    }
  },
  mounted() {this.qrcode()}
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
    background-color: rgb(240, 241, 241);
    line-height: 40px;
    margin-bottom: 10px;
    padding-left: 5px;
  }
}
.rightMain {
  text-align: center;
}
.Mes {
  padding: 14px 0;
}
#qrcode {
  height: 150px;
  width: 150px;
  margin: auto;
}
</style>
