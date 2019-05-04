<template>
    <div>
      <el-form :model="formData" :inline="true" style="position:relative;left:80px" :disabled="flag">
        <el-form-item label="账号">
          <el-input v-model="formData.userAccount" clearable ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formData.roleId" disabled>
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
        <el-form-item label="电话">
          <el-input v-model="formData.userPhone" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="formData.userBirth" type="date" clearable placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <br>
        <div style="display: none" id="selectDiv">
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
            <el-input clearable v-model="formData.speAdd" style="width: 260px"></el-input>
          </el-form-item>
        </div>
        <div style="display: block" id="showSelect">
          <el-form-item label="地址">
            <el-input clearable v-model="formData.userAddress" style="width: 660px"></el-input>
          </el-form-item>
        </div>
        <br>
      </el-form>
      <div align="center">
        <el-button @click="backStatue" icon="el-icon-s-release" style="position:relative;right: 150px" :disabled="backFlag">取 消</el-button>
        <el-button @click="editInput" icon="el-icon-edit-outline" style="position:relative;right: 70px" :disabled="editFlag">编 辑</el-button>
        <el-button  @click="editUserInfo" icon="el-icon-success" :disabled="subFlag">提 交</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "UserForm",
      props:["formData"],
      data(){
        return{
          flag:true,
          backFlag:true,
          editFlag:false,
          subFlag:true,
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
          }],
          formDataBat:{
            userId:'',
            userAccount:'',
            userPassword:'',
            userName:'',
            roleId:'',
            userGender:'',
            userIdentityData:'',
            userPhone:'',
            userBirth:'',
            userAddress:'',
            userEmail:'',
            province:'',
            city:'',
            county:'',
            town:'',
            village:'',
            speAdd:''
          },
        }
      },created(){
        this.getProvinceInfo();
      },
      methods:{
        //地址级联
        getProvinceInfo:function (val) {
          this.$axios.put("/api/getProvinceInfo").then((response) =>{          //省
            var _this = this
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.provinces= response.data;
          })
        },
        getCityInfo:function(val){
          this.$axios.post("/api/getCityInfo?provinceId="+val).then((response) =>{          //市
            var _this = this
            _this.cities= response.data;
          })
        },
        getCountyInfo:function(val){
          this.$axios.post("/api/getCountyInfo?cityId="+val).then((response) =>{          //区
            var _this = this
            _this.counties= response.data;
          })
        },
        getTownInfo:function(val){
          this.$axios.post("/api/getTownInfo?countyId="+val).then((response) =>{          //乡
            var _this = this
            _this.towns= response.data;
          })
        },
        getVillageInfo:function(val){
          this.$axios.post("/api/getVillageInfo?townId="+val).then((response) =>{          //村
            var _this = this
            _this.villages= response.data;
          })
        },
        editInput:function(){   //编辑
          this.flag =false;
          this.editFlag =true;
          this.backFlag=false;
          this.subFlag=false;
          document.getElementById("selectDiv").style = "display: block";
          document.getElementById("showSelect").style = "display: none";
          this.dataBat();

        },
        backStatue:function(){   //取消
          this.flag =true;
          this.editFlag =false;
          this.backFlag=true;
          this.subFlag=true;
          document.getElementById("selectDiv").style = "display: none";
          document.getElementById("showSelect").style = "display: block";

          this.formData.userAccount= this.formDataBat.userAccount;
          this.formData.userId= this.formDataBat.userId;
          this.formData.userPassword= this.formDataBat.userPassword;
          this.formData.userName= this.formDataBat.userName;
          this.formData.roleId= this.formDataBat.roleId;
          this.formData.userGender= this.formDataBat.userGender;
          this.formData.userIdentityData= this.formDataBat.userIdentityData;
          this.formData.userPhone= this.formDataBat.userPhone;
          this.formData.userBirth= this.formDataBat.userBirth;
          this.formData.userAddress= this.formDataBat.userAddress;
          this.formData.userEmail= this.formDataBat.userEmail;
        },
        //新增或者修改用户信息
        editUserInfo:function () {
          if(this.formData.speAdd == null){
            this.formData.speAdd= " ";
          }
          var userAddress = this.formData.province + "-" + this.formData.city + "-" + this.formData.county + "-" + this.formData.town + "-" + this.formData.village;
          var data =
            'userId=' + this.formData.userId +
            '&userAccount=' + this.formData.userAccount +
            '&userPassword=' + this.formData.userPassword +
            '&userName=' + this.formData.userName +
            '&roleId=' + this.formData.roleId +
            '&userGender=' + this.formData.userGender +
            '&userIdentityData=' + this.formData.userIdentityData +
            '&userPhone=' + this.formData.userPhone +
            '&userBirth=' + this.formData.userBirth +
            '&userAddress=' + userAddress +
            '&userEmail=' + this.formData.userEmail +
            '&speAdd=' + this.formData.speAdd +
            '&opeType=' + '编辑用户';
          this.$axios.post("/api/addOrEditUserInfo?"+data).then((response) =>{
            if(response.data !="F"){
              this.$message({
                type: 'success',
                showClose: true,
                message: '操作成功!'
              });
              location.reload();
            }else {
              this.$message({
                type: 'success',
                showClose: true,
                message: '该用户存在!,操作失败!'
              });
            }
          }).catch((error) =>{
            this.$message({
              type: 'success',
              showClose: true,
              message: '操作失败!'
            });
          })

          //this.flag =true;
        },

        dataBat:function () {       //备份数据
          //this.formDataBat = this.formData;
          this.formDataBat.userId= this.formData.userId;
          this.formDataBat.userAccount= this.formData.userAccount;
          this.formDataBat.userName= this.formData.userName;
          this.formDataBat.roleId= this.formData.roleId;
          this.formDataBat.userPassword= this.formData.userPassword;
          this.formDataBat.userGender= this.formData.userGender;
          this.formDataBat.userIdentityData= this.formData.userIdentityData;
          this.formDataBat.userPhone= this.formData.userPhone;
          this.formDataBat.userBirth= this.formData.userBirth;
          this.formDataBat.userAddress= this.formData.userAddress;
          this.formDataBat.userEmail= this.formData.userEmail;

        }
      }
    }
</script>

<style scoped>

</style>
