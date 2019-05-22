<template>
    <div>
      <page-title :msg="msg"></page-title>
      <br><br>
      <div v-show="sucesss" v-for="j in joinState">
        <div v-if="j.state + 1 != 6">
          <h4 style="top:30px;position: relative;left: 10px">{{j.activityTopic}}</h4>
          <el-steps :active="j.state + 1" finish-status="success" style="width: 60%;left: 300px;position: relative">
            <el-step title="未报名"></el-step>
            <el-step title="已报名"></el-step>
            <el-step title="审核成功"></el-step>
            <el-step title="上岗中"></el-step>
            <el-step title="活动结束"></el-step>
          </el-steps>
        </div>
        <div v-show="faild" v-if="j.state + 1 == 6">
          <h4 style="top:30px;position: relative;left: 10px">{{j.activityTopic}}</h4>
          <el-steps :active="3" finish-status="success" style="width: 60%;left: 300px;position: relative">
            <el-step title="未报名"></el-step>
            <el-step title="已报名"></el-step>
            <el-step title="审核失败"></el-step>
          </el-steps>
        </div>
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
            faild:true,
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
              if(response.data == 'F'){
                this.joinState = [{state:0,activityTopic:'暂无报名数据'}];
              }else {
                _this.joinState = response.data;
              }

            }).catch(() =>{
              //请求失败返回的数据
              this.$message({type: 'warning', showClose: true, message: '暂无报名数据!'});
            })
          }else {
            this.$message({type: 'warning', showClose: true, message: '请登录查询!'});
            this.joinState = [{state:0,activityTopic:''}];

          }
        }
      },
    }
</script>

<style scoped>

</style>
