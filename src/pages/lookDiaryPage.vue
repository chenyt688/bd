<template>
    <div>
      <index-page></index-page>
      <look-diary-info></look-diary-info>
    </div>
</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import LookDiaryInfo from "../components/diary/LookDiaryInfo";
    export default {
        name: "lookDiaryPage",
      components: {LookDiaryInfo, IndexPage}
    }
</script>

<style scoped>

</style>
