<template>
<div>
  <page-title :msg="msg"></page-title>
  <diary-table></diary-table>
</div>
</template>

<script>
    import DiaryTable from "./DiaryTable";
    import PageTitle from "../common/PageTitle";
    export default {
        name: "ManageDiary",
      components: {PageTitle, DiaryTable},
      data(){
        return{
          msg:"个人日志管理",
        }
      },
    }
</script>

<style scoped>

</style>
