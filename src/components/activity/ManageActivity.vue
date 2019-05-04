<template>
  <div>
    <page-title :msg="msg"></page-title>

    <!--活动表单-->
    <activity-table></activity-table>

  </div>

</template>

<script>

  import PageTitle from "../common/PageTitle";
  import ActivityTable from "./ActivityTable";
    export default {
      name: "ManageActivity",
      components:{ActivityTable, PageTitle,},
      created(){
        this.getAllActivityInfo();
      },
      data(){
        return{
          msg:"志愿者活动信息管理",
        }
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
