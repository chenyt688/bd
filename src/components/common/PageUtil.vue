<template>
  <!--分页-->
  <div class="block" style="left: 20px;position: relative;">
    <el-pagination :data="pageData" @size-change="handleSizeChange"  @current-change="handleCurrentChange"
                   :current-page="page"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="allNum">
    </el-pagination>
  </div>
</template>

<script>
    export default {
      name: "PageUtil",
      props:["pageData"],
      data(){

      },
      created(){


      },
      methods:{
        //改变页面大小
        handleSizeChange(val) {
          this.pageSize = val;
        },
        //改变页码
        handleCurrentChange(val) {
          this.page = val;
        },

      }
    }
</script>

<style scoped>

</style>
