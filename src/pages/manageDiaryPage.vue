<template>
  <div>
    <index-page></index-page>
    <manage-diary></manage-diary>
  </div>

</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import ManageDiary from "../components/diary/ManageDiary";
    export default {
        name: "manageDiaryPage",
      components: {ManageDiary, IndexPage}
    }
</script>

<style scoped>

</style>
