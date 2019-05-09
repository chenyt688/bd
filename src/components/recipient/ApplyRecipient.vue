<template>
    <div>
      <page-title :msg="msg" :img-url="imgUrl"></page-title>
      <el-form :model="recipientFormData"  :inline="true" style="position:relative;left:80px" :disabled="subFlag">
        <el-form-item label="姓名">
          <el-input v-model="recipientFormData.userName" clearable style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" style="position: relative;left: 80px">
          <el-input v-model="recipientFormData.userIdCard" clearable style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="电话" style="position: relative;left: 160px">
          <el-input v-model="recipientFormData.userPhone" clearable ></el-input>
        </el-form-item>
        <el-form-item label="家庭状况">
          <el-input type="textarea" placeholder="1000字符以内" :rows="10" v-model="recipientFormData.familyStatus" clearable style="width: 1322px" ></el-input>
        </el-form-item>
        <br>

        <el-form-item label="个人照片">
          <upload-img :imgType="imgType1"></upload-img>
        </el-form-item>

        <el-form-item label="个人申请书" style="position: absolute;left: 500px">
          <upload-img :imgType="imgType2"></upload-img>
        </el-form-item>

        <el-form-item label="个人户口页" style="position: absolute;left: 1000px">
          <upload-img :imgType="imgType3"></upload-img>
        </el-form-item>

        <br>
        <el-form-item label="村级证明" style="position: absolute;top:500px">
          <upload-img :imgType="imgType4"></upload-img>
        </el-form-item>


        <el-form-item label="乡级证明" style="position: absolute;left: 500px;top:500px ">
          <upload-img :imgType="imgType5" style="position: relative;left: 12px"></upload-img>
        </el-form-item>

        <el-form-item label="学籍表" style="position: absolute;left: 1000px;top:500px">
          <upload-img :imgType="imgType6" style="position: relative;left: 25px"></upload-img>
        </el-form-item>

        <br>
        <el-form-item label="二维码" style="position: absolute;top:700px">
          <upload-img :imgType="imgType7" style="position: relative;left: 12px"></upload-img>
        </el-form-item>

      </el-form>

      <div align="center" style="position: absolute;left: 600px;top:1050px">
        <el-button @click="backForm" icon="el-icon-s-release" style="position:relative;right: 75px">重 置</el-button>
        <el-button  @click="submitInfo"  icon="el-icon-success" :disabled="subFlag" style="position:relative;right: -75px" >提 交</el-button>
        <br><br><br><br><br><br>
      </div>


    </div>
</template>

<script>
  import Qs from 'qs';
    import PageTitle from "../common/PageTitle";
    import UploadImg from "../common/UploadImg";
    export default {
      name: "ApplyRecipient",
      components: {UploadImg, PageTitle},
      data(){
        return{
          msg:'申请资助',
          imgType1:'个人照片',
          imgType2:'个人申请书',
          imgType3:'个人户口页',
          imgType4:'村级证明',
          imgType5:'乡级证明',
          imgType6:'学籍表',
          imgType7:'二维码',
          subFlag:true,
          recipientFormData:{
            recipientId:'',
            userId:'',
            userName:'',
            userIdCard:'',
            userPhone:'',
            userImgUrl:'',
            applicationTime:'',
            passTime:'',
            startTime:'',
            endTime:'',
            familyStatus:'',        //家庭状况
            proveImgUrl:'',          //个人申请书
            selfAccBookImgUrl:'',   //个人户口页
            villageLetterImgUrl:'', //村级证明信
            townProveImgUrl:'',     //乡级证明
            studentListImgUrl:'',   //学籍表
            qrcodeUrl:'',           //二维码
            reviewStatus:'',
            delFlag:'',
          },

        }
      },
      created(){
        if(this.$store.state.userId != null && this.$store.state.userId != ""){
          this.subFlag = false;
        }
      },
      methods: {
        submitInfo:function () {
          this.$confirm('提交申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let readyData=Qs.stringify({
              userName:this.recipientFormData.userName,
              userIdCard:this.recipientFormData.userIdCard,
              userPhone:this.recipientFormData.userPhone,
              familyStatus:this.recipientFormData.familyStatus,
            });
            this.$axios.put("/api/inserRecipientInfo?"+readyData).then((response) =>{
              if(response.data =="S"){
                this.$message({type: 'success', showClose: true, message: '提交成功!'});
              }else{
                this.$message({type: 'success', showClose: true, message: '用户已经申请!提交失败!'});
              }
            }).catch(() =>{
              this.$message({type: 'success', showClose: true, message: '提交失败!'});
            })
          }).catch(() => {
            this.$message({type: 'info', showClose: true, message: '已取消提交'});
          });
        },
        backForm(){
          this.recipientFormData.userName ='';
          this.recipientFormData.userIdCard ='';
          this.recipientFormData.userPhone ='';
          this.recipientFormData.familyStatus ='';
        }


      }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
