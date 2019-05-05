<template>
  <div>
    <index-page></index-page>
    <registration-progress></registration-progress>
  </div>

</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import RegistrationProgress from "../components/activity/RegistrationProgress";
    export default {
        name: "progressPage",
      components: {RegistrationProgress, IndexPage}
    }
</script>

<style scoped>

</style>
