<template>
  <div>
    <page-title :msg="msg"></page-title>

    <div>
      <div>
        <i class="col-sm-2">用户账号</i><i class="col-sm-2">日记时间</i><i class="col-sm-2">天气</i><i class="col-sm-4">主题</i><i class="col-sm-2">查看日记内容</i>
      </div>
      <p v-for="item in diaryList" :key="item.diaryId">
        <br><br>
        <i class="col-sm-2">{{item.userAccount}}</i>
        <i class="col-sm-2">{{item.diaryTime}}</i>
        <i class="col-sm-2">{{item.weather}}</i>
        <i class="col-sm-4">{{item.diaryTopic}}</i>
        <i class="col-sm-2"><a @click="lookDiary(item.diaryContent,dialogVisibleDiary=true)">查看日记内容</a></i>
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
    </template>
    <div>
      <div>
        <el-dialog title="日记正文" center="true" :visible.sync="dialogVisibleDiary" width="60%" :before-close="close">
          <br>
            <el-input v-model="diaryContentInfo" type="textarea" placeholder="1000字符以内"  clearable :rows="10" style="width: 100%"></el-input>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close">关 闭</el-button>
        </span>
        </el-dialog>
      </div>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>


  <!--查看日志内容-->

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
          dialogVisibleDiary:false,
          diaryContentInfo:' ',
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
        close:function(){
          this.dialogVisibleDiary = false;
        },
        //获取发布的日记
        getPublishDiary(){
          let readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
          });
          this.$axios.put("/api/queryPublishDiary?"+readyData).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            _this.diaryList =response.data;
          }).catch(() =>{
            //请求失败返回的数据
            this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
          })
        },
        getPublishDiaryNum(){
          this.$axios.post("/api/queryPublishDiaryNum").then((response) =>{
            let _this = this;
            _this.allNum = response.data;
          }).catch(() =>{
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
        lookDiary(val){
          this.diaryContentInfo = val;
        }
      }
    }
</script>

<style scoped>
  i{
    font-size: 20px;
  }
</style>
