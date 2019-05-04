<template>
  <div>
    <el-input placeholder="请输入查询条件" v-model="inputCondition" clearable style="width: 260px;left: 20px"></el-input>
    <el-button  icon="el-icon-search" style="position:relative;left:40px" @click="searchByCondition()">搜索</el-button>
    <el-button  icon="el-icon-search" style="position:relative;left:40px" @click="searchByCondition('personal')">查询个人申请的活动</el-button>
    <br><br>

    <el-table :data="tableData" style="width: 100%" height="400" ref="multipleTable" border  @selection-change="saveMultipleSelection">
      <el-input prop="activityId"  hidden></el-input>
      <el-input prop="userId"  hidden></el-input>
      <!--<el-table-column type="selection"  fixed width="60px"></el-table-column>-->
      <el-table-column  label="序号" fixed width="60px">
        <template slot-scope="scope">
             {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="topic" label="主题" width="300px" :formatter="roleStatus"></el-table-column>
      <el-table-column prop="demandNum" label="人数需求" width="200px"></el-table-column>
      <el-table-column prop="applicationTime" label="申请时间" width="200px"></el-table-column>
      <el-table-column prop="activityStartTime" label="活动开始时间" width="200" ></el-table-column>
      <el-table-column prop="activityEndTime" label="活动截止时间" width="200px"></el-table-column>
      <el-table-column prop="activityAddress" label="活动地址" width="500px"></el-table-column>
      <el-table-column prop="reviewStatus" label="状态" width="100px" :formatter="getActivityState"></el-table-column>
      <el-table-column  label="操作" width="190px" fixed="right">
        <template slot-scope="scope">
          <i class="el-icon-edit" title="编辑" style="position: relative;left: 10px" @click="editActivityInfo(scope.$index, scope.row)"></i>
          <i class="el-icon-delete" title="删除" style="position:relative;left: 20px" @click="confirmDeleteActivityInfo(scope.$index, scope.row)"></i>
          <i class="el-icon-s-custom" title="查看用户信息" style="position: relative;left: 30px" @click="queryUserInfo(scope.$index, scope.row,dialogVisible = true)"></i>
          <i class="el-icon-document" title="查看活动信息" style="position:relative;left: 40px" @click="queryActivityInfo(scope.$index, scope.row,dialogVisibleActiVity=true)"></i>
          <i class="el-icon-view" title="审核活动信息"  v-show="checkIcon" style="position:relative;left: 50px;"  @click="checkActivityInfo(scope.row,0,dialogVisibleCheck = true)"></i>
          <i class="el-icon-finished" title="发布"  v-show="publishIcon" style="position:relative;left: 60px;" @click="publishActivityInfo(scope.row)"></i>

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
    <div>
      <el-dialog title="申请活动用户信息" center="true" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
        <look-user-info :form-data="userInfo"></look-user-info>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>

    <!--编辑活动信息-->
    <div>
      <el-dialog title="修改志愿者活动信息" center="true" :visible.sync="dialogVisibleActiVityToEdit" width="100%" :before-close="handleClose">
        <br>
        <edit-activity :activityFormData="activityFormData"></edit-activity>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeEdit">关 闭</el-button>
        </span>
      </el-dialog>
    </div>

    <!--审核活动-->
    <div>
      <el-dialog title="审核志愿者活动信息" center="true" :visible.sync="dialogVisibleCheck" width="40%" :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="checkActivityInfo('审核未过',dialogVisibleCheck = false)">驳 回</el-button>
          <el-button type="warning" @click="checkActivityInfo('已审核',dialogVisibleCheck = false)">通过审核</el-button>
          <el-button type="primary" @click="dialogVisibleCheck = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import Qs from 'qs';
  import ApplyActivity from "./ApplyActivity";
  import LookUserInfo from "./LookUserInfo";
  import EditActivity from "./EditActivity";
    export default {
      name: "ActivityTable",
      components: {EditActivity, LookUserInfo, ApplyActivity},
      data(){
        return{
          saveTempActivity:'',
          checkIcon:false,
          publishIcon:false,
          inputCondition:'',
          dialogVisible: false,
          dialogVisibleActiVityToEdit:false,
          dialogVisibleCheck:false,
          hiddenFlag:'hidden',
          page:'1',                  //页数
          pageSize:'10',
          allNum:'',
          tableData:[{
            activityId:'',
            userId:'',
            activityAddress:'',
            topic:'',
            demandNum:'',
            organizationProfiles:'',
            workContent:'',
            treatmentGain:'',
            conditions:'',
            contactInfo:'',

          }],
          userInfo:{
            userName:'',
            userGender:'',
            userIdentityData:'',
            userPhone:'',
            userEmail:'',
            userBirth:'',
            userAddress:'',
          },
          activityFormData:{
            activityId:'',
            userId:'',
            activityAddress:'',
            applicationTime:'',
            passTime:'',
            activityStartTime:'',
            activityEndTime:'',
            topic:'',
            imgUrl:'',
            demandNum:'',
            organizationProfiles:'',
            workContent:'',
            treatmentGain:'',
            conditions:'',
            contactInfo:'',
            reviewStatus:'',
            delFlag:'',
            time:'',
            provinceName:''
          }

        }
      },
      created(){
        if(this.tableData.activityId == null){
          this.tableData=''
        }

        if(this.$store.state.roleId == '2'){    //非管理员不能审核和下发志愿活动
         this.checkIcon = true;
         this.publishIcon = true;
        }

        this.getActivityCount();
        this.getAllActivityInfo();

      },
      methods:{

        //更新状态
        updateActivityState:function(activityId,reviewStatus){
          var readyData=Qs.stringify({
            activityId:activityId,
            reviewStatus:reviewStatus,
          });
          this.$axios.put("/api/updateActivityState?"+readyData).then((response) =>{
            this.$message({type: 'success', showClose: true, message: '活动状态更新!'});
          }).catch((error) =>{
            this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
          })
          this.getAllActivityInfo();
        },
        publishActivityInfo:function(rowData){
          var activityId = rowData.activityId;
          var reviewStatus = 2;
          this.$confirm('发布选中志愿者活动, 是否继续?', '提示', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
            this.updateActivityState(activityId,reviewStatus);
          }).catch(() => {
            this.$message({type: 'info', showClose: true, message: '已取消发布'});
          });
        },
        checkActivityInfo:function(rowData,val){
          if(rowData.activityId != null){
            this.saveTempActivity = rowData.activityId;
          }
          var activityId = this.saveTempActivity;
          var reviewStatus = 0;
          if(rowData == "审核未过"){
            reviewStatus = 3;
            this.updateActivityState(activityId,reviewStatus);
          }else if(rowData == "已审核"){
            reviewStatus = 1;
            this.updateActivityState(activityId,reviewStatus);
          }

        },

        closeEdit:function(){
          this.dialogVisibleActiVityToEdit = false
          this.getAllActivityInfo();
        },
        handleClose(done){
          this.$confirm('确认关闭？').then(_ => {done();}).catch(_ => {});
          this.getAllActivityInfo();
        },
        //管理员获取所有的活动信息
        getAllActivityInfo:function () {
          var readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
          });
          this.$axios.put("/api/queryAllActivityInfo?"+readyData).then((response) =>{
            var _this= this;
            _this.tableData = response.data;
          }).catch((error) =>{
            this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
          })
        },
        //获取登录用户申请志愿者活动的数量
        queryActivityNumByUserLoging:function(){
          this.$axios.post("/api/queryActivityNumByUserLoging").then((response) =>{
            var _this= this;
            _this.allNum = response.data;
          }).catch((error) =>{
            this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
          })
        },

        //获取活动总数
        getActivityCount:function () {
          var input = this.inputCondition;
          if(this.$store.state.roleId != null && this.$store.state.roleId == '2'){
            if(input == 'personal'){
              this.queryActivityNumByUserLoging();
            }else {
              this.$axios.post("/api/getActivityAccount").then((response) =>{
                var _this= this;
                _this.allNum = response.data;
              }).catch((error) =>{
                this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
              })
            }

          }else {     //获取发布活动的数量
            if(input == 'personal'){
              this.queryActivityNumByUserLoging();
            }else {
              this.$axios.post("/api/getActivityAccountPublished").then((response) =>{
                var _this= this;
                _this.allNum = response.data;
              }).catch((error) =>{
                this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
              })
            }
          }

        },

        deleteActivity:function(rowData){
          var readyData=Qs.stringify({
            activityId:rowData.activityId,
          });
          this.$axios.put("/api/deleteActivityInfoById?"+readyData).then((response) =>{
            if(response.data =="S"){
              this.$message({type: 'success', showClose: true, message: '删除成功!'});
              this.getActivityCount();
              this.getAllActivityInfo();
            }
          }).catch((error) =>{
            this.$message({type: 'success', showClose: true, message: '删除失败!'
            });
          })
        },
        //删除活动信息   若一般用户只能删除未审核状态的活动，管理员若删除已发布的活动进行逻辑删除
        confirmDeleteActivityInfo:function(index,rowData){
          var roldId = this.$store.state.roleId;  //登录用户的角色id
          var userIdSaved = this.$store.state.userId; //已经保存的用户id
          var userIdSelect = rowData.userId;      //选中申请活动的用户id
          var activityState = rowData.reviewStatus;
          this.$confirm('删除选中活动数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(roldId == 2){      //管理员可以直接删除
              this.deleteActivity(rowData);
            }else{                //一般用户只能删除自己申请的未审核的活动
              if(activityState == 0 && userIdSaved == userIdSelect){  //待审核状态可以删除
                this.deleteActivity(rowData);
              }else {
                this.$message({type: 'success', showClose: true, message: '无权限删除!'});
              }
            }
          }).catch(() => {
            this.$message({type: 'info', showClose: true, message: '已取消删除'});
          });

        },
        //将状态转换为相应的值
        getActivityState:function(rowData){
          var flag = rowData.reviewStatus;
          var statusW = "";
          switch(flag) {
            case 1:
              statusW = "已审核";
              break;
            case 2:
              statusW = "已发布";
              break;
            case 3:
              statusW = "审核未过";
              break;
            default:
              statusW = "待审核";
              break;
          }
          return statusW;
        },

        //查看申请活动的用户信息
        queryUserInfo:function(index,rowData){

          var userId = rowData.userId;
          this.$axios.post('/api/getUserInfoByUserIdToActivity?userId='+userId).then((response) =>{
            var _this = this;
            _this.userInfo = response.data;
            if(_this.userInfo.userGender == 1){
              _this.userInfo.userGender = '男'
            }else{
              _this.userInfo.userGender = '女'
            }
            var idCard = _this.userInfo.userIdentityData;
            _this.userInfo.userIdentityData = idCard.replace(/^(.{3})(?:\d+)(.{4})$/,"$1******$2");
          }).catch((error) =>{
              this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })
        },

        //编辑活动信息
        editActivityInfo:function(index,rowData){

          var roldId = this.$store.state.roleId;  //登录用户的角色id
          var userIdSaved = this.$store.state.userId; //已经保存的用户id
          var userIdSelect = rowData.userId;      //选中申请活动的用户id
          var activityState = rowData.reviewStatus;

          if(roldId == 2){      //管理员可以直接编辑
            this.queryActivityBySelected(rowData);
            this.dialogVisibleActiVityToEdit=true;

          }else{                //一般用户只能编辑自己申请的未审核的活动
            if(activityState == 0 && userIdSaved == userIdSelect){  //待审核状态可以编辑
              this.queryActivityBySelected(rowData);
              this.dialogVisibleActiVityToEdit=true;

            }else {
              this.$message({type: 'success', showClose: true, message: '无权限修改活动!'});
            }
          }


        },

        //查询选中活动的信息
        queryActivityBySelected:function(row){
          var activityId = row.activityId;
          this.$axios.post('/api/queryActivityInfoByActivityId?activityId='+activityId).then((response) =>{
            var _this = this;
            _this.activityFormData = response.data;
            //alert(_this.activityFormData.activityAddress)
          }).catch((error) =>{
            this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })
        },

        //条件查询活动信息
        searchByCondition:function(val){

          if(val != null){      //查询个人申办的志愿者活动  val ='personal'
            this.inputCondition = val;
          }
          var readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
            inputCondition:this.inputCondition
          });
          this.$axios.put("/api/getActivityInfoByCondition?"+readyData).then((response) =>{          //这里使用了ES6的语法
            var _this = this
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.tableData =response.data;
          }).catch((error) =>{
            //请求失败返回的数据
            this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })

          this.getActivityCount();
        },

        //改变页面大小
        handleSizeChange(val) {
          this.pageSize = val;

          if(this.inputCondition != '' && this.inputCondition!= null){
            this.searchByCondition();
          }else {
            this.getAllActivityInfo();
          }
        },
        //改变页码
        handleCurrentChange(val) {
          this.page = val;
          if(this.inputCondition != '' && this.inputCondition!= null){
            this.searchByCondition();
          }else {
            this.getAllActivityInfo();
          }
        },
      },
    }
</script>

<style scoped>

</style>
