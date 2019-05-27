<template>
  <div>
    <el-input placeholder="请输入条件" v-model="inputCondition" clearable style="width: 260px;left: 20px"></el-input>
    <el-button  icon="el-icon-search" style="position:relative;left:40px" @click="getRecipientInfo">搜索</el-button>
    <br><br>
    <el-table :data="recipientTableData" style="width: 100%" height="450"  border  @selection-change="saveMultipleSelection">

      <el-table-column  label="序号" fixed width="100px" >
        <template slot-scope="scope">
             {{scope.$index+1}}
        </template>
      </el-table-column>

      <el-table-column prop="userName" label="姓名" width="200px" :formatter="roleStatus"></el-table-column>
      <el-table-column prop="userIdCard" label="身份证号" width="300px" :formatter="getIdCard"></el-table-column>
      <el-table-column prop="userPhone" label="电话" width="300px"></el-table-column>

      <el-table-column prop="applicationTime" label="申请时间" width="300px"></el-table-column>
      <!--<el-table-column  label="个人照片" width="200" >
        <img :src="img[count]" style="height: 100px;width: 100px"/>
      </el-table-column>-->

      <el-table-column prop="reviewStatus" label="报名状态" width="150px" :formatter="getApplyState"></el-table-column>
      <el-table-column  label="操作" width="150px" fixed="right">
        <template slot-scope="scope">
          <i class="el-icon-delete" v-show="deleteFlag" title="删除" @click="deleterecipient(scope.row)"></i>
          <i class="el-icon-document" title="查看申请材料" @click="lookRecipientInfo(scope.row)" style="position:relative;left: 30px;"></i>
          <i class="el-icon-view" v-show="checkFlag" title="审核材料信息" @click="checkInfo(scope.row,dialogVisibleCheck =true)" style="position:relative;left: 60px;" ></i>
        </template>
      </el-table-column>
    </el-table>
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
      <el-dialog title="审核申请材料信息" center="true" :visible.sync="dialogVisibleCheck" width="40%" :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="checkInfo('审核未过',dialogVisibleCheck = false)">驳 回</el-button>
          <el-button type="warning" @click="checkInfo('已审核',dialogVisibleCheck = false)">通过审核</el-button>
          <el-button type="primary" @click="dialogVisibleCheck = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs';
    export default {
        name: "RecipientTable",
      data(){
          return{
            page:'1',                  //页数
            pageSize:'10',
            allNum:'',
            count:0,
            inputCondition:'',
            tempRecipientId:'',
            dialogVisibleCheck:false,
            deleteFlag:false,
            checkFlag:false,
            img:[],
            recipientTableData:{
              recipientId:'',
              userId:'',
              userName:'',
              userIdCard:'',
              userPhone:'',
              userImgUrl:'',
              applicationTime:'',
              passTime:'',
              startTime:'',
              endTime:'',
              familyStatus:'',        //家庭状况
              provImgUrl:'',         //个人申请书
              selfAccBookImgUrl:'',   //个人户口页
              villageLetterImgUrl:'', //村级证明信
              townProveImgUrl:'',     //乡级证明
              studentListImgUrl:'',   //学籍表
              qrcodeUrl:'',           //二维码
              reviewStatus:'',        //1表示报名 2表示审核成功  3表示审核失败
              delFlag:'',
            }
          }
      },
      created(){
        if(this.$store.state.userId == null || this.$store.state.userId ==''){
          this.recipientTableData ='';
          this.allNum = 0;
        }
        if(this.$store.state.roleId == '2'){
          this.deleteFlag = true;
          this.checkFlag = true;
        }
          this.getRecipientInfo();
          this.getNum();


      },
      methods:{

          //查询申请信息
        getRecipientInfo(){
          let readyData=Qs.stringify({
            userIdStr:this.$store.state.userId,
            page:this.page,
            pageSize:this.pageSize,
            condition:this.inputCondition
          });
          this.$axios.put("/api/queryAllRecipientInfo?"+readyData).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.recipientTableData =response.data;
            /*for(let i =0; i<_this.recipientTableData.length;i++){
              this.img[i] =_this.recipientTableData[i].userImgUrl;
            }*/

            _this.getNum();
          }).catch(() =>{
            //请求失败返回的数据
            this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })
        },
        //获取申请信息数量
        getNum(){
          let readyData=Qs.stringify({
            userIdStr:this.$store.state.userId,
            condition:this.inputCondition
          });
          this.$axios.put("/api/queryAllRecipientInfoNum?"+readyData).then((response) =>{          //这里使用了ES6的语法
            let _this = this;
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.allNum =response.data;
          }).catch(() =>{
            //请求失败返回的数据
            this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
          })
        },
        //改变页面大小
        handleSizeChange(val) {
          this.pageSize = val;
          this.getRecipientInfo();
          this.getNum();


        },
        //改变页码
        handleCurrentChange(val) {
          this.page = val;
          this.getRecipientInfo();
          this.getNum();
        },
        //删除数据
        deleterecipient(rowData){
          let recipientId =rowData.recipientId;
          let readyData=Qs.stringify({
            recipientId:recipientId
          });

          this.$confirm('删除选中数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.put("/api/deleteRecipientInfoByRecipientId?"+readyData).then((response) =>{          //这里使用了ES6的语法
              if(response.data == "1"){
                this.$message({type: 'success', showClose: true, message: '删除数据成功!'});
                this.getRecipientInfo();
              }
            }).catch(() =>{
              //请求失败返回的数据
              this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
            })
          }).catch(() => {
            this.$message({type: 'info', showClose: true, message: '已取消删除'});
          });

        },
        //隐藏身份证
        getIdCard(rowData){
          return rowData.userIdCard.replace(/^(.{3})(?:\d+)(.{4})$/,"$1******$2");
        },
        //隐藏部分电话号码
        getPhone(rowData){
          return rowData.userPhone.replace(/^(.{3})(?:\d+)(.{4})$/,"$1****$2");
        },
        //转换状态
        getApplyState(rowData){
          let stateV ='';
          switch (rowData.reviewStatus){
            case '1':
              stateV = "待审核";
              break;
            case '2':
              stateV = "审核成功";
              break;
            case '3':
              stateV = "审核失败";
              break;
          }
          return stateV;
        },
        //跳转到申请人材料页面
        lookRecipientInfo(rowData){
          let recipientId = rowData.recipientId;
          this.$router.push({
            path: '/LookRecipientInfo',
            query: {
              recipientId:recipientId
            }
          })
        },
        //更新状态
        checkInfo(rowData){
          if(rowData.recipientId != null){

            this.tempRecipientId = rowData.recipientId;
          }else {

            let reviewStatus = 1;
            switch (rowData){
              case '审核未过':
                reviewStatus = 3;
                break;
              case '已审核':
                reviewStatus = 2;
                break;
            }
            let readyData=Qs.stringify({
              recipientId:this.tempRecipientId,
              reviewStatus:reviewStatus,
            });
            this.$axios.put("/api/updateRecipientInfoByRecipientId?"+readyData).then(() =>{
              this.getRecipientInfo();
              this.$message({type: 'success', showClose: true, message: '状态更新成功!'});
            }).catch(() =>{
              //请求失败返回的数据
              this.$message({type: 'success', showClose: true, message: '请求数据失败!'});
            });
          }

        }

      }
    }
</script>

<style scoped>

</style>
