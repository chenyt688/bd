<template>
  <div class="wrap" style="display: none" id="registDiv">
    <div class="login-aside" style="top: 100px;">
      <div id="o-box-up"></div>
      <div id="o-box-down"  style="table-layout:fixed;">
        <div>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a id="a2" style="color: white;font-size: 18px" value="phoneLogin" @click="phoneToLogin()">手机号注册</a>
        </div>
        <br>
        <!--手机号码注册-->
        <form id="registForm" name="registForm"  action="/api/userRegister">
          <br>
          <div class="fm-item">
            <label>手机号码:</label>
            <br>
            <input type="text"  style="width: 220px;height: 30px" placeholder="请输入手机号" maxlength="11" name="userPhoneforRegister" id="userPhoneforRegister" class="i-text"  >
            <div class="ui-form-explain"></div>
          </div>
          <br>

          <br>
          <div class="fm-item">
            <label>短信验证码:</label><br>
            <input type="text" style="width: 110px;height: 30px" maxlength="6" id="inputMsgforRegister" name="inputMsgforRegister" class="i-text" placeholder="请输入验证码" >
            &nbsp;
            <input type="button" style="height: 30px;width: 100px;background-color: white;color: black" id="codeButton_r" @click="getMsg_r" value="获取验证码">
            <input type="hidden" id="returnYzmforRegister" name="returnYzmforRegister" value="">
          </div>
          <br><br>

          &nbsp;&nbsp;
          <button type="button" style="width: 80px;height: 30px;margin: auto;background-color: white;color: green" @click="submitInfo">注册</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" style="width: 80px;height: 30px;margin: auto;background-color: white;color: green" @click="backToLogin">返回</button><br><br>
        </form>
      </div>

    </div>


  </div>
</template>

<script>
    let countsec = 60;
    let time;
    export default {
        name: "RegistPage",
        data(){
          return{
            user:{userPhone:''}
          }
        },
        methods:{
          backToLogin:function () {
            document.getElementById("loginDiv").style = "display: block";
            document.getElementById("registDiv").style = "display: none";
          },

          //获取短信验证码倒计时
          getMsg_r(){
            //发送验证码短信
            let userPhone = $("#userPhoneforRegister").val();

            if(userPhone ==null || userPhone ==''){
              this.$message({type: 'warning', showClose: true, message: '请输入电话号码!'});
            }else {
              this.$axios.put("/api/yzmData?userPhone=" + userPhone).then((response) => {
                $("#returnYzmforRegister").val(response.data);
              }).catch(() => {
                this.$message({type: 'success', showClose: true, message: '操作失败!'});
              });
              this.getNewMsg_r();
            }
          },
          getNewMsg_r:function(){
            let self=this;
            //60秒倒计时
            if (countsec == 0) {
              $("#codeButton_r").val("获取验证码");
              //document.getElementById('codeButton_r').style.cursor = 'pointer';
              let codeButton_r = document.getElementById("codeButton_r");//设置按钮为不可用
              codeButton_r.disabled=false;
              countsec = 60;
            } else {
              $("#codeButton_r").val("重新发送(" +countsec+ "S)");
              //60秒内按钮不可点击
              //document.getElementById('codeButton_r').style.cursor = 'not-allowed';
              let codeButton_r = document.getElementById("codeButton_r");//设置按钮为不可用
              codeButton_r.disabled=true;
              countsec--;
              time = setTimeout(function() {
                self.getNewMsg_r();
              },1000)
            }
          },
          //注册
          submitInfo: function () {
            let inputMsg = $("#inputMsgforRegister").val();
            let returnYzm = $("#returnYzmforRegister").val();
            let userPhone = $("#userPhoneforRegister").val();
            if(userPhone!=""){
              if(inputMsg != '' &&inputMsg != null&&inputMsg == returnYzm){
                this.$axios.post("/api/userRegister?userPhone="+userPhone+"").then((response) =>{          //这里使用了ES6的语法
                  this.$message({type: 'warning', showClose: true, message: response.data});
                  document.getElementById("loginDiv").style = "display: block";
                  document.getElementById("registDiv").style = "display: none";
                }).catch(() =>{
                  this.$message({type: 'warning', showClose: true, message: '请求数据失败！！！'});
                  clearTimeout(time);
                  $("#codeButton_r").val("获取验证码");
                  let codeButton_r = document.getElementById("codeButton_r");//设置按钮为不可用
                  codeButton_r.disabled=false;
                })
              }else {
                this.$message({type: 'warning', showClose: true, message: '验证码错误！！！'});
                clearTimeout(time);
                $("#codeButton_r").val("获取验证码");
                let codeButton_r = document.getElementById("codeButton_r");//设置按钮为不可用
                codeButton_r.disabled=false;
              }
            }else {
              this.$message({type: 'warning', showClose: true, message: '请输入电话号码！！！'});
            }

          }
        }
    }
</script>

<style scoped>
  #o-box-down {
    padding: 30px 0 0 40px;
    color: white;
  }
  input{
    background-color: white;
    color: black;
  }
</style>
