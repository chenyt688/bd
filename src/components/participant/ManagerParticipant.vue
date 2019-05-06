<template>
    <div>
      <page-title :msg="msg"></page-title>
      <participant-table></participant-table>
    </div>
</template>

<script>
    import PageTitle from "../common/PageTitle";
    import ParticipantTable from "./ParticipantTable";
    export default {
        name: "ManagerParticipant",
      components: {ParticipantTable, PageTitle},
      data(){
          return{
            msg:'报名管理'
          }
      }
    }
</script>

<style scoped>

</style>
