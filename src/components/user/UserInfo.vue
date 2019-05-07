<template>
  <div>
    <nav class="navbar navbar-default" >
      <div class="container-fluid" >
        <div class="navbar-header" >
          <a class="navbar-brand"  >
            <img alt="Brand" src="../../assets/logo.png" id="brand" style="position:relative;left: 40px">
            <span style="position:relative;left: 60px">{{msg}}</span>
          </a>
        </div>
      </div>
    </nav>

    <el-input placeholder="请输入查询条件" v-model="inputCondition" clearable style="width: 260px;left: 20px"></el-input>
    <el-button  icon="el-icon-search" style="position:relative;left:40px" @click="searchUserInfoByCondition">搜索</el-button>
    <el-button  icon="el-icon-plus" style="position:relative;left:40px" @click="addUserInfo(dialogVisible = true)">新增</el-button>
    <el-button icon="el-icon-delete" style="position:relative;left:40px" @click="deletMulUserInfo">批量删除</el-button>

    <br><br>
    <el-table :data="tableData" style="width: 100%" height="400" ref="multipleTable" border  @selection-change="saveMultipleSelection">

      <el-table-column type="selection"  fixed width="60px"></el-table-column>
      <el-table-column  label="序号" fixed width="60px">
        <template slot-scope="scope">
             {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="userAccount" label="账号" width="180px"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="100px" ></el-table-column>
      <el-table-column prop="roleId" label="角色" width="100px" :formatter="roleStatus"></el-table-column>
      <el-table-column prop="userGender" label="性别" width="60px" :formatter="genderStatus"></el-table-column>
      <el-table-column prop="userIdentityData" label="身份证号" width="180" ></el-table-column>
      <el-table-column prop="userPhone" label="电话" width="110px"></el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="200px"></el-table-column>
      <el-table-column prop="userBirth" label="出生日期" width="160px"></el-table-column>
      <el-table-column prop="userRegistrationTime" label="注册时间" width="160px"></el-table-column>
      <el-table-column prop="userAddress" label="地址" width="500px"></el-table-column>
      <el-table-column prop="" label="操作" width="100px" fixed="right">

        <template slot-scope="scope">
          <i class="el-icon-edit" title="编辑" style="position: relative;left: 10px" @click="editUserInfo(scope.$index,scope.row,dialogVisible = true)"></i>
          <i class="el-icon-delete" title="删除" style="position:relative;left: 30px" @click="deleteUserInfo(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <br>

    <!--分页-->
    <div class="block" style="left: 20px;position: relative;">
      <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userAllNum">
      </el-pagination>
    </div>


<!--新增或修改用户-->
    <div >
      <el-dialog  :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
        <label style="position: relative;top: -30px;font-size: 20px">{{opeType}}</label>
        <el-form :model="formData" :inline="true" >
          <el-form-item label="账号">
            <el-input v-model="formData.userAccount" clearable ></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="formData.roleId">
              <el-option label="管理员" value="2"></el-option>
              <el-option label="用户" value="1" selected></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.userPassword" clearable  placeholder="默认密码:123456"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="formData.userIdentityData" clearable ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formData.userName" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="formData.userGender">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.userEmail" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker v-model="formData.userBirth" type="date" clearable placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="电话">
            <el-input v-model="formData.userPhone" clearable autocomplete="off"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="省">
              <el-cascader :options="provinces" v-model="formData.province" clearable style="width: 170px" @change="getCityInfo"></el-cascader>
          </el-form-item>
          <el-form-item label="市">
            <el-cascader  clearable :options="cities" v-model="formData.city" style="width: 170px" @change="getCountyInfo"></el-cascader>
          </el-form-item>
          <el-form-item label="区">
            <el-cascader style="width: 170px" :options="counties" v-model="formData.county" clearable @change="getTownInfo"></el-cascader>
          </el-form-item>
          <el-form-item label="乡镇">
            <el-cascader style="width: 170px" :options="towns" v-model="formData.town" clearable @change="getVillageInfo"></el-cascader>
          </el-form-item>
          <el-form-item label="村">
            <el-cascader style="width: 170px" :options="villages" v-model="formData.village" clearable></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input clearable v-model="formData.speAdd" style="width: 490px"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOrEditUserInfo(dialogVisible = false)">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>


</template>

<script>
    import Qs from 'qs'
    export default {
      name: "UserInfo",
      data() {
        return {
          provinces:[{
            value:'',
            label:'',
          }],
          cities:[{                 //省
            value:'',
            label:'',
          }],                       //市
          counties:[{
            value:'',
            label:'',
          }],                       //区
          towns:[{
            value:'',
            label:'',
          }],                       //乡镇
          villages:[{
            value:'',
            label:'',
          }],            //村
          opeType:'新增用户',
          inputCondition:'',         //输入的条件
          userAllNum:'',            //用户总数
          multipleSelection: [],    //多选框选择的值
          page:'1',                  //页数
          pageSize:'10',              //页面大小
          dialogVisible: false,
          msg: '用户信息管理',
          tableData:[{
            userId:'',
            userAccount:'',
            userPassword:'',
            userName:'',
            roleId:'',
            userGender:'',
            userIdentityType:'',
            userIdentityData:'',
            userImgUrl:'',
            userPhone:'',
            userBirth:'',
            userAddress:'',
            userEmail:'',
            userRegistrationTime:'',
            delFlag:'',
          }],
          formData:{
            userId:'',
            userAccount:'',
            userPassword:'',
            userName:'',
            roleId:'',
            userGender:'',
            userIdentityType:'',
            userIdentityData:'',
            userImgUrl:'',
            userPhone:'',
            userBirth:'',
            userAddress:'',
            userEmail:'',
            userRegistrationTime:'',
            delFlag:'',
            province:'',
            city:'',
            county:'',
            town:'',
            village:'',
            speAdd:''
          },
        }
      },
      created(){
        if(this.tableData.userAccount == null){
          this.tableData == '';
        }
        this.getAllUserInfo();
        this.getUserInfoNum();
        this.getProvinceInfo();
      },
      methods:{
        handleClose(done){
          this.$confirm('确认关闭？').then(_ => {done();}).catch(_ => {});
        },
        //获取用户数量
        getUserInfoNum:function(){
          this.$axios({
            method:'post',
            url:'/api/getUserInfoNum'
          }).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.userAllNum =response.data;
            //请求成功返回的数据
          }).catch(() =>{
            alert("请求数据失败！");     //请求失败返回的数据
          })
        },
        //条件查询获取查询的数量
        getUserInfoNumByCondition:function(){
          let readyData=Qs.stringify({
            inputCondition:this.inputCondition
          });
          this.$axios.put("/api/getUserInfoNumByCondition?"+readyData).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.userAllNum =response.data;
          }).catch(() =>{
            alert("请求数据失败！");    //请求失败返回的数据
          });

        },
        //获取所有用户数据
        getAllUserInfo:function () {
          let readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize
          });
          this.$axios.put("/api/getAllUserInfo?"+readyData).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.tableData = response.data;
            //请求成功返回的数据
          }).catch(() =>{
            alert("请求数据失败！");     //请求失败返回的数据
          })
        },

        //删除选中的用户数据
        deleteUserInfo:function(index,row){
          let userIdSelected = row.userId;
          let readyData=Qs.stringify({
            userId:userIdSelected,
          });
          this.$confirm('删除选中用户数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.put("/api/deleteUserInfoByUserId?"+readyData).then((response) =>{
              if(response.data =="S"){
                this.$message({type: 'success', showClose: true, message: '删除成功!'});
                this.getAllUserInfo();
                this.getUserInfoNum();
              }
            }).catch((error) =>{
              this.$message({type: 'success', showClose: true, message: '删除失败!'});
            })

          }).catch(() => {
            this.$message({type: 'info', showClose: true, message: '已取消删除'});
          });
        },
        //判断角色
        roleStatus:function(row){
          let status = row.roleId;
          let statusW = "用户";
          if(status == 2) {
            statusW = "管理员";
          }
          switch(status) {
            case 1:
              statusW = "用户";
              break;
            case 2:
              statusW = "管理员";
              break;
            default:
              statusW = "用户";
              break;
          }
          return statusW;

        },
        //判断性别
        genderStatus:function (row) {
          let status = row.userGender;
          let statusW = "—";
          switch(status) {
            case 1:
              statusW = "男";
              break;
            case 2:
              statusW = "女";
              break;
            default:
              statusW = "—";
              break;
          }
          return statusW;
        },

        //保存选中的checkbox的值
        saveMultipleSelection:function (val) {
          this.multipleSelection = val;
        },
        //批量删除用户数据
        deletMulUserInfo:function () {
          if(this.multipleSelection.length !=0){
            let mulUserId='';
            for(let i=0;i<this.multipleSelection.length;i++){
              if(i!=this.multipleSelection.length-1){
                mulUserId = mulUserId + this.multipleSelection[i].userId+",";          //多个用户id
              }else {
                mulUserId = mulUserId + this.multipleSelection[i].userId
              }
            }
            let readyData=Qs.stringify({
              userId:mulUserId,
            });
            this.$confirm('删除选中用户数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.put("/api/deleteMulUserInfoByUserId?"+readyData).then((response) =>{
                if(response.data =="S"){
                  this.$message({type: 'success', showClose: true, message: '删除成功!'});
                  this.getAllUserInfo();
                  this.getUserInfoNum();
                }
              }).catch(() =>{
                this.$message({type: 'success', showClose: true, message: '删除失败!'});
              })

            }).catch(() => {
              this.$message({type: 'info', showClose: true, message: '已取消删除'});
            });
          }else {
            this.$message({type: 'info', showClose: true, message: '无选中用户！'});
          }


        },
        //按条件查询用户数据
        searchUserInfoByCondition:function(){

          let readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
            inputCondition:this.inputCondition
          });
          this.$axios.put("/api/getUserInfoByCondition?"+readyData).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.tableData = response.data;
            //请求成功返回的数据
          }).catch(() =>{
            alert("请求数据失败！");    //请求失败返回的数据
          });
          this.getUserInfoNumByCondition();



        },
        //改变页面大小
        handleSizeChange(val) {
          this.pageSize = val;
          if(this.inputCondition != '' && this.inputCondition!= null){
            this.getUserInfoNumByCondition();
            this.searchUserInfoByCondition();
          }else {
            this.getAllUserInfo();
          }


        },
        //改变页码
        handleCurrentChange(val) {
          this.page = val;
          if(this.inputCondition != '' && this.inputCondition!= null){
            this.getUserInfoNumByCondition();
            this.searchUserInfoByCondition();
          }else {
            this.getAllUserInfo();
          }
        },

        //地址级联
        getProvinceInfo:function () {
          this.$axios.put("/api/getProvinceInfo").then((response) =>{          //省
            let _this = this;
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.provinces= response.data;
          })
        },
        getCityInfo:function(val){
          this.$axios.post("/api/getCityInfo?provinceId="+val).then((response) =>{          //市
            let _this = this;
            _this.cities= response.data;
          })
        },
        getCountyInfo:function(val){
          this.$axios.post("/api/getCountyInfo?cityId="+val).then((response) =>{          //区
            let _this = this;
            _this.counties= response.data;
          })
        },
        getTownInfo:function(val){
          this.$axios.post("/api/getTownInfo?countyId="+val).then((response) =>{          //乡
            let _this = this;
            _this.towns= response.data;
          })
        },
        getVillageInfo:function(val){
          this.$axios.post("/api/getVillageInfo?townId="+val).then((response) =>{          //村
            let _this = this;
            _this.villages= response.data;
          })
        },

        //新增或者修改用户信息
        addOrEditUserInfo:function () {
          let userAddress = this.formData.province + "-" + this.formData.city + "-" + this.formData.county + "-" + this.formData.town + "-" + this.formData.village;
          let data =
            'userId=' + this.formData.userId +
            '&userAccount=' + ""+ this.formData.userAccount +
            '&userPassword=' + ""+this.formData.userPassword +
            '&userName=' + ""+this.formData.userName +
            '&roleId=' + this.formData.roleId +
            '&userGender=' + this.formData.userGender +
            '&userIdentityData=' + this.formData.userIdentityData +
            '&userPhone=' + this.formData.userPhone +
            '&userBirth=' + this.formData.userBirth +
            '&userAddress=' + userAddress +
            '&userEmail=' + this.formData.userEmail +
            '&speAdd=' + this.formData.speAdd +
            '&opeType=' + this.opeType;
          this.$axios.post("/api/addOrEditUserInfo?"+data).then((response) =>{
            if(response.data !="F"){
              this.$message({type: 'success', showClose: true, message: '操作成功!'});
              //this.formData = response.data;
              //this.tableData = response.data;
              this.clearData();
              this.getAllUserInfo();
              this.getUserInfoNum();
            }else {
              this.$message({type: 'success', showClose: true, message: '该用户存在后者修改后的号码已经注册！,操作失败！'});
            }
          }).catch(() =>{
            this.$message({type: 'success', showClose: true, message: '操作失败!'});
          })


        },
        //增加用户：修改模态框标题
        addUserInfo:function(){
          this.opeType ="新增用户";
          this.clearData();
          this.formData.roleId = '1';
          this.formData.userGender = '1';
          this.formData.userId=0;
          this.formData.userBirth='1990-01-01';
        },
        //修改用户数据：表格数据放到form中
        editUserInfo:function (index,row) {
          this.clearData();
          this.opeType ="编辑用户";
          this.formData.userId = row.userId;
          this.formData.userAccount = row.userAccount;
          this.formData.userAccount = ""+row.userAccount;
          this.formData.roleId = "" + row.roleId;
          this.formData.userPassword = ""+row.userPassword;
          this.formData.userIdentityData= ""+row.userIdentityData;
          this.formData.userName = row.userName;
          this.formData.userGender = "" + row.userGender;
          this.formData.userPhone = ""+row.userPhone;
          this.formData.userEmail = ""+row.userEmail;
          this.formData.userBirth = row.userBirth;
        },
        //清除表单数据
        clearData:function () {
          this.formData.userAccount = '';
          this.formData.userAccount = '';
          this.formData.roleId = '';
          this.formData.userPassword = '';
          this.formData.userIdentityData= '';
          this.formData.userName = '';
          this.formData.userGender = '';
          this.formData.userPhone = '';
          this.formData.userEmail = '';
          this.formData.userBirth = '';
          this.formData.speAdd = '';
          this.formData.province='';
          this.formData.city='';
          this.formData.county='';
          this.formData.town='';
          this.formData.village='';
        }
      }
    }
</script>

<style scoped>
  #brand {
    display: inline-block;
    width: 20px;
  }
</style>
