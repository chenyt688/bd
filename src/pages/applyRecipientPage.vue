<template>
    <div>
      <index-page></index-page>
      <apply-recipient></apply-recipient>
    </div>
</template>

<script>
    import IndexPage from "../components/common/indexPage";
    import ApplyRecipient from "../components/recipient/ApplyRecipient";
    export default {
        name: "applyRecipientPage",
      components: {ApplyRecipient, IndexPage}
    }
</script>

<style scoped>

</style>
