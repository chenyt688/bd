<template>
    <div>
      <el-table :data="participantTableData" style="width: 100%" height="450" ref="multipleTable" border  @selection-change="saveMultipleSelection">
        <el-input prop="activityId"  hidden></el-input>
        <el-input prop="userId"  hidden></el-input>
        <el-table-column  label="序号" fixed width="60px">
          <template slot-scope="scope">
               {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="userAccount" label="账号" width="250px" :formatter="roleStatus"></el-table-column>
        <el-table-column prop="provinceName" label="省份" width="150px"></el-table-column>
        <el-table-column prop="applyTime" label="申请时间" width="250px" sortable></el-table-column>
        <el-table-column prop="activityTopic" label="活动主题" width="450" ></el-table-column>
        <el-table-column prop="demandNum" label="人数需求" width="120px" sortable></el-table-column>
        <el-table-column prop="reviewStatus" label="报名状态" width="150px" :formatter="getState" sortable></el-table-column>
        <el-table-column  label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <i class="el-icon-delete" title="删除报名信息"  @click="deleteInfo(scope.row)"></i>
            <i class="el-icon-document" title="用户简历信息" style="position: relative;left: 20px" @click="resumeInfo(scope.row,dialogVisibleResume=true)"></i>
            <i class="el-icon-view" title="审核报名信息" style="position: relative;left: 40px" @click="checkInfo(scope.row,dialogVisibleCheck=true)"></i>
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
      <!--审核活动-->
      <div>
        <el-dialog title="用户简历信息" center="true" :visible.sync="dialogVisibleResume" width="100%" :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          <resume-info :resumeFormData="resumeFormData" :adjustment="adjustment"></resume-info >
          <el-button type="primary" @click="dialogVisibleResume = false">关 闭</el-button>
        </span>
        </el-dialog>
      </div>

      <!--审核活动-->
      <div>
        <el-dialog title="审核报名信息" center="true" :visible.sync="dialogVisibleCheck" width="40%" :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="checkInfo(5,dialogVisibleCheck = false)">驳 回</el-button>
          <el-button type="warning" @click="checkInfo(2,dialogVisibleCheck = false)">通过审核</el-button>
          <el-button type="warning" @click="checkInfo(3,dialogVisibleCheck = false)">上岗中</el-button>
          <el-button type="warning" @click="checkInfo(4,dialogVisibleCheck = false)">支教结束</el-button>
          <el-button type="primary" @click="dialogVisibleCheck = false">关 闭</el-button>
        </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import Qs from 'qs';
  import ResumeForm from "../user/ResumeForm";
  import ResumeInfo from "./ResumeInfo";
    export default {
      name: "ParticipantTable",
      components: {ResumeInfo},
      created(){
        if(this.$store.state.userId == null || this.$store.state.userId ==''){
          this.participantTableData ='';
        }
        this.queryParticipantNum();
        this.queryAllJoinInfo();
      },
      data(){
          return{
            page:'1',                  //页数
            pageSize:'10',
            allNum:'',
            dialogVisibleCheck:false,
            saveUserId:'',
            saveActivityId:'',
            dialogVisibleResume:false,
            adjustment:'',
            participantTableData:[{
              id:'',
              userId:'',
              userAccount:'',
              activityId:'',
              activityTopic:'',
              demandNum:'',
              provinceName:'',
              applyTime:'',
              passTime:'',  //审核时间
              auditor:'',   //审核人
              reviewStatus:'', // 1表示报名 2 表示审核成功 3表示上岗中 4 表示活动结束
            }],
            resumeFormData:[{
              userId:'',
              userCareer:'',
              educationLevel:'',
              targetSubjectName:'',
              secondSubjectName:'',
              education:'',       //教育经历
              honor:'',
              hobby:'',
              experience:'',
              selfIntroduction:'',
              adjustment:'',         //是否接受调剂
              delFlag:'',
            }]
          }
      },
      methods:{
        //获取简历信息
        resumeInfo:function (rowData) {
          let userId  = rowData.userId;
          let readyData=Qs.stringify({
            userId:userId,
          });
          this.$axios.put("/api/getUserResumeInfoByUserId?"+readyData).then((response) =>{        //初始化用户简历
            let _this = this
            _this.resumeFormData= response.data;
            if(_this.resumeFormData.adjustment==1){
              _this.resumeFormData.adjustment =true;
            }else {
              _this.resumeFormData.adjustment =false;
            }
          })
        },
        //查询报名情况
        queryAllJoinInfo(){
          let readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
          });
          this.$axios.put("/api/queryAllJoinInfo?"+readyData).then((response) =>{
            let _this= this;
            _this.participantTableData = response.data;
          }).catch(() =>{
            this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
          })
        },
        //查询数量
        queryParticipantNum(){
          this.$axios.put("/api/queryParticipantNum").then((response) =>{
            let _this= this;
            _this.allNum = response.data;
          }).catch(() =>{
            this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
          })
        },
        getState(row){
          let state = row.reviewStatus;
          // 1表示报名 2 表示审核成功 3表示上岗中 4 表示活动结束
          let stateV = "";
          switch (state){
            case 1:
              stateV = "已报名";
              break;
            case 2:
              stateV = "审核成功";
              break;

            case 3:
              stateV = "上岗中";
              break;
            case 4:
              stateV = "活动结束";
              break;
            case 5:
              stateV = "审核失败";
              break;
          }
          return stateV;
        },
        checkInfo(rowdata){
          if(rowdata.activityId != null){
            this.saveUserId = rowdata.userId;
            this.saveActivityId = rowdata.activityId;
          }else {
            let readyData=Qs.stringify({
              userId:this.saveUserId,
              activityId:this.saveActivityId,
              reviewStatus:rowdata

            });
            this.$axios.put("/api/updateJoinState?"+readyData).then((response) =>{
              let _this= this;
              //_this.participantTableData = response.data;*/
              _this.queryAllJoinInfo();
            }).catch(() =>{
              this.$message({type: 'success', showClose: true, message: '请求数据异常!'});
            })
          }


        },
        deleteInfo(rowData){
          let readyData=Qs.stringify({
            id:rowData.id,
          });

          this.$confirm('删除选中财政数据, 是否继续?', '提示', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          }).then(() => {
            this.$axios.put("/api/deleteById?"+readyData).then((response) =>{
              if(response.data =="1"){
                this.queryParticipantNum();
                this.queryAllJoinInfo();
                this.$message({type: 'success', showClose: true, message: '删除成功!'});

              }else {
                this.$message({type: 'success', showClose: true, message: '无权限,删除失败!'});
              }

            }).catch(() =>{
              this.$message({type: 'success', showClose: true, message: '删除失败!'});
            })
          }).catch(() => {
            this.$message({type: 'info', showClose: true, message: '已取消删除'});
          });


        }


      }
    }
</script>

<style scoped>

</style>
