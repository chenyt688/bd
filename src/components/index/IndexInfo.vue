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
                <a @click="getActivityById(item)">[{{item.provinceName}}]【{{item.activityEndTime}}】 {{item.topic}} （{{item.demandNum}}人）</a>
                <br><br>
              </p>
            </div>

            <div class="col-sm-6">
              <h3 class="section-title multiple-title">财务监督&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<a @click="queryMoreFinance">查看更多</a>]</h3>
              <br>
              <p v-for="item in financeTableData" :key="item.financeId">
                <a>[{{item.userName}}]【{{item.financeTime}}】 {{item.financeAbout}} （￥{{item.financeAmount}}）</a>
                <br><br>
              </p>


            </div><!-- /.col-sm-6 -->
          </div><!-- /.row -->
        </div><!-- /.container -->
      </section>
      <br><br><br><br><br><br><br><br>
    </div>
  </div>

</template>

<script>
  import Qs from 'qs';
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
          financeTableData:{
            financeId:'',
            financeType:'', //收入  支出
            financeTime:'',
            financeAbout:'',  //财务用途
            financeChannel:'', //财务渠道
            financeAmount:'', //金额额度
            userName:'',
          }
        }
      },
      created(){
        this.getActivityInfo();
        this.getFinanceInfo();
      },
      methods:{
        getFinanceInfo(){
          let readyData=Qs.stringify({
            page:1,
            pageSize:15,
          });
          this.$axios.put("/api/queryFinanceInfo?" +readyData).then((response) =>{
            let _this = this;
            _this.financeTableData = response.data;
          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          });
        },
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
        },
        queryMoreActivity(){
          this.$router.push('/manageActivityPage');
        },
        queryMoreFinance(){
          this.$router.push('/manageFinancePage');
        }
      }
    }
</script>

<style scoped>

</style>
