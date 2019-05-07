<template>
    <div>
      <br>
      <a style="position: relative;right: -30px" @click="back">返回</a>
      <p></p>
    </div>
</template>

<script>
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
              provImgUrl:'',         //个人申请书
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

</style>
