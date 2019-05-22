<template>
    <div style="background-color: #6b9cab">
      <br>
      <a style="margin-left: 60px;font-size: 20px;color: black" @click="back">返回</a>
      <br><br>
      <div style="width: 90%">
        <h3 style="position: relative;left: 100px"><label>姓名:</label><span>{{this.recipientData.userName}}</span>
          <span style="left: 300px;position: relative"><label>电话号码:</label>{{this.recipientData.userPhone}}</span>
          <span style="left: 450px;position: relative"><label>身份证号:</label>{{this.recipientData.userIdCard}}</span>
        </h3>
        <br>
        <h3><label style="left: 100px;position: relative;width: 100%">家庭状况:</label><span style="left: 100px;position: relative">{{this.recipientData.familyStatus}}</span></h3>
      </div>
      <br><br><br>
      <label style="font-size: 20px;margin-left: 100px">个人照片:</label><img :class="{'active':isChoose1}" :src="this.recipientData.userImgUrl" @click="changeSize(1)"/>
      <label style="font-size: 20px;margin-left: 100px">个人申请书:</label><img :class="{'active':isChoose2}" :src="this.recipientData.proveImgUrl" @click="changeSize(2)"/>
      <label style="font-size: 20px;margin-left: 100px">个人户口页:</label><img :class="{'active':isChoose3}" style=" margin-left: 10px;" :src="this.recipientData.selfAccBookImgUrl" @click="changeSize(3)"/>
      <br><br><br>
      <label style="font-size: 20px;margin-left: 100px">村级证明:</label><img :class="{'active':isChoose4}" style=" margin-left: 30px;" :src="this.recipientData.villageLetterImgUrl" @click="changeSize(4)"/>
      <label style="font-size: 20px;margin-left: 100px">乡级证明:</label><img :class="{'active':isChoose5}" style=" margin-left: 50px;" :src="this.recipientData.townProveImgUrl" @click="changeSize(5)"/>
      <label style="font-size: 20px;margin-left: 110px">学籍表:</label><img :class="{'active':isChoose6}" style=" margin-left: 40px;" :src="this.recipientData.studentListImgUrl" @click="changeSize(6)"/>
      <br><br><br>
      <label style="font-size: 20px;margin-left: 100px">二维码:</label><img :class="{'active':isChoose7}" style=" margin-left: 50px;" :src="this.recipientData.qrcodeUrl" @click="changeSize(7)"/>
      <br><br><br><br><br>
    </div>
</template>

<script>
  import Qs from 'qs';
    export default {
        name: "LookRecipientInfo",
      data(){
          return{
            isChoose1:false,
            isChoose2:false,
            isChoose3:false,
            isChoose4:false,
            isChoose5:false,
            isChoose6:false,
            isChoose7:false,
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
        changeSize(val){
          switch (val){
            case 1:this.isChoose1 = !this.isChoose1;
              this.isChoose2=false;
              this.isChoose3=false;
              this.isChoose4=false;
              this.isChoose5=false;
              this.isChoose6=false;
              this.isChoose7=false;
            break;
            case 2:this.isChoose2 = !this.isChoose2;
              this.isChoose1=false;
              this.isChoose3=false;
              this.isChoose4=false;
              this.isChoose5=false;
              this.isChoose6=false;
              this.isChoose7=false;
              break;
            case 3:this.isChoose3 = !this.isChoose3;
              this.isChoose1=false;
              this.isChoose2=false;
              this.isChoose4=false;
              this.isChoose5=false;
              this.isChoose6=false;
              this.isChoose7=false;
              break;
            case 4:this.isChoose4 = !this.isChoose4;
              this.isChoose1=false;
              this.isChoose2=false;
              this.isChoose3=false;
              this.isChoose5=false;
              this.isChoose6=false;
              this.isChoose7=false;
              break;
            case 5:this.isChoose5 = !this.isChoose5;
              this.isChoose1=false;
              this.isChoose2=false;
              this.isChoose3=false;
              this.isChoose4=false;
              this.isChoose6=false;
              this.isChoose7=false;
              break;
            case 6:this.isChoose6 = !this.isChoose6;
              this.isChoose1=false;
              this.isChoose2=false;
              this.isChoose3=false;
              this.isChoose4=false;
              this.isChoose5=false;
              this.isChoose7=false;
              break;

            case 7:this.isChoose7 = !this.isChoose7;
              this.isChoose1=false;
              this.isChoose2=false;
              this.isChoose3=false;
              this.isChoose4=false;
              this.isChoose5=false;
              this.isChoose6=false;
              break;
          }

        },
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
    width: 180px;
    height: 200px;
    margin-left: 30px;
  }
  i{
    position: relative;
    color: #0da3e2;
  }
  img.active {
    transform: scale(3);          /*图片需要放大3倍*/
              /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
    z-index: 100;
    position: absolute;



  }
</style>
