<template>
    <div>
      <page-title :msg="msg"></page-title>

      <br><br>
      <div v-show="sucesss">
        <h4 style="top:30px;position: relative;left: 10px">【{{this.joinState.activityTopic}}】</h4>
        <el-steps :active="active" finish-status="success" style="width: 60%;left: 300px;position: relative">
          <el-step title="未报名"></el-step>
          <el-step title="已报名"></el-step>
          <el-step title="审核成功"></el-step>
          <el-step title="上岗中"></el-step>
          <el-step title="活动结束"></el-step>
        </el-steps>
      </div>
      <div v-show="faild">
        <h4 style="top:30px;position: relative;left: 10px">【{{this.joinState.activityTopic}}】</h4>
        <el-steps :active="active" finish-status="success" style="width: 60%;left: 300px;position: relative">
          <el-step title="未报名"></el-step>
          <el-step title="已报名"></el-step>
          <el-step title="审核失败"></el-step>
        </el-steps>
      </div>

    </div>
</template>

<script>
    import PageTitle from "../common/PageTitle";
    export default {
      name: "RegistrationProgress",
      components: {PageTitle},
      data(){
          return{
            msg:'报名进度',
            active: 1,
            sucesss:true,
            faild:false,
            joinState:{
              state:'',
              activityTopic:''
            }
          }
      },
      created(){
        this.getState()
      },
      methods:{
        getState:function () {
          if(this.$store.state.userId != null && this.$store.state.userId != ""){
            this.$axios.post("/api/queryJoinByUserId").then((response) =>{
              let _this = this;
              _this.joinState = response.data;
              _this.active = _this.joinState.state + 1;
              if(_this.active == 6){    //审核失败
                _this.active == 3;
                this.sucesss = false;
                this.faild = true;
              }
            }).catch(() =>{
              //请求失败返回的数据
              this.$message({type: 'warning', showClose: true, message: '暂无报名数据!'});
            })
          }else {
            this.$message({type: 'warning', showClose: true, message: '请登录查询!'});
          }
        }
      },
    }
</script>

<style scoped>

</style>
