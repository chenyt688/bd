<template>
    <div>
      <page-title :msg="msg" :img-url="imgUrl"></page-title>
      <user-form :formData="formData"></user-form>
      <br>
      <page-title :msg="msg2" :img-url="imgUrl"></page-title>
      <br>
      <resume-form :resumeFormData="resumeFormData" :adjustment="adjustment"></resume-form>

    </div>
</template>

<script>
  import PageTitle from "../common/PageTitle";
  import UserForm from "../user/UserForm";
  import ResumeForm from "../user/ResumeForm";
    export default {
      name: "PersonalInfo",
      components: {PageTitle,UserForm,ResumeForm},
      data(){
        return{
          msg:'个人中心',
          msg2:'个人简历',
          adjustment:'',
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
          resumeFormData:[{
            userId:'',
            userCareer:'',
            educationLevel:'',
            targetSubjectName:'',
            secondSubjectName:'',
            education:'',       //教育经历
            honor:'',
            hobby:'',
            experience:'',
            selfIntroduction:'',
            adjustment:'',         //是否接受调剂
            delFlag:'',
          }]
        }
      },
      created(){
        this.getUserInfoByUserId();
        this.getUserResumeByUserId();
      },
      methods:{
        getUserInfoByUserId:function () {
          this.$axios.post("/api/getUserInfoByUserId").then((response) =>{          //初始用户信息
            let _this = this
            this.formData= response.data;
            this.formData.roleId = '' + this.formData.roleId;
            this.formData.userGender = ''+this.formData.userGender;
            if(this.formData.userBirth ===null){
              this.formData.userBirth='1990-01-01';
            }
            if(this.formData.userGender === '0'){
              this.formData.userGender = '1'
            }
            this.resumeFormData.userId = this.formData.userId;
          })
        },
        getUserResumeByUserId:function () {
          this.$axios.post("/api/getUserResumeByUserId").then((response) =>{        //初始化用户简历
            let _this = this
            _this.resumeFormData= response.data;
            if(_this.resumeFormData.adjustment==1){
              _this.resumeFormData.adjustment =true;
            }else {
              _this.resumeFormData.adjustment =false;
            }

          })
        },
      }
    }
</script>

<style scoped>

</style>
