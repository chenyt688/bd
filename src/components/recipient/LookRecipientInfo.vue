<template>
    <div style="width: 80%">
      <br>
      <a style="position: relative;right: -30px" @click="back">返回</a>
      <br><br>
      <br><br>
      <h3 style="position: relative;left: 100px"><i>姓名:</i><span>{{this.recipientData.userName}}</span>
        <span style="left: 300px;position: relative"><i>电话号码:</i>{{this.recipientData.userPhone}}</span>
        <span style="left: 450px;position: relative"><i>身份证号:</i>{{this.recipientData.userIdCard}}</span>
      </h3>
      <br>
      <i style="font-size: 20px;position:relative;left: 100px">个人照片:</i><img :src="this.recipientData.userImgUrl"/>
      <br><br><br><br>
      <h3><i style="left: 100px;position: relative">家庭状况:</i><span style="left: 100px;position: relative">{{this.recipientData.familyStatus}}</span></h3>
      <br><br><br><br>
      <i style="font-size: 20px;position:relative;left: 100px">个人申请书:</i><img :src="this.recipientData.proveImgUrl"/>
      <br>
      <br><br><br><br>
      <i style="font-size: 20px;position:relative;left: 100px">个人户口页:</i><img :src="this.recipientData.selfAccBookImgUrl"/>
      <br>
      <br><br><br><br>
      <i style="font-size: 20px;position:relative;left: 100px">村级证明:</i><img :src="this.recipientData.villageLetterImgUrl"/>
      <br><br><br><br>
      <br>
      <i style="font-size: 20px;position:relative;left: 100px">乡级证明:</i><img :src="this.recipientData.townProveImgUrl"/>
      <br><br><br><br>
      <br>
      <i style="font-size: 20px;position:relative;left: 100px">学籍表:</i><img :src="this.recipientData.studentListImgUrl"/>
      <br>
      <br><br><br><br>
      <i style="font-size: 20px;position:relative;left: 100px">二维码:</i><img :src="this.recipientData.qrcodeUrl"/>
      <br><br><br><br><br><br><br><br><br>

    </div>
</template>

<script>
  import Qs from 'qs';
    export default {
        name: "LookRecipientInfo",
      data(){
          return{
            recipientData:{
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
              proveImgUrl:'',         //个人申请书
              selfAccBookImgUrl:'',   //个人户口页
              villageLetterImgUrl:'', //村级证明信
              townProveImgUrl:'',     //乡级证明
              studentListImgUrl:'',   //学籍表
              qrcodeUrl:'',           //二维码
              reviewStatus:'',        //1表示报名 2表示审核成功  3表示审核失败
              delFlag:'',
            }
          }
      },
      created() {
        this.getParams();
      },
      methods:{
        getParams(){
          // 取到路由带过来的参数
          let recipientId = this.$route.query.recipientId;
          let readyData=Qs.stringify({
            recipientId:recipientId,
          });
          this.$axios.put("/api/queryRecipientInfoByRecipientId?"+readyData).then((response) =>{
           let _this = this;
           _this.recipientData = response.data;
            _this.recipientData.userIdCard = _this.recipientData.userIdCard.replace(/^(.{3})(?:\d+)(.{4})$/,"$1******$2")
          }).catch(() =>{
            //请求失败返回的数据
            this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })
        },
        back(){
          this.$router.push('/manageRecipentPage');
        }
      }
    }
</script>

<style scoped>
  img{
    width: 400px;
    height: 300px;
    position: relative;
    left: 400px;
  }
  i{
    position: relative;
    color: #0da3e2;

  }
</style>
