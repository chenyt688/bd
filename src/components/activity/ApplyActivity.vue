<template>
  <div>
    <page-title :msg="msg" :img-url="imgUrl"></page-title>
    <el-form :model="activityFormData" :inline="true" style="position:relative;left:80px" :disabled="flag">
      <el-form-item label="主题">
        <el-input v-model="activityFormData.topic" clearable  style="width: 507px"></el-input>
      </el-form-item>
      <el-form-item label="人数需求">
        <el-input v-model="activityFormData.demandNum" clearable @change="judgeIsNum($event)"></el-input>
      </el-form-item>
      <el-form-item label="报名开始/截至时间">
        <during-time :during-time="activityFormData"></during-time>
      </el-form-item>

        <br>
      <!--地址组件-->
      <address-select :form-data="activityFormData"></address-select>

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
      name: "ApplyActivity",
      components: {AddressSelect,PageTitle,DuringTime},
      data(){
        return{
          flag:true,
          backFlag:true,
          editFlag:false,
          subFlag:true,
          msg:'申请支教活动',
          activityFormData:{
            activityId:'',
            userId:'',
            activityAddress:'',
            applicationTime:'',
            passTime:'',
            activityStartTime:'',
            activityEndTime:'',
            topic:'',
            imgUrl:'',
            demandNum:'',
            organizationProfiles:'',
            workContent:'',
            treatmentGain:'',
            conditions:'',
            contactInfo:'',
            reviewStatus:'',
            delFlag:'',
            province:'',
            city:'',
            county:'',
            town:'',
            village:'',
            speAdd:'',
            time:'',
            provinceName:''
          },

        }
      },

      methods:{
        judgeIsNum(e){
          if(isNaN(e)){
            this.$message({type: 'warning', showClose: true, message: '输入非数字，请重新输入!'});
            this.activityFormData.demandNum='';
          }
        },
        judgeIsNull(){
          let msg = '';

          if(this.activityFormData.topic==''){
            msg = msg + '主题不能为空!  ';
          }
          if(this.activityFormData.demandNum==''){
            msg = msg + '人数需求不能为空!  ';
          }
          if(this.activityFormData.time==''){
            msg = msg + '支教活动时间不能为空!  ';
          }
          if(this.activityFormData.organizationProfiles==''){
            msg = msg + '组织介绍不能为空!  ';
          }
          if(this.activityFormData.workContent==''){
            msg = msg + '工作内容不能为空!  ';
          }
          if(this.activityFormData.treatmentGain==''){
            msg = msg + '收获待遇不能为空!  ';
          }
          if(this.activityFormData.conditions==''){
            msg = msg + '报名条件不能为空!  ';
          }
          if(this.activityFormData.contactInfo==''){
            msg = msg + '联系方式不能为空!  ';
          }
          if(this.activityFormData.province=='' ||this.activityFormData.speAdd==''){
            msg = msg + '省和详细地址不能为空!  ';
          }
          return msg;

        },
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
          this.activityFormData.province="";
          this.activityFormData.city="";
          this.activityFormData.county="";
          this.activityFormData.town="";
          this.activityFormData.village="";
          this.activityFormData.topic="";
          this.activityFormData.demandNum="";
          this.activityFormData.organizationProfiles="";
          this.activityFormData.workContent="";
          this.activityFormData.treatmentGain="";
          this.activityFormData.conditions="";
          this.activityFormData.contactInfo="";

        },
        submitForm:function () {
          let msg = this.judgeIsNull();
          if(this.$store.state.userId ===''||this.$store.state.userId === null){
            this.$message({type: 'warning', showClose: true, message: '请登录申请!'});
          }else {
            if(msg == ''){
              let userAddress = this.activityFormData.province + "-" + this.activityFormData.city + "-"
                + this.activityFormData.county + "-" + this.activityFormData.town + "-"
                + this.activityFormData.village + ":" + this.activityFormData.speAdd;
              //alert(userAddress)
              let time = this.activityFormData.time;    //开始时间和截至时间数组
              let data = {
                activityId:this.activityFormData.activityId,
                userId:this.$store.state.userId,
                activityAddress:userAddress,
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
              //alert(data.activityAddress)
              //var data = 'activityAddress=' + userAddress;

              this.$axios.post("/api/addActivityInfo",data).then((response) =>{
                if(response.data =="S"){
                  this.$message({type: 'success', showClose: true, message: '保存成功!'});
                }else {
                  this.$message({type: 'warning', showClose: true, message: '用户未登陆!  保存失败!'});
                }
              }).catch(() =>{
                this.$message({type: 'warning', showClose: true, message: '操作失败!'});
              })
            }else {
              this.$message({type: 'warning', showClose: true, message: msg});
            }
          }



        }

      }
    }
</script>

<style scoped>

</style>
