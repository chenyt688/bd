<template>
<div>
  <el-input placeholder="请输入条件" v-model="inputCondition" clearable style="width: 260px;left: 20px"></el-input>
  <el-button  icon="el-icon-search" style="position:relative;left:40px" @click="getFinanceInfo">搜索</el-button>
  <el-button  icon="el-icon-plus" style="position:relative;left:40px" @click="dialogVisibleFinanceAdd = true" v-show="addFlag">新增</el-button>
  <br><br>
  <el-table :data="financeTableData" style="width: 100%" height="450"  border  @selection-change="saveMultipleSelection">
    <el-input prop="financeId"  hidden></el-input>
    <el-table-column  label="序号" fixed width="60px">
      <template slot-scope="scope">
           {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column prop="userName" label="捐款人" width="150px" ></el-table-column>
    <el-table-column prop="financeType" label="支出/收入" width="100px" ></el-table-column>
    <el-table-column prop="financeTime" label="捐款时间" width="200px" ></el-table-column>
    <el-table-column prop="financeAbout" label="财务用途" width="500" > </el-table-column>
    <el-table-column prop="financeChannel" label="捐款渠道" width="200px" ></el-table-column>
    <el-table-column prop="financeAmount" label="捐款额度" width="200px" :formatter="getNewFinanceAmount"></el-table-column>
    <el-table-column  label="操作" width="100px" fixed="right" >
      <template slot-scope="scope">
        <i  v-show="showFlag" >无操作权限</i>
        <i class="el-icon-edit" title="修改" v-show="editFlag" @click="putInfo(scope.row,dialogVisibleFinanceEdit=true)" ></i>
        <i class="el-icon-delete" title="删除" v-show="deleteFlag" @click="deleteFinance(scope.row)" style="position:relative;left: 30px;"></i>
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


  <!--新增-->
  <div>
    <el-dialog title="新增财务记录" center="true" :visible.sync="dialogVisibleFinanceAdd" width="80%" :before-close="handleClose">
      <br>
      <add-finance :financeTableData="financeTableData"></add-finance>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisibleFinanceAdd = false" style="left: -50px;position: relative">关 闭</el-button>
          <el-button type="warning" @click="saveFinance" style="left: 50px;position: relative">保 存</el-button>
        </span>
    </el-dialog>
  </div>

  <!--修改-->
  <div>
    <el-dialog title="修改财务记录" center="true" :visible.sync="dialogVisibleFinanceEdit" width="80%" :before-close="handleClose">
      <br>
      <add-finance :financeTableData="financeTableData"></add-finance>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="clearInfo(dialogVisibleFinanceEdit = false)" style="left: -50px;position: relative">关 闭</el-button>
          <el-button type="warning" @click="ediTFinance" style="left: 50px;position: relative">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</div>
</template>

<script>
  import Qs from 'qs';
    import AddFinance from "./AddFinance";
    export default {
        name: "FinanceTable",
      components: {AddFinance},
      data(){
          return{
            page:'1',                  //页数
            pageSize:'10',
            allNum:'',
            inputCondition:'',
            dialogVisibleFinanceAdd:false,
            dialogVisibleFinanceEdit:false,
            addFlag:false,
            editFlag:false,
            deleteFlag:false,
            showFlag:true,
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
          if(this.$store.state.roleId == "2"){
            this.addFlag = true;
            this.editFlag =true;
            this.deleteFlag = true;
            this.showFlag=false;
          }
          this.getFinanceInfo();
          this.getFinanceNum();
      },
      methods:{
        //修改时将数据放入
        clearInfo(){
          this.financeTableData.financeType = " ";
          this.financeTableData.financeAbout = " ";
          this.financeTableData.financeChannel = " ";
          this.financeTableData.financeAmount = " ";
          this.financeTableData.userName = " ";
        },
        putInfo(rowData){
          let financeId = rowData.financeId;
          this.$axios.put("/api/queryByFinanceId?financeId="+financeId).then((response) =>{
            this.financeTableData = response.data;
          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          })
          /*this.financeTableData.financeType = rowData.financeType;
          this.financeTableData.financeAbout = rowData.financeAbout;
          this.financeTableData.financeChannel = rowData.financeChannel;
          this.financeTableData.financeAmount = rowData.financeAmount;
          this.financeTableData.userName = rowData.userName;*/
        },
        //修改财政记录
        ediTFinance(){
          let financeData = {
            financeId:this.financeTableData.financeId,
            financeType:this.financeTableData.financeType,
            financeAbout:this.financeTableData.financeAbout,  //财务用途
            financeChannel:this.financeTableData.financeChannel, //财务渠道
            financeAmount:this.financeTableData.financeAmount, //金额额度
            userName:this.financeTableData.userName,
          };
          this.$axios.put("/api/updateFinanceInfo",financeData).then((response) =>{
            if(response.data =="1"){
              this.dialogVisibleFinanceEdit=false;
              this.$message({type: 'success', showClose: true, message: '保存成功!'});
              this.getFinanceInfo();
            }else {
              this.$message({type: 'warning', showClose: true, message: '保存失败!'});
            }
          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          });
        },
        //删除信息
        deleteFinance(rowData){
          let financeId = rowData.financeId;
          this.$confirm('删除选中财政数据, 是否继续?', '提示', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          }).then(() => {
            this.$axios.put("/api/deleteFinanceInfo?financeId="+financeId).then((response) =>{
              if(response.data == "1"){
                this.$message({type: 'success', showClose: true, message: '删除成功!'});
                this.getFinanceInfo();
                this.getFinanceNum();
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
        //改变页面大小
        handleSizeChange(val) {
          this.pageSize = val;
          this.getFinanceInfo();

        },
        //改变页码
        handleCurrentChange(val) {
          this.page = val;
          this.getFinanceInfo();
        },
        //查询财务记录
        getFinanceInfo(){
          let readyData=Qs.stringify({
            page:this.page,
            pageSize:this.pageSize,
            condition:this.inputCondition
          });
          this.$axios.put("/api/queryFinanceInfo?" +readyData).then((response) =>{
            let _this = this;
            _this.financeTableData = response.data;
            this.getFinanceNum();
          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          });
        },
        //查询所有的数量
        getFinanceNum(){
          let readyData=Qs.stringify({
            condition:this.inputCondition
          });
          this.$axios.put("/api/queryFinanceNum?" +readyData).then((response) =>{
            let _this = this;
            _this.allNum = response.data;
          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          });
        },

        //新增支教财政记录
        saveFinance(){
          let financeData = {
            financeType:this.financeTableData.financeType,
            financeAbout:this.financeTableData.financeAbout,  //财务用途
            financeChannel:this.financeTableData.financeChannel, //财务渠道
            financeAmount:this.financeTableData.financeAmount, //金额额度
            userName:this.financeTableData.userName,
          };
          this.$axios.put("/api/insertFinanceInfo",financeData).then((response) =>{
            if(response.data =="S"){
              this.dialogVisibleFinanceAdd=false;
              this.$message({type: 'success', showClose: true, message: '保存成功!'});
              this.getFinanceInfo();
              this.getFinanceNum();
              this.clearInfo();
            }else {
              this.$message({type: 'warning', showClose: true, message: '保存失败!'
              });
            }
          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          })
        },
        getNewFinanceAmount(rowdata){
          let amount = "￥"+rowdata.financeAmount ;
          return amount;
        }
      }
    }
</script>

<style scoped>

</style>
