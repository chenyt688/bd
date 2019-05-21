<template>
    <div>
      <index-page></index-page>
      <picture-show></picture-show>
    </div>
</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import PictureShow from "../components/index/PictureShow";
    export default {
        name: "PictureShowPage",
      components: {PictureShow, IndexPage}
    }
</script>

<style scoped>

</style>
