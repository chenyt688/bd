<template>
  <div>
    <index-page></index-page>
    <manage-finance></manage-finance>
  </div>


</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import ManageFinance from "../components/finance/ManageFinance";
    export default {
        name: "manageFinancePage",
      components: {ManageFinance, IndexPage}
    }
</script>

<style scoped>

</style>
