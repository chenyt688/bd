<template>
    <div>
      <index-page></index-page>
      <manager-recipent></manager-recipent>
    </div>
</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import ManagerParticipant from "../components/participant/ManagerParticipant";
    import ManagerRecipent from "../components/recipient/ManagerRecipent";
    export default {
        name: "manageRecipentPage",
      components: {ManagerRecipent, IndexPage}
    }
</script>

<style scoped>

</style>
