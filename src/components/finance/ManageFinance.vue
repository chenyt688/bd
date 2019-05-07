<template>
  <div>
    <page-title :msg="msg"></page-title>
    <finance-table></finance-table>
  </div>

</template>

<script>
    import PageTitle from "../common/PageTitle";
    import FinanceTable from "./FinanceTable";
    export default {
        name: "ManageFinance",
      components: {FinanceTable, PageTitle},
      data(){
          return{
            msg:'财务支出管理'
          }
      }
    }
</script>

<style scoped>

</style>
