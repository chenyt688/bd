<template>
  <div>
    <index-page></index-page>
    <index-info></index-info>
  </div>
</template>

<script>
  import IndexInfo from "../components/index/IndexInfo";
  import IndexPage from "../components/common/indexPage";
    export default {
      name: "indexContentPage",
      components: {
        IndexPage,
        IndexInfo
      }
    }
</script>

<style scoped>

</style>
