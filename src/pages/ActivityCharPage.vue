<template>
    <div>
      <index-page></index-page>
      <activity-char></activity-char>
    </div>
</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import ActivityChar from "../components/index/ActivityChar";
    export default {
        name: "ActivityCharPage",
      components: {ActivityChar, IndexPage}
    }
</script>

<style scoped>

</style>
