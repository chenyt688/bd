<template>
  <div>
    <img-com></img-com>


    <div>
      <br><br>
      <section id="about" class="section about">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <h3 class="section-title">支教招募信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<a @click="queryMoreActivity">查看更多</a>]</h3>
              <br>
              <p v-for="item in activityList" :key="item.activityId">
                <a @click="getActivityById(item)">[{{item.provinceName}}]【{{item.activityEndTime}}】 {{item.topic}} （{{item.demandNum}}）</a>
                <br><br>
              </p>
            </div>

            <div class="col-sm-6">
              <h3 class="section-title multiple-title">资助信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<a>查看更多</a>]</h3>
              <p></p>


            </div><!-- /.col-sm-6 -->
          </div><!-- /.row -->
        </div><!-- /.container -->
      </section>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
  </div>

</template>

<script>
    import ImgCom from "./ImgCom";
    export default {
      name: "IndexInfo",
      components: {ImgCom},
      data(){
        return{
          activityList:[{
            activityId:'',
            userId:'',               //发起人
            activityAddress:'',
            applicationTime:'',
            passTime:'',
            activityStartTime:'',
            activityEndTime:'',
            topic:'',
            imgUrl:'',
            demandNum:'',
            organizationProfiles:'',
            workContent:'',         //工作内容
            treatmentGain:'',       //收获待遇
            conditions:'',         //报名条件
            contactInfo:'',
            reviewStatus:'',         //审核状态  0表示待审核  1表示已审核 2表示发布 3表示审核不通过
            delFlag:'',
            provinceName:'',
          }],
        }
      },
      created(){
        this.getActivityInfo();
      },
      methods:{
        getActivityInfo(){
          this.$axios.post("/api/queryActivityInfoIndex").then((respones) =>{
            let _this = this;
            _this.activityList = respones.data;
          }).catch(() =>{
            //请求失败返回的数据
            this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
          })
        },
        getActivityById:function (item) {
          let activityId = item.activityId;
          this.$router.push({
            path: '/lookActivityInfo',
            query: {
              activityId:activityId
            }
          })
          //location.reload();
        },
        queryMoreActivity(){
          this.$router.push('/manageActivityPage');
          //location.reload();
        }
      }
    }
</script>

<style scoped>

</style>
