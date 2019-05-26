<template>
  <div>
    <el-form :model="resumeFormData" :inline="true"  style="position:relative;left:80px" :disabled="flag">
      <el-form-item label="ID" style="display: none">
        <el-input v-model="resumeFormData.userId" clearable ></el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="resumeFormData.userCareer" clearable ></el-input>
      </el-form-item>
      <el-form-item label="学历">
        <el-input v-model="resumeFormData.educationLevel" clearable ></el-input>
      </el-form-item>
      <el-form-item label="主科目">
        <el-input v-model="resumeFormData.targetSubjectName" clearable ></el-input>
      </el-form-item>
      <el-form-item label="副科目">
        <el-input v-model="resumeFormData.secondSubjectName" clearable ></el-input>
      </el-form-item>
      <el-form-item label="是否接受调剂">
        <el-switch v-model="resumeFormData.adjustment" active-color="#13ce66" inactive-color="#ff4949" >
        </el-switch>
      </el-form-item>
      <br>
      <el-form-item label="教育经历">
        <el-input type="textarea" :rows="7" v-model="resumeFormData.education" clearable style="width: 1200px"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="所获荣誉">
        <el-input v-model="resumeFormData.honor" type="textarea" clearable :rows="3" style="width: 1200px"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="工作经历">
        <el-input v-model="resumeFormData.experience" type="textarea" clearable :rows="7" style="width: 1200px"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="自我介绍">
        <el-input v-model="resumeFormData.selfIntroduction" type="textarea" clearable :rows="7" style="width: 1200px"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="个人爱好">
        <el-input v-model="resumeFormData.hobby" type="textarea" clearable style="width: 1200px;" :rows="3"></el-input>
      </el-form-item>
      <br><br>


    </el-form>
    <div align="center">
      <el-button @click="backStatue" icon="el-icon-s-release" style="position:relative;right: 150px" :disabled="backFlag">取 消</el-button>
      <el-button @click="editForm" icon="el-icon-edit-outline" style="position:relative;right: 70px" :disabled="editFlag">编 辑</el-button>
      <el-button  @click="insertOrEditUserResume" icon="el-icon-success" :disabled="subFlag">提 交</el-button>

    </div>
    <br><br><br><br>
  </div>


</template>

<script>
    export default {
      name: "ResumeForm",
      props:["resumeFormData",],
      data(){
        return{
          flag:true,
          backFlag:true,
          editFlag:false,
          subFlag:true,
          resumeFormDataBat:[{
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
      methods: {
        insertOrEditUserResume:function () {
          let adjustment = 0;
          if(this.resumeFormData.adjustment == true){
            adjustment = 1;
          }
          let data =
            'userId=' + this.resumeFormData.userId +
            '&userCareer=' + this.resumeFormData.userCareer +
            '&educationLevel=' + this.resumeFormData.educationLevel +
            '&targetSubjectName=' + this.resumeFormData.targetSubjectName +
            '&secondSubjectName=' + this.resumeFormData.secondSubjectName +
            '&education=' + this.resumeFormData.education +
            '&honor=' + this.resumeFormData.honor +
            '&hobby=' + this.resumeFormData.hobby +
            '&experience=' + this.resumeFormData.experience +
            '&selfIntroduction=' + this.resumeFormData.selfIntroduction +
            '&adjustment=' + adjustment;
          this.$axios.post("/api/insertOrEditUserResume?"+data).then((response) =>{
            if(response.data =="1"){
              this.$message({type: 'success', showClose: true, message: '操作成功!'});
            }
          }).catch(() =>{
            this.$message({type: 'warning', showClose: true, message: '请登录操作!'});
          })
        },
        backStatue:function () {      //取消编辑
          this.flag =true;
          this.editFlag =false;
          this.backFlag=true;
          this.subFlag=true;

          //还原数据
          this.resumeFormData.userId = this.resumeFormDataBat.userId;
          this.resumeFormData.userCareer =  this.resumeFormDataBat.userCareer;
          this.resumeFormData.educationLevel = this.resumeFormDataBat.educationLevel;
          this.resumeFormData.targetSubjectName = this.resumeFormDataBat.targetSubjectName;
          this.resumeFormData.secondSubjectName = this.resumeFormDataBat.secondSubjectName;
          this.resumeFormData.education = this.resumeFormDataBat.education;
          this.resumeFormData.honor = this.resumeFormDataBat.honor;
          this.resumeFormData.hobby = this.resumeFormDataBat.hobby;
          this.resumeFormData.experience = this.resumeFormDataBat.experience;
          this.resumeFormData.selfIntroduction = this.resumeFormDataBat.selfIntroduction;
          this.resumeFormData.adjustment = this.resumeFormDataBat.adjustment;
        },
        editForm:function () {       //编辑
          this.flag =false;
          this.editFlag =true;
          this.backFlag=false;
          this.subFlag=false;
          //备份数据
          this.resumeFormDataBat.userId = this.resumeFormData.userId;
          this.resumeFormDataBat.userCareer= this.resumeFormData.userCareer;
          this.resumeFormDataBat.educationLevel= this.resumeFormData.educationLevel;
          this.resumeFormDataBat.targetSubjectName= this.resumeFormData.targetSubjectName;
          this.resumeFormDataBat.secondSubjectName= this.resumeFormData.secondSubjectName;
          this.resumeFormDataBat.education= this.resumeFormData.education;
          this.resumeFormDataBat.honor= this.resumeFormData.honor;
          this.resumeFormDataBat.hobby= this.resumeFormData.hobby;
          this.resumeFormDataBat.experience= this.resumeFormData.experience;
          this.resumeFormDataBat.selfIntroduction= this.resumeFormData.selfIntroduction;
          this.resumeFormDataBat.adjustment = this.resumeFormData.adjustment;


        }
      }

    }
</script>

<style scoped>

</style>
