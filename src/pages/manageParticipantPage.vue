<template>
    <div>
      <index-page></index-page>
      <manager-participant></manager-participant>
    </div>
</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import ManagerParticipant from "../components/participant/ManagerParticipant";
    export default {
        name: "manageParticipantPage",
      components: {ManagerParticipant, IndexPage}
    }
</script>

<style scoped>

</style>
