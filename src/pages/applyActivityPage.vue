<template>
<div>
  <index-page></index-page>
  <apply-activity></apply-activity>
</div>
</template>

<script>
  import IndexPage from "../components/common/indexPage";
  import applyActivity from "../components/activity/ApplyActivity"
    export default {
      name: "applyActivityPage",
      components:{IndexPage,applyActivity}
    }
</script>

<style scoped>

</style>
