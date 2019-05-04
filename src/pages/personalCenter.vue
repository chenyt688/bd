<template>
 <div>
   <index-page></index-page>
   <personal-info></personal-info>

 </div>

</template>

<script>

  import IndexPage from "../components/common/indexPage";
  import PersonalInfo from "../components/user/PersonalInfo"
    export default {
      name: "personalCenter",
      components: {IndexPage,PersonalInfo},
    }
</script>

<style scoped>

</style>
