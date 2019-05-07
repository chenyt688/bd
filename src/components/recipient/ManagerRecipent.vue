<template>
  <div>
    <page-title :msg="msg"></page-title>
    <RecipientTable></RecipientTable>
  </div>


</template>

<script>
    import PageTitle from "../common/PageTitle";
    import RecipientTable from "./RecipientTable";
    export default {
      name: "ManagerRecipent",
      components: {RecipientTable, PageTitle},
      data(){
        return{
          msg:'受助人信息',
        }
      }
    }
</script>

<style scoped>

</style>
