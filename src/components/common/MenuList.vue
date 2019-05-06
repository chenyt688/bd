<template>
  <div class="container-fluid no-padding menu-block">
    <!-- Container -->
    <div class="container">
      <!-- nav -->
      <nav class="navbar navbar-default ow-navigation">
          <img src="static/image/logo.jpg" style="width: 150px;height: 80px;left: 800px"/>
          <a href="#/" class="navbar-brand">支 <span>教</span></a>
        <div class="navbar-collapse collapse navbar-right" id="navbar">
          <ul class="nav navbar-nav">
            <li class="langs-block" v-for="basemenu in baseMenuInfo">
              <a href="/" class="current" >{{basemenu.basisMenuName}} </a>
              <div class="langs-block-others-wrapper" >
                <div class="langs-block-others" style="top:-45px;width: 150px" >
                  <i v-for="rolemenu in roleMenuInfo.supmenuList" v-if="rolemenu.basisMenuId == basemenu.basisMenuId" >
                    <a :href="rolemenu.supmenuUrl">{{rolemenu.supmenuName}}</a>
                  </i>
                </div>
              </div>
            </li>
            <input type="hidden" value="1" id="loginId"></input>
            <li><a  title="登陆/注册" @click="login" ><i class="icon icon-User"></i></a></li>
            <!--<li><a  title="搜索" @click="search"><i class="icon icon-Search"></i></a></li>-->
            <li><a  title="退出" @click="exitLogin"><i class="icon icon-Exit"></i></a></li>
            <li><a  title="">欢迎您:{{state}}</a></li>
          </ul>

        </div><!--/.nav-collapse -->

      </nav><!-- nav /- -->
      <div class="tp-mask-wrap" style="display: none" id="divsearch">
        <span><i class="icon_close" style="left: 1110px;position: relative;top:-10px" @click="close"></i></span>
        <input type="hidden" value="1" id="searchInput"></input>
        <input type="text" id="inputSearch" class="form-control"  style="width: 180px;left: 920px;position: relative;top: -35px" placeholder="搜索" @keyup.enter ="submit"/>
      </div><!-- Search Box /- -->
    </div><!-- Container /- -->

  </div><!-- Menu Block /- -->


</template>

<script>
  var _this1;
  export default {
        name: "MenuList",

        data(){
            return{
              state:'游客',
              accout:'',
              roleMenuInfo:[{
                roleId:'',
                roleName:'',
                supmenuList:[{
                  basisMenuId:'',
                  supmenuId:'',
                  supmenuName:'',
                  supmenuUrl:''
                }]

              }],
              baseMenuInfo:[{
                basisMenuId:'',
                basisMenuName:''
              }]

            }
        },
        created(){
         /* //获取角色菜单
          */
          this.getMenu();
          this.getBaseMenu();
          var roleName = '';
          if(this.$store.state.roleId == '1'){
            roleName = '(用户）'
          }
          if(this.$store.state.roleId == '2') {
            roleName = '（管理员）'
          }
          if(this.$store.state.userName !='' && this.$store.state.userName != null){
            this.state = this.$store.state.userName + roleName;
          }else {
            if(this.$store.state.userAccount != '' && this.$store.state.userAccount != null){
              this.accout=this.$store.state.userAccount.substr(0,3)+"***"+this.$store.state.userAccount.substr(18,20)
              this.state = this.accout + roleName;
            }

          }

        },
        methods: {
          //获取基础菜单
          getBaseMenu:function(){
            this.$axios({
              method:'post',
              url:'/api/getBaseMenu'
            }).then((response) =>{          //这里使用了ES6的语法
              var _this = this
              //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
              _this.baseMenuInfo = response.data
              console.log(response.data)       //请求成功返回的数据

            }).catch((error) =>{
              alert("请求数据失败！")     //请求失败返回的数据
            })
          },

          //获取子菜单
          getMenu:function(){
            this.$axios({
              method:'post',
              url:'/api/getSupmenu'
            }).then((response) =>{          //这里使用了ES6的语法
              var _this = this
              //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
              _this.roleMenuInfo = response.data
              console.log(response.data)       //请求成功返回的数据

            }).catch((error) =>{
              alert("请求数据失败！")     //请求失败返回的数据
            })
          },

          //用户退出登录
          exitLogin: function(){
            this.$confirm('用户退出登陆, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
              this.$axios({
                method:'get',
                url:'/api/loginOut'
              });
              localStorage.clear();
              location.reload();
            }).catch(() => {
              this.$message({
                type: 'info',
                showClose: true,
                message: '已取消退出'
              });

            });


            //重新刷新页面
            //location.reload();
          },


          search: function () {
            var val = $("#searchInput").val();
            if(val == 1){
              document.getElementById("divsearch").style = "display: block";
              document.getElementById("loginDiv").style = "display: none";
              document.getElementById("registDiv").style = "display: none";
              document.getElementById("forgetDiv").style = "display: none";
              $("#searchInput").val("2");
            }else {
              document.getElementById("divsearch").style = "display: none";
              document.getElementById("loginDiv").style = "display: none";
              document.getElementById("registDiv").style = "display: none";
              document.getElementById("forgetDiv").style = "display: none";
              $("#searchInput").val("1");
            }


          },
          close: function () {
            document.getElementById("divsearch").style = "display: none";
          },
          submit: function () {
            alert("确认搜索")

          },

          //登录
          login: function () {
            var val= $("#loginId").val();
            if(val ==1){
              document.getElementById("loginDiv").style = "display: block";
              document.getElementById("registDiv").style = "display: none";
              document.getElementById("divsearch").style="display: none";
              document.getElementById("forgetDiv").style = "display: none";
              $("#loginId").val("2")
            }else {
              document.getElementById("loginDiv").style = "display: none";
              document.getElementById("registDiv").style = "display: none";
              document.getElementById("forgetDiv").style = "display: none";
              $("#loginId").val("1")
            }


          },
          loginClose:function () {

            document.getElementById("loginDiv").style = "display: none";
          }

        }
    }


</script>

<style scoped>

</style>
