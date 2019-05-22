<template>
  <div class="wrap" style="display: none" id="forgetDiv">
    <div class="login-aside" style="top: 100px;">
      <div id="o-box-up"></div>
      <div id="o-box-down"  style="table-layout:fixed;">
        <div>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a id="a2" style="color: green;font-size: 18px" value="" @click="phoneToLogin()">重置密码</a>
        </div>
        <br>
        <!--手机号码登录表单-->
        <form id="forgetForm" name="forgetForm"  action="/forgetForm">

          <div class="fm-item">
            <label>手机号:</label>
            <br>
            <input type="text"  style="width: 180px;height: 30px;top: -20px;left:65px;position: relative" placeholder="请输入手机号"  maxlength="11" id="userPhoneForget" name="userPhoneForget" class="i-text"  >
            <div class="ui-form-explain"></div>
          </div>

          <div class="fm-item">
            <label>新密码:</label>
            <input type="password" style="width: 180px;height: 30px;left:15px;position: relative" maxlength="16" id="firstUserPassword" name="firstUserPassword" class="i-text" placeholder="请输入新密码" >
            <div class="ui-form-explain"></div>
          </div>
          <br>
          <div class="fm-item">
            <label>确认密码:</label>
            <input type="password" style="width: 180px;height: 30px" maxlength="16" id="secUserPassword" name="secUserPassword" class="i-text" placeholder="确认密码" >
            <div class="ui-form-explain"></div>
          </div>
          <br>
          <div class="fm-item">
            <label>短信验证码:</label><br>
            <input type="text" style="width: 110px;height: 30px" maxlength="16" id="msgYzm" name="msgYzm" class="i-text" placeholder="请输入验证码" >
            &nbsp;&nbsp;
            <input type="button" style="height: 30px;width: 100px" id="codeButton_f" @click="getNew_f" value="获取验证码">
            <input type="hidden" id="returnYzmForForget" name="returnYzmForForget" value="">
          </div>
          <br><br>

          &nbsp;&nbsp;
          <button type="button" style="width: 80px;height: 30px;margin: auto;color: #79a605" @click="formSubmit">确认</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" style="width: 80px;height: 30px;margin: auto;color: #79a605" @click="backToLogin">返回</button><br><br>
        </form>
      </div>

    </div>

  </div>
</template>

<script>
  let countsec = 60;
  let time;
  export default {
    name: "ForgetPassword",
    methods:{
      backToLogin:function () {
        document.getElementById("loginDiv").style = "display: block";
        document.getElementById("registDiv").style = "display: none";
        document.getElementById("forgetDiv").style = "display: none";
      },


      //获取短信验证码倒计时
      getNew_f(){
        //发送验证码短信
        let userPhone = $("#userPhoneForget").val();
        this.$axios.put("/api/yzmData?userPhone="+userPhone).then((response) =>{
          $("#returnYzmForForget").val(response.data);
        }).catch(() =>{
          this.$message({type: 'success', showClose: true, message: '操作失败!'});
        });
        this.getNewMsg_f();
      },
      getNewMsg_f:function(){
        let self=this;
        //60秒倒计时
        if (countsec == 0) {
          $("#codeButton_f").val("获取验证码");
          //document.getElementById('codeButton_f').style.cursor = 'pointer';
          let codeButton_f = document.getElementById("codeButton_f");//设置按钮为不可用
          codeButton_f.disabled=false;
          countsec = 60;
        } else {
          $("#codeButton_f").val("重新发送(" +countsec+ "S)");
          //60秒内按钮不可点击
          //document.getElementById('codeButton_f').style.cursor = 'not-allowed';
          let codeButton_f = document.getElementById("codeButton_f");//设置按钮为不可用
          codeButton_f.disabled=true;


          countsec--;
          time = setTimeout(function() {
            self.getNewMsg_f();
          },1000)
        }
      },
      formSubmit:function () {
        let firPassword = $("#firstUserPassword").val();
        let secPassword = $("#secUserPassword").val();
        let inputMsg = $("#msgYzm").val();
        let returnYzm = $("#returnYzmForForget").val();
        let userPhone = $("#userPhoneForget").val();
        if(userPhone != ""){
          if(firPassword!=""&&firPassword == secPassword){
            if(inputMsg!=""&&inputMsg == returnYzm){
              this.$axios.post("/api/userForgetPassword?userPhone="+userPhone+"&userPassword="+firPassword+"").then((response) =>{          //这里使用了ES6的语法
                if(response.data == "S"){
                  this.$message({type: 'success', showClose: true, message: '密码修改成功！！！'});

                  clearTimeout(time);
                  $("#codeButton_f").val("获取验证码");
                  let codeButton_f = document.getElementById("codeButton_f");//设置按钮为不可用
                  codeButton_f.disabled=false;

                  document.getElementById("loginDiv").style = "display: block";
                  document.getElementById("registDiv").style = "display: none";
                  document.getElementById("forgetDiv").style = "display: none";


                }else {
                  this.$message({type: 'warning', showClose: true, message: '用户不存在！！！'});

                  clearTimeout(time);
                  $("#codeButton_f").val("获取验证码");
                  let codeButton_f = document.getElementById("codeButton_f");//设置按钮为不可用
                  codeButton_f.disabled=false;
                }
              }).catch(() =>{
                this.$message({type: 'warning', showClose: true, message: '请求数据失败！！！'});

                clearTimeout(time);
                $("#codeButton_f").val("获取验证码");;
                let codeButton_f = document.getElementById("codeButton_f");//设置按钮为不可用
                codeButton_f.disabled=false;
              })
            }else{
              this.$message({type: 'warning', showClose: true, message: '验证码错误！！！'});

              clearTimeout(time);
              $("#codeButton_f").val("获取验证码");
              let codeButton_f = document.getElementById("codeButton_f");//设置按钮为不可用
              codeButton_f.disabled=false;
            }
          }else {
            this.$message({type: 'warning', showClose: true, message: '输入密码不一致！！！'});
            //alert("输入密码不一致！！！");
          }
        }else {
          this.$message({type: 'warning', showClose: true, message: '请输入电话号码！！！'});
        }




      }

    }
  }
</script>

<style scoped>

</style>
