<template>
  <div>
    <index-page></index-page>
    <manage-activity></manage-activity>
  </div>

</template>

<script>
  import IndexPage from "../components/common/indexPage";
  import ManageActivity from "../components/activity/ManageActivity"
    export default {
        name: "manageActivityPage",
      components:{ManageActivity,IndexPage}
    }
</script>

<style scoped>

</style>
