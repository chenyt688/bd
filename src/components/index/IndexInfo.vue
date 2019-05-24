<template>
  <div>
    <img-com></img-com>


    <div>
      <br><br>
      <section id="about" class="section about">
        <div class="container">
          <div class="row" >
            <div class="col-sm-6">
              <h3 class="titletext" style="color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;支教招募信息<a @click="queryMoreActivity" style="color:#FFFFFF;font-size: 15px;margin-left: 300px">查看更多  -></a></h3>
              <br>
              <ul v-for="item in activityList" :key="item.activityId">
                <li style="margin-top: 8px;"> <em>o</em><a @click="getActivityById(item)" >[{{item.provinceName}}]【{{item.activityEndTime}}】 {{item.topic}} （{{item.demandNum}}人）</a></li>
              </ul>
            </div>
            <div class="col-sm-6"style="left: 100px">
              <h3 class="titletext" style="color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;财务监督<a @click="queryMoreFinance"style="color:#FFFFFF;font-size: 15px;margin-left: 350px">查看更多  -></a></h3>
              <br>
              <ul v-for="item in financeTableData" :key="item.financeId">
                <li style="margin-top: 8px"><em>o</em><a>[{{item.userName}}]【{{item.financeTime}}】 {{item.financeAbout}} （￥{{item.financeAmount}}）</a></li>
              </ul>

            </div><!-- /.col-sm-6 -->

          </div><!-- /.row -->
        </div><!-- /.container -->
      </section>
      <br><br>
      <div class="section-title">
        <li>—————    &nbsp;&nbsp;&nbsp;&nbsp;友情链接&nbsp;&nbsp;&nbsp;&nbsp;    —————</li>
       </div>
      <div style="margin: auto">
        <a href="https://greencode.aliyun.com" style="color:#888;margin-left: 550px">码上公益</a>
        <a href="http://www.cta613.org/" style="color:#888;margin-left: 60px">中华支教与助学信息中心</a>
        <a href="http://www.go9999.com" style="color:#888;margin-left: 60px">支教联盟</a>
      </div>
      <br><br><br>
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
  .titletext {
    background-color: #3679e5;
    border-radius: 3px;
  }
  a{
    font-size: 17px;
    margin-left: 10px;
    color: black;
  }
  em {
    float: right;
    padding-left: 5px;
    color: black;
  }
  em{
    font-style: normal;
  }
  .section-title {
    display: block;
    overflow: hidden;
    text-align: center;
    margin-bottom: 60px;
    font-size: 18px;
    color: #434A4E;
  }
  *:after {
    box-sizing: border-box;
  }
  *:after {
    box-sizing: border-box;
  }
</style>
