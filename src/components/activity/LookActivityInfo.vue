<template>
<div>
  <br>
  <a style="position: relative;right: -30px" @click="back">返回</a>


  <br><br><br>
  <h3 align="center">【{{activityFormData.provinceName}}】{{activityFormData.topic}}【招募人数】{{activityFormData.demandNum}}人</h3>
  <br>
  <br>
  <h4>组织简介：</h4>
  <br>
  <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{activityFormData.organizationProfiles}}</i>
  <br><br>
  <h4>开始/截止时间：{{activityFormData.activityStartTime}}&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;{{activityFormData.activityEndTime}}</h4>
  <br>
  <h4>支教地点：</h4>
  <br>
  <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{activityFormData.activityAddress}}</i>
  <br><br>
  <h4>工作内容：</h4>
  <br>
  <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{activityFormData.workContent}}</i>
  <br><br>
  <h4>待遇收获：</h4>
  <br>
  <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{activityFormData.treatmentGain}}</i>
  <br><br>
  <h4>报名条件：</h4>
  <br>
  <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{activityFormData.conditions}}</i>
  <br><br>
  <h4>联系方式：</h4>
  <br>
  <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{activityFormData.contactInfo}}</i>
  <br><br><br><br><br>
  <el-button type="primary" style="position:relative;left: 650px;width: 250px" @click="joinActivity">我要报名</el-button>
  <br><br><br><br><br>


</div>
</template>

<script>
    export default {
      name: "LookActivityInfo",
      data(){
        return{
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
            time:'',
            provinceName:''
          }
        }
      },
      created() {
        this.getParams()
      },
      methods: {
        getParams() {
          // 取到路由带过来的参数
          let activityId = this.$route.query.activityId;

          //请求活动信息
          this.$axios.post('/api/queryActivityInfoByActivityId?activityId='+activityId).then((response) =>{
            let _this = this;
            _this.activityFormData = response.data;
          }).catch(() =>{
            this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })
        },
        joinActivity:function () {

          let readyData = 'userId='+this.activityFormData.userId + '&activityId=' +this.activityFormData.activityId;
          if(this.$store.state.userId != null && this.$store.state.userId != ""){     //判断用户是否已经登录
            this.$axios.put("/api/queryParticipantIsExistence?"+readyData).then((response)=>{     //判断是否已经报名
              if(response.data == "S"){     //用户没有报名该活动
                //var _this = this;
                this.$axios.put("/api/insertParticipant?"+readyData).then((response)=>{
                  if(response.data =="S"){
                    this.$message({type: 'success', showClose: true, message: '报名成功!'});
                  }else {
                    this.$message({type: 'warning', showClose: true, message: '活动未审核发布，不能报名!'});
                  }
                }).catch(() =>{
                  //请求失败返回的数据
                  this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
                })
              }else {
                this.$message({type: 'warning', showClose: true, message: '用户已经报名该活动!'});
              }
            }).catch(() =>{
              //请求失败返回的数据
              this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
            })
          }else {
            this.$message({type: 'warning', showClose: true, message: '请先登录!'});
            this.$router.push('/manageActivityPage');
          }

          //alert("adsdjf")

        },
        //返回活动管理界面
        back:function () {
          this.$router.push('/manageActivityPage');
        }
      },
      watch: {
        '$route': 'getParams'
      },
    }

</script>

<style scoped>
  h4{
    left: 30px;
    position: relative;
    color:blue;
  }
  i{
    left: 80px;
  }
  h3{
    color: red;
  }
</style>
