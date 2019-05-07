<template>
  <div>
    <el-form :model="activityFormData"  :inline="true" style="position:relative;left:80px" :disabled="flag">
      <el-form-item label="主题">
        <el-input v-model="activityFormData.topic" clearable style="width: 507px"></el-input>
      </el-form-item>
      <el-form-item label="人数需求">
        <el-input v-model="activityFormData.demandNum" clearable ></el-input>
      </el-form-item>

      <el-form-item label="报名开始/截至时间">
        <during-time :during-time="activityFormData"></during-time>
      </el-form-item>

      <br>
      <el-form-item label="地址">
        <el-input v-model="activityFormData.activityAddress" style="width: 1000px" clearable ></el-input>
      </el-form-item>

      <el-form-item label="组织简介">
        <el-input type="textarea" placeholder="1000字符以内" :rows="7" v-model="activityFormData.organizationProfiles" clearable style="width: 1322px" ></el-input>
      </el-form-item>
      <br>
      <el-form-item label="工作内容">
        <el-input v-model="activityFormData.workContent" placeholder="1000字符以内" type="textarea" clearable :rows="7" style="width: 1322px"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="收获待遇">
        <el-input v-model="activityFormData.treatmentGain" placeholder="1000字符以内" type="textarea" clearable :rows="7" style="width: 1322px"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="报名条件">
        <el-input v-model="activityFormData.conditions" placeholder="1000字符以内" type="textarea" clearable :rows="7" style="width: 1322px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="activityFormData.contactInfo" placeholder="1000字符以内" type="textarea" clearable :rows="3" style="width: 1322px"></el-input>
      </el-form-item>
      <br>

    </el-form>
    <div align="center">
      <el-button @click="backForm" icon="el-icon-s-release" style="position:relative;right: 150px" :disabled="backFlag">重 置</el-button>
      <el-button @click="editForm" icon="el-icon-edit-outline" style="position:relative;right: 70px" :disabled="editFlag">编 辑</el-button>
      <el-button  @click="submitForm" icon="el-icon-success" :disabled="subFlag">提 交</el-button>

    </div>
    <br><br><br>
  </div>
</template>

<script>
  import AddressSelect from '../common/AddressSelect';
  import DuringTime from '../common/DuringTime';
  import PageTitle from "../common/PageTitle";
  export default {
    name: "EditActivity",
    props:["activityFormData"],
    components: {AddressSelect,PageTitle,DuringTime},
    data(){
      return{
        flag:true,
        backFlag:true,
        editFlag:false,
        subFlag:true,

      }
    },
    created(){

    },
    methods:{
      editForm:function () {
        this.flag=false;
        this.subFlag=false;
        this.backFlag=false
      },
      backForm:function () {
        //this.flag=true;
        //this.subFlag=true;
        //this.activityFormData = "";
        this.activityFormData.time="";
        this.activityFormData.topic="";
        this.activityFormData.demandNum="";
        this.activityFormData.organizationProfiles="";
        this.activityFormData.workContent="";
        this.activityFormData.treatmentGain="";
        this.activityFormData.conditions="";
        this.activityFormData.contactInfo="";

      },
      submitForm:function () {
        let time = this.activityFormData.time;    //开始时间和截至时间数组
        let data = {
          activityId:this.activityFormData.activityId,
          userId:this.activityFormData.userId,
          activityAddress:this.activityFormData.activityAddress,
          applicationTime:this.activityFormData.applicationTime,
          passTime:this.activityFormData.passTime,
          activityStartTime:time[0],         //time值包括开始和截至时间
          activityEndTime:time[1],
          topic:this.activityFormData.topic,
          imgUrl:this.activityFormData.imgUrl,
          demandNum:this.activityFormData.demandNum,
          organizationProfiles:this.activityFormData.organizationProfiles,
          workContent:this.activityFormData.workContent,
          treatmentGain:this.activityFormData.treatmentGain,
          conditions:this.activityFormData.conditions,
          contactInfo:this.activityFormData.contactInfo,
          reviewStatus:this.activityFormData.reviewStatus,
          delFlag:this.activityFormData.delFlag,
          provinceName:this.activityFormData.provinceName,
        };

        this.$axios.post("/api/editActivityInfoById",data).then((response) =>{
          if(response.data =="S"){
            this.$message({type: 'success', showClose: true, message: '修改成功!'
            });
          }else {
            this.$message({type: 'success', showClose: true, message: '修改失败!'
            });
          }
        }).catch(() =>{
          this.$message({type: 'success', showClose: true, message: '操作失败!'
          });
        })

      }

    }
  }

</script>

<style scoped>

</style>
