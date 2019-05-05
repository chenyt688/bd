<template>
  <div>
    <page-title :msg="msg"></page-title>

    <div>
      <div>
        <i class="col-sm-2">用户账号</i><i class="col-sm-2">日记时间</i><i class="col-sm-2">天气</i><i class="col-sm-4">主题</i><i class="col-sm-2">查看日记内容</i>
      </div>
      <p v-for="item in diaryList" :key="item.diaryId">
        <br><br>
        <i class="col-sm-2">{{item.userAccount}}</i><i class="col-sm-2">{{item.diaryTime}}</i><i class="col-sm-2">{{item.weather}}</i><i class="col-sm-4">{{item.diaryTopic}}</i><i class="col-sm-2"><a @click="lookDiary(item.diaryContent)">查看日记内容</a></i>
      </p>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br>
    <!--分页-->
    <template>
      <div class="block" style="left: 20px;position: relative;">
        <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange"
                       :current-page="1"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="allNum">
        </el-pagination>
      </div>
    </template><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
  import Qs from 'qs';
    import PageTitle from "../common/PageTitle";
    export default {
      name: "LookDiaryInfo",
      components: {PageTitle},
      data(){
        return{
          msg:'日记分享',
          page:'1',                  //页数
          pageSize:'10',
          allNum:'',
          diaryList:[{
            diaryId:'',
            userId:'',
            userAccount:'',
            userName:'',
            diaryTime:'',
            weekday:'',
            diaryAddress:'',
            weather:'',
            diaryTopic:'',
            diaryContent:'',
            diaryShow:'',
            delFlag:'',
          }],
        }
      },
      created(){
        this.getPublishDiary();
        this.getPublishDiaryNum();
      },
      methods:{
        //获取发布的日记
        getPublishDiary(){
          var readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
          });
          this.$axios.put("/api/queryPublishDiary?"+readyData).then((response) =>{          //这里使用了ES6的语法
            var _this = this
            _this.diaryList =response.data;
          }).catch((error) =>{
            //请求失败返回的数据
            this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
          })
        },
        getPublishDiaryNum(){
          this.$axios.post("/api/queryPublishDiaryNum").then((response) =>{
            var _this = this;
            _this.allNum = response.data;
          }).catch((error) =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          })
        },
        //改变页面大小
        handleSizeChange(val) {
          this.pageSize = val;
          this.getPublishDiary();
        },
        //改变页码
        handleCurrentChange(val) {
          this.page = val;
          this.getPublishDiary();

        },
        getDiaryInfo(val){

        }
      }
    }
</script>

<style scoped>
  i{
    font-size: 20px;
  }
</style>
