<template>

  <div class="wrap" style="display:none;position: relative;margin-top: 300px;" id="loginDiv">

    <div class="login-aside" style="top: 100px;">
      <div id="o-box-up"></div>
      <div id="o-box-down"  style="table-layout:fixed;">
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a id="accoutA1" style="color: green;font-size: 18px" value="accountLogin" @click="accountToLogin">账号登录</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a id="accoutA2" style="color: black;font-size: 18px" value="phoneLogin" @click="phoneToLogin()">手机号登录</a>
        </div>
        <br>
        <!--账号密码登录表单-->
        <form  id="form1" name="form1" style="display: block">
          <div class="fm-item">
            <label>账号:</label>
            <input type="text" style="width: 200px;height: 30px" placeholder="请输入账号" maxlength="100" id="userAccount" name="userAccount" class="i-text"  >
            <div class="ui-form-explain"></div>
          </div>
          <br>
          <div class="fm-item">
            <label>密码:</label>
            <input type="password" style="width: 200px;height: 30px" maxlength="16" id="userPassword" name="userPassword" class="i-text" placeholder="请输入密码" >
            <div class="ui-form-explain"></div>
          </div>
          <br>
          <div class="fm-item">
            <label>类型:</label>
            <select  id="roleId" name="roleId" class="i-text yzm" style="width: 200px;height: 30px">
              <option selected disabled>用户类型</option>
              <option value="1">用户</option>
              <option value="2">管理员</option>
            </select>
          </div>
          <br>
          <div class="fm-item">
            <label>验证码:</label>
            <input type="text" placeholder="验证码" maxlength="4" name="code_input" id="code_input" style="width: 65px;height: 30px"  class="i-text"  >
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span id="v_container" style="position:absolute;width: 95px;height: 25px"></span>
          </div>
        </form>

        <!--手机号码登录表单-->
        <form id="form2" name="form2" style="display: none" >
          <br>
          <div class="fm-item">
            <label>手机号码:</label>
            <br>
            <input type="text" style="width: 220px;height: 30px" placeholder="请输入手机号" maxlength="100" id="userPhoneL" name="userPhoneL" class="i-text">
            <div class="ui-form-explain"></div>
          </div>
          <br>
          <div class="fm-item">
            <label>短信验证码:</label><br>
            <input type="text" style="width: 110px;height: 30px" maxlength="6" id="inputMsg" name="inputMsg" class="i-text" placeholder="请输入验证码" >
            &nbsp;&nbsp;
            <input type="button" style="height: 30px;width: 95px" id="codeButton" @click="getNewMsg" value="获取验证码">
            <input type="hidden" id="returnYzm" name="returnYzm" value="">
          </div>
          <br><br>
        </form>
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" style="width: 150px;height: 30px;margin: auto;color: #79a605" @click="submitInfo">登录</button><br><br>
        <div class="bottom">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="helper-text"><i class="fa fa-lock"></i> <a @click="registPage" style="color: red">注册</a></span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="helper-text"><i class="fa fa-lock"></i> <a @click="forgetPassword" style="color: red  ">忘记密码</a></span>
        </div>

      </div>

    </div>


  </div>
</template>

<script>

    var countsec = 60;
    var verifyCode;
    export default {
      name: "LoginAndRegist",
      data(){
        return{
          user:{
            userId:'',
            userAccount:'',
            userPassword:'',
            userName:'',
            roleId:'',
            userGender:'',
            userIdentityType:'',
            userIdentityDate:'',
            userImgUrl:'',
            userPhone:'',
            userBirth:'',
            userAddress:'',
            puserEmail:'',
            userRegistrationTime:'',
            delFlag:''
          }
        }

      },
      created(){
      },
      beforeDestroy(){

      },
      mounted(){
        //初始化js,生成验证码图片
        verifyCode = new GVerify("v_container");
      },

      computed:{

      },
      methods: {
        //获取短信验证码倒计时
        getNewMsg:function(){
          var self=this;

          //60秒倒计时
          if (countsec == 0) {
            $("#codeButton").val("获取验证码");
            //document.getElementById('codeButton').style.cursor = 'pointer';
            document.getElementById('codeButton').disabled=false;
            countsec = 60;
          } else {
            $("#codeButton").val("重新发送(" +countsec+ "S)");
            //60秒内按钮不可点击
            //document.getElementById('codeButton').style.cursor = 'not-allowed';
            document.getElementById('codeButton').disabled=true;
            countsec--;
            setTimeout(function() {
              self.getNewMsg();
            },1000)
          }
          //发送验证码短信
          $.ajax({
            type: "post",
            async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: "/api/yzmData",       //请求发送到/yzmData处
            data: {},
            dataType: "json",        //返回数据形式为json
            success: function (result) {
              console.log(result);
              if (result) {
                $("#returnYzm").val(result);
              }
            },
            error: function (errorMsg) {
              //请求失败时执行该函数
              alert("发送短信失败!");
            }
          })
        },

        //忘记密码
        forgetPassword:function(){
          document.getElementById("loginDiv").style = "display: none";
          document.getElementById("forgetDiv").style = "display:block";
        },
        //注册
        registPage:function(){
          document.getElementById("loginDiv").style = "display: none";
          document.getElementById("registDiv").style = "display: block";
          document.getElementById("registForm").style = "display: block";

        },
        //账号登陆
        accountToLogin: function () {
          form1.style.display = 'block';
          form2.style.display = 'none';
          accoutA1.style.color = 'green';
          accoutA2.style.color = 'black';
        },
        //电话号码登陆
        phoneToLogin: function () {
          form1.style.display = 'none';
          form2.style.display = 'block';
          accoutA1.style.color = 'black';
          accoutA2.style.color = 'green';
        },

        //提交表单数据
        submitInfo: function () {
          if (this.$store.state.userId == null) {
            if (accoutA1.style.color == "green") {      //账号密码登录
              var code_input = $("#code_input").val();
              var res = verifyCode.validate(code_input);  //判断验证码是否正确
              if (res) {
                //$("#form1").submit();
                var userAccount = $("#userAccount").val();
                var userPassword = $("#userPassword").val();
                var roleId = $("#roleId").val();
                let data = 'userAccount=' + userAccount + '&userPassword=' + userPassword + '&roleId=' + roleId;
                this.$axios.post("/api/acountLogin?" + data).then((response) => {          //这里使用了ES6的语法
                  if (response.data == 'F') {
                    this.$message({
                      type: 'success',
                      showClose: true,
                      message: '登录失败!'
                    });
                  } else {
                    this.$message({
                      type: 'success',
                      showClose: true,
                      message: '登录成功!'
                    });
                    location.reload();
                    this.user = response.data;
                    localStorage.setItem('userId', this.user.userId);
                    localStorage.setItem('userAccount', this.user.userAccount);
                    localStorage.setItem('userName', this.user.userName);
                    localStorage.setItem('roleId', this.user.roleId);
                    this.$store.commit('changeState', this.user.userId, this.user.userAccount, this.user.userName, this.user.roleId);

                  }
                }).catch((error) => {
                  alert("请求数据失败！")     //请求失败返回的数据
                })
              } else {
                this.$message({
                  type: 'success',
                  showClose: true,
                  message: '验证码错误！！！请重新输入！!'
                });

                $("#code_input").val("");
              }
            } else {                                    //手机号登录
              var inputMsg = $("#inputMsg").val();
              var returnYzm = $("#returnYzm").val();
              var userPhone = $("#userPhoneL").val();
              //alert(returnYzm + "   " +inputMsg);
              if (inputMsg == returnYzm) {
                this.$axios.post("/api/phoneLogin?userPhone=" + userPhone).then((response) => {          //这里使用了ES6的语法
                  if (response.data == 'F') {
                    this.$message({
                      type: 'success',
                      showClose: true,
                      message: '登录失败!'
                    });
                  } else {
                    this.$message({
                      type: 'success',
                      showClose: true,
                      message: '登录成功!'
                    });
                    location.reload();
                    this.user = response.data;
                    localStorage.setItem('userId', this.user.userId);
                    localStorage.setItem('userAccount', this.user.userAccount);
                    localStorage.setItem('userName', this.user.userName);
                    localStorage.setItem('roleId', this.user.roleId);
                    this.$store.commit('changeState', this.user.userId, this.user.userAccount, this.user.userName, this.user.roleId);

                  }
                }).catch((error) => {
                  alert("请求数据失败！")     //请求失败返回的数据
                })
                //$("#form2").submit();
              } else {
                this.$message({
                  type: 'success',
                  showClose: true,
                  message: '验证码错误！！！登陆失败！！！'
                });
              }

            }
          }else {
            this.$message({
              type: 'success',
              showClose: true,
              message: '已有账户登录！！！请先退出！！！'
            });
          }
        }
      }

    }

</script>

<style scoped>

</style>
