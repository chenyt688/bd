<template>
  <div>
    <index-page></index-page>

    <user-info></user-info>

  </div>
</template>

<script>
  import UserInfo from "../components/user/UserInfo";
  import IndexPage from "../components/common/indexPage";
    export default {
      name: "userManagerPage",
      components: {
        IndexPage,
        UserInfo,

      }
    }
</script>

<style scoped>

</style>
