<template>
  <div>
    <el-input placeholder="请输入查询条件" v-model="inputCondition" clearable style="width: 260px;left: 20px"></el-input>
    <el-button  icon="el-icon-search" style="position:relative;left:40px" @click="searchDiaryByCondition" :disabled="serchFlag">搜索</el-button>
    <el-button  icon="el-icon-plus" style="position:relative;left:40px" @click="dialogVisibleDiaryAdd = true" v-show="addShow">新增</el-button>

    <br><br>

    <el-table :data="diaryTableData" style="width: 100%" height="400"  border >
      <el-input prop="diaryId"  hidden></el-input>
      <el-input prop="userId"  hidden></el-input>
      <el-table-column  label="序号" fixed width="60px">
        <template slot-scope="scope">
             {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="userAccount" label="用户账号" width="200px" :formatter="roleStatus"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="200px" :formatter="roleStatus"></el-table-column>
      <el-table-column prop="diaryTopic" label="主题" width="400px"></el-table-column>
      <el-table-column prop="diaryTime" label="日记时间" width="200px" sortable></el-table-column>
      <el-table-column prop="weather" label="天气" width="200px"></el-table-column>
      <el-table-column prop="diaryShow" label="状态" width="160px" :formatter="getState"></el-table-column>
      <el-table-column  label="操作" width="100px" fixed="right">
        <template slot-scope="scope">
          <i class="el-icon-edit" title="编辑"  @click="openEditDiaryInfo(scope.row)"></i>
          <i class="el-icon-delete" title="删除" style="position:relative;left: 20px" @click="deleteDiaryInfo(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <br>
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


    <!--新增日志-->
    <div>
      <el-dialog title="新增日记" center="true" :visible.sync="dialogVisibleDiaryAdd" width="80%" :before-close="handleClose">
        <br>
        <add-diary :diary-table-data="addDiaryData"></add-diary>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeAdd" style="left: -50px;position: relative">关 闭</el-button>
          <el-button type="warning" @click="saveDiary" style="left: 50px;position: relative">保 存</el-button>
        </span>
      </el-dialog>
    </div>

    <!--修改日志-->
    <div>
      <el-dialog title="修改日记" center="true" :visible.sync="dialogVisibleDiaryEdit" width="80%" :before-close="handleClose">
        <br>
        <add-diary :diary-table-data="addDiaryData"></add-diary>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeAdd" style="left: -50px;position: relative">关 闭</el-button>
          <el-button type="warning" @click="saveEditDiary" style="left: 50px;position: relative">修 改</el-button>
        </span>
      </el-dialog>
    </div>
  </div>



</template>

<script>
  import Qs from 'qs';
    import AddDiary from "./AddDiary";
    export default {
        name: "DiaryTable",
      components: {AddDiary},
      data(){
          return{
            serchFlag:true,
            inputCondition:'',
            addShow:false,
            page:'1',                  //页数
            pageSize:'10',
            allNum:'',
            diaryShow:'',
            dialogVisibleDiaryAdd:false,
            dialogVisibleDiaryEdit:false,
            diaryTableData:[{
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
            addDiaryData:{
              diaryId:'',
              diaryTime:'',
              weather:'',
              diaryTopic:'',
              diaryContent:'',
              diaryShow:'',

            }
          }
      },
      created(){
        if(this.diaryTableData.diaryId == null){
          this.diaryTableData=''
        }
        if(this.$store.state.userId != null && this.$store.state.userId != ""){     //用户非登录状态不可以写日记
          this.addShow = true;
          this.serchFlag=false;
          this.queryDiaryNum();
        }else {
          this.allNum = 0;
        }

        this.queryDiaryTableDataInfo();
      },
      methods:{
        //改变页面大小
        handleSizeChange(val) {
          this.pageSize = val;
          if(this.inputCondition != null && this.inputCondition != ""){
            this.searchDiaryByCondition();
          }else {
            this.queryDiaryTableDataInfo();
            this.queryDiaryNum();
          }

        },
        //改变页码
        handleCurrentChange(val) {
          this.page = val;
          if(this.inputCondition != null && this.inputCondition != ""){
            this.searchDiaryByCondition();
          }else {
            this.queryDiaryTableDataInfo();
            this.queryDiaryNum();
          }


        },
        //条件查询
        searchDiaryByCondition:function(){
          let readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
            inputCondition:this.inputCondition
          });
          this.$axios.put("/api/queryAllDiaryByCondition?"+readyData).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            _this.diaryTableData =response.data;
          }).catch(() =>{
            //请求失败返回的数据
            this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
          })

        },
        closeAdd:function(){
          this.dialogVisibleDiaryAdd = false;
          this.dialogVisibleDiaryEdit=false;
          this.addDiaryData.diaryId="";
          this.addDiaryData.diaryTopic="";
          this.addDiaryData.weather="";
          this.addDiaryData.diaryTime="";
          this.addDiaryData.diaryContent="";
        },
        //打开将要修改日记
        openEditDiaryInfo:function(rowData){
          let diaryUserId = rowData.userId;
          let logingUserId = this.$store.state.userId;
          if(diaryUserId == logingUserId){             //日记只有本人可以修改
            let diaryId = rowData.diaryId;
            this.$axios.post("/api/queryDiaryByDiaryId?diaryId="+diaryId).then((response) =>{     //根具diaryid查询
              let _this = this;
              _this.addDiaryData = response.data;
              if(_this.addDiaryData.diaryShow == 0){
                _this.addDiaryData.diaryShow = false;
              }else {
                _this.addDiaryData.diaryShow = true;
              }
              this.dialogVisibleDiaryEdit=true;
            }).catch(() =>{
              this.$message({type: 'danger', showClose: true, message: '请求异常!'});
            })
          }else {
            this.$message({type: 'warning', showClose: true, message: '无权限修改!  用户本人才有权限!'});
          }

        },
        //保存修改后的日志信息
        saveEditDiary:function(){
          let isShow = 0;
          let userId = this.$store.state.userId;
          if(this.addDiaryData.diaryShow == true){
            isShow = 1;
          }
          let diaryData ={
            userId:userId,
            diaryId:this.addDiaryData.diaryId,
            diaryTopic:this.addDiaryData.diaryTopic,
            weather:this.addDiaryData.weather,
            diaryTime:this.addDiaryData.diaryTime,
            diaryContent:this.addDiaryData.diaryContent,
            diaryShow:isShow,
          };
          if(this.$store.state.userId != "" && this.$store.state.userId != null){
            this.$axios.put("/api/updateDiaryByDiaryId",diaryData).then((response) =>{
              if(response.data =="1"){
                this.$message({type: 'success', showClose: true, message: '修改成功!'});
                this.closeAdd();
                this.queryDiaryTableDataInfo();
              }else {
                this.$message({type: 'warning', showClose: true, message: '修改失败!'
                });
              }
            }).catch(() =>{
              this.$message({type: 'danger', showClose: true, message: '请求异常!'});
            })
          }else {
            this.$message({type: 'warning', showClose: true, message: '请先登录!'});
          }
        },
        //查询日记数量
        queryDiaryNum:function(){
          this.$axios.post("/api/queryDiaryNum").then((response) =>{
            let _this = this;
            _this.allNum = response.data;
          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          })
        },
        //删除日记信息
        deleteDiaryInfo:function(rowData){
          let diaryId = rowData.diaryId;
          this.$confirm('删除选中日记数据, 是否继续?', '提示', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          }).then(() => {
            this.$axios.post("/api/deleteDiaryInfo?diaryId="+diaryId).then((response) =>{
              if(response.data == "1"){
                this.$message({type: 'success', showClose: true, message: '删除成功!'});
                this.queryDiaryTableDataInfo();
                this.queryDiaryNum();
              }else {
                this.$message({type: 'danger', showClose: true, message: '删除失败!'});
              }

            }).catch(() =>{
              this.$message({type: 'danger', showClose: true, message: '请求异常!'});
            })
          }).catch(() => {
            this.$message({type: 'info', showClose: true, message: '已取消删除'});
          });


        },
        //转换表格中的数据
        getState:function(row){
          let flag = row.diaryShow;
          let stateV = "";
          switch (flag) {
            case 0:
              stateV = "自己可见";
              break;
            case 1:
              stateV = "他人可见";
              break;
          }
          return stateV;
        },

      //查询日记信息
        queryDiaryTableDataInfo:function(){
          let readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
          });
          if(this.$store.state.userId != "" && this.$store.state.userId != null){     //登陆状态可以管理日记信息
            this.$axios.put("/api/queryDiaryInfo?" +readyData).then((response) =>{
              let _this = this;
              _this.diaryTableData = response.data;
            }).catch(() =>{
              this.$message({type: 'danger', showClose: true, message: '请求异常!'});
            })
          }else{
            this.$message({type: 'warning', showClose: true, message: '如需日记管理，请先登录!'});
          }

        },
        //新增日志信息
        saveDiary(){
          let isShow = 0;
          let userId = this.$store.state.userId;
          if(this.addDiaryData.diaryShow == true){
            isShow = 1;
          }
          let diaryData ={
            userId:userId,
            diaryId:this.addDiaryData.diaryId,
            diaryTopic:this.addDiaryData.diaryTopic,
            weather:this.addDiaryData.weather,
            diaryTime:this.addDiaryData.diaryTime,
            diaryContent:this.addDiaryData.diaryContent,
            diaryShow:isShow,
          };

          if(this.$store.state.userId != "" && this.$store.state.userId != null){
            this.$axios.post("/api/insertDiary",diaryData).then((response) =>{
              if(response.data =="1"){
                this.$message({type: 'success', showClose: true, message: '保存成功!'});
                this.closeAdd();
                this.queryDiaryTableDataInfo();
                this.queryDiaryNum();
              }else {
                this.$message({type: 'warning', showClose: true, message: '保存失败!'
                });
              }
            }).catch(() =>{
              this.$message({type: 'danger', showClose: true, message: '请求异常!'});
            })
          }else {
            this.$message({type: 'warning', showClose: true, message: '请先登录!'});
          }


        },
      }
    }
</script>

<style scoped>

</style>
