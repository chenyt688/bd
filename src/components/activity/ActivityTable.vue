<template>
  <div>
    <el-input placeholder="请输入查询条件" v-model="inputCondition" clearable style="width: 260px;left: 20px"></el-input>
    <el-button  icon="el-icon-search" style="position:relative;left:40px" @click="searchByCondition(1)">搜索</el-button>
    <el-button  icon="el-icon-search" style="position:relative;left:40px" @click="searchByCondition(2)">查询个人申请的活动</el-button>
    <br><br>

    <el-table :data="tableData" style="width: 100%" height="400"  border  @selection-change="saveMultipleSelection">
      <el-input prop="activityId"  hidden></el-input>
      <el-input prop="userId"  hidden></el-input>
      <!--<el-table-column type="selection"  fixed width="60px"></el-table-column>-->
      <el-table-column  label="序号" fixed width="60px">
        <template slot-scope="scope">
             {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="topic" label="主题" width="300px" :formatter="roleStatus"></el-table-column>
      <el-table-column prop="demandNum" label="人数需求" width="200px" sortable></el-table-column>
      <el-table-column prop="applicationTime" label="申请时间" width="200px" sortable></el-table-column>
      <el-table-column prop="activityStartTime" label="活动开始时间" width="200" sortable></el-table-column>
      <el-table-column prop="activityEndTime" label="活动截止时间" width="200px" sortable></el-table-column>
      <el-table-column prop="activityAddress" label="活动地址" width="500px"></el-table-column>
      <el-table-column prop="reviewStatus" label="状态" sortable width="100px" :formatter="getActivityState"></el-table-column>
      <el-table-column  label="操作" width="190px" fixed="right">
        <template slot-scope="scope">
          <i class="el-icon-edit" title="编辑" style="position: relative;left: 10px" @click="editActivityInfo(scope.$index, scope.row)"></i>
          <i class="el-icon-delete" title="删除" style="position:relative;left: 20px" @click="confirmDeleteActivityInfo(scope.$index, scope.row)"></i>
          <i class="el-icon-s-custom" title="查看用户信息" style="position: relative;left: 30px" @click="queryUserInfo(scope.$index, scope.row,dialogVisible = true)"></i>
          <i class="el-icon-document" title="查看活动信息" style="position:relative;left: 40px" @click="toActivityInfo(scope.row,dialogVisibleLook =true)"></i>

          <i v-if="scope.row.reviewStatus != 2 && scope.row.reviewStatus !=4 ">
            <i class="el-icon-view" title="审核活动信息" v-if="" v-show="checkIcon" style="position:relative;left: 50px;"  @click="checkActivityInfo(scope.row,0,dialogVisibleCheck = true)"></i>
          </i>
          <i v-if="scope.row.reviewStatus == 2 || scope.row.reviewStatus ==4">
            <i class="el-icon-view" title="审核活动信息" v-if="" v-show="checkIcon" style="position:relative;left: 50px;"  @click="checkActivityInfo1"></i>
          </i>


          <i v-if="scope.row.reviewStatus == 1">
            <i class="el-icon-finished"  title="发布"  v-show="publishIcon" style="position:relative;left: 60px;" @click="publishActivityInfo(scope.row)"></i>
          </i>
          <i v-if="scope.row.reviewStatus != 1">
            <i class="el-icon-finished" title="发布"   v-show="publishIcon" style="position:relative;left: 60px;" @click="publishActivityInfo1(scope.row)"></i>
          </i>


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
    <!--活动报名-->
    <!--<div>
      <el-dialog title="志愿者活动报名" center="true" :visible.sync="dialogVisibleLook" width="100%" :before-close="handleClose">
        <look-activity-info></look-activity-info>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisibleLook = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>-->
  </div>

</template>

<script>
  import Qs from 'qs';
  import ApplyActivity from "./ApplyActivity";
  import LookUserInfo from "./LookUserInfo";
  import EditActivity from "./EditActivity";
  import LookActivityInfo from "./LookActivityInfo";
    export default {
      name: "ActivityTable",
      components: {LookActivityInfo, EditActivity, LookUserInfo, ApplyActivity},
      data(){
        return{
          flag:false,
          flag2:true,
          type:1,
          saveTempActivity:'',
          checkIcon:false,
          publishIcon:false,
          inputCondition:'',
          dialogVisible: false,
          dialogVisibleActiVityToEdit:false,
          dialogVisibleLook:false,
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
        if(this.$store.state.roleId === '2'){    //非管理员不能审核和下发志愿活动
         this.checkIcon = true;
         this.publishIcon = true;
        }

        this.searchByCondition(1);
        this.getActivityCount();

      },
      methods:{
        checkActivityInfo1(){
          this.$message({type: 'warning', showClose: true, message: '活动已发布或者已结束,不能进行操作!'});
        },
        publishActivityInfo1(){
          this.$message({type: 'warning', showClose: true, message: '活动状态非未审核状态，不能进行操作!'});
        },
        //更新状态
        updateActivityState:function(activityId,reviewStatus){
          let readyData=Qs.stringify({
            activityId:activityId,
            reviewStatus:reviewStatus,
          });
          this.$axios.put("/api/updateActivityState?"+readyData).then(() =>{
            this.$message({type: 'success', showClose: true, message: '活动状态更新!'});
            if(this.type ===1 || this.type ===2){
              this.searchByCondition(1);
            }else {
              this.searchByCondition(2);
            }
          }).catch(() =>{
            this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
          });

        },
        publishActivityInfo:function(rowData){
          let activityId = rowData.activityId;
          let reviewStatus = 2;
          this.$confirm('发布选中志愿者活动, 是否继续?', '提示', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
            this.updateActivityState(activityId,reviewStatus);
          }).catch(() => {
            this.$message({type: 'info', showClose: true, message: '已取消发布'});
          });
        },
        checkActivityInfo:function(rowData){
          if(rowData.activityId != null){
            this.saveTempActivity = rowData.activityId;
          }
          let activityId = this.saveTempActivity;
          let reviewStatus = 0;
          if(rowData == "审核未过"){
            reviewStatus = 3;
            this.updateActivityState(activityId,reviewStatus);
          }else if(rowData == "已审核"){
            reviewStatus = 1;
            this.updateActivityState(activityId,reviewStatus);
          }

        },

        closeEdit:function(){
          this.dialogVisibleActiVityToEdit = false;
          if(this.type ===1 || this.type ===2){
            this.searchByCondition(1);
          }else {
            this.searchByCondition(2);
          }

        },
        handleClose(done){
          this.$confirm('确认关闭？').then(_ => {done();}).catch(_ => {});
          if(this.type ===1 || this.type ===2){
            this.searchByCondition(1);
          }else {
            this.searchByCondition(2);
          }
        },



        //获取活动总数
        getActivityCount:function () {

          let readyData=Qs.stringify({
            userIdStr:this.$store.state.userId,
            page:this.page,
            pageSize:this.pageSize,
            inputCondition:this.inputCondition,
            type:this.type,
          });
          this.$axios.put("/api/getActivityNumByCondition?"+readyData).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            _this.allNum = response.data;
          }).catch(() =>{
            //请求失败返回的数据
            this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
          });
        },

        deleteActivity:function(rowData){
          let readyData=Qs.stringify({
            activityId:rowData.activityId,
            userIdStr:this.$store.state.userId
          });
          this.$axios.put("/api/deleteActivityInfoById?"+readyData).then((response) =>{
            if(response.data =='S'){
              this.$message({type: 'success', showClose: true, message: '删除成功!'});
              this.getActivityCount();
              if(this.type ===1 || this.type ===2){
                this.searchByCondition(1);
              }else {
                this.searchByCondition(2);
              }
            }else {
              this.$message({type: 'success', showClose: true, message: '无权限,删除失败!'});
            }

          }).catch(() =>{
            this.$message({type: 'success', showClose: true, message: '删除失败!'});
          })
        },
        //删除活动信息   若一般用户只能删除未审核状态的活动，管理员若删除已发布的活动进行逻辑删除
        confirmDeleteActivityInfo:function(index,rowData){
          let roldId = this.$store.state.roleId;  //登录用户的角色id
          let userIdSaved = this.$store.state.userId; //已经保存的用户id
          let userIdSelect = rowData.userId;      //选中申请活动的用户id
          let activityState = rowData.reviewStatus;
          this.$confirm('删除选中活动数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(roldId == '2'){      //管理员可以直接删除
              this.deleteActivity(rowData);
            }else{                //一般用户只能删除自己申请的未审核的活动
              if(activityState === 0 && userIdSaved == userIdSelect){  //待审核状态可以删除
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
          let flag = rowData.reviewStatus;
          let statusW = "";
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
            case 4:
              statusW = "结束";
              break;
            default:
              statusW = "待审核";
              break;
          }
          return statusW;
        },

        //查看申请活动的用户信息
        queryUserInfo:function(index,rowData){
          let userId = rowData.userId;
          this.$axios.post('/api/getUserInfoByUserIdToActivity?userId='+userId).then((response) =>{
            let _this = this;
            _this.userInfo = response.data;
            if(_this.userInfo.userGender == 1){
              _this.userInfo.userGender = '男'
            }else{
              _this.userInfo.userGender = '女'
            }
            let idCard = _this.userInfo.userIdentityData;
            _this.userInfo.userIdentityData = idCard.replace(/^(.{3})(?:\d+)(.{4})$/,"$1******$2");
          }).catch(() =>{
              this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })
        },

        //编辑活动信息
        editActivityInfo:function(index,rowData){
          let roldId = this.$store.state.roleId;  //登录用户的角色id
          let userIdSaved = this.$store.state.userId; //已经保存的用户id
          let userIdSelect = rowData.userId;      //选中申请活动的用户id
          let activityState = rowData.reviewStatus;
          if(roldId == 2){      //管理员可以直接编辑
            if(rowData.reviewStatus !== 4){   //活动结束不可修改
              this.queryActivityBySelected(rowData);
              this.dialogVisibleActiVityToEdit=true;
            }else {
              this.$message({type: 'warning', showClose: true, message: '该活动已经结束,不能进行修改!'});
            }
          }else{                //一般用户只能编辑自己申请的未审核的活动
            if(activityState == '0' && userIdSaved == userIdSelect){  //待审核状态可以编辑
              this.queryActivityBySelected(rowData);
              this.dialogVisibleActiVityToEdit=true;

            }else {
              this.$message({type: 'success', showClose: true, message: '无权限修改活动!'});
            }
          }


        },

        //查询选中活动的信息
        queryActivityBySelected:function(row){
          let activityId = row.activityId;
          this.$axios.post('/api/queryActivityInfoByActivityId?activityId='+activityId).then((response) =>{
            let _this = this;
            _this.activityFormData = response.data;
          }).catch(() =>{
            this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })
        },

        //跳转到活动信息页面
        toActivityInfo:function(rowData){
          let activityId = rowData.activityId;
          this.$router.push({
            path: '/lookActivityInfo',
            query: {
              activityId:activityId

            }
          })

        },
        //条件查询活动信息
        searchByCondition:function(val){
          if(val === 1){      //搜索
            if(this.inputCondition === null || this.inputCondition === ""){  //输入框无值 查询所有
              this.type =1;
            }else {          //条件查询
              this.type =2;
            }
          }else {   //查看个人申请的活动
            this.type =3;

          }
          if(this.type ===3 && (this.$store.state.userId ==='' || this.$store.state.userId ===null)){
            this.$message({type: 'warning', showClose: true, message: '请登录查看个人申请的支教活动!'});
          }else {
            let readyData=Qs.stringify({
              userIdStr:this.$store.state.userId,
              page:this.page,
              pageSize:this.pageSize,
              inputCondition:this.inputCondition,
              type:this.type,
            });
            this.$axios.put("/api/getActivityInfoByCondition?"+readyData).then((response) =>{          //这里使用了ES6的语法
              let _this = this;
              _this.tableData =response.data;
              this.getActivityCount();
            }).catch(() =>{
              //请求失败返回的数据
              this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
            });
          }

        },

        //改变页面大小
        handleSizeChange(val) {
          this.pageSize = val;
          this.getActivityCount();
          if(this.type===1 || this.type===2){
            this.searchByCondition(1);
          }else {
            this.searchByCondition(2);
          }
        },
        //改变页码
        handleCurrentChange(val) {
          this.page = val;
          this.getActivityCount();
          if(this.type===1 || this.type===2){
            this.searchByCondition(1);
          }else {
            this.searchByCondition(2);
          }

        },
      },
    }
</script>

<style scoped>

</style>
