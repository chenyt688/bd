<template>
  <div>
    <el-form :model="diaryTableData" :inline="true" style="position:relative;left:80px" :disabled="flag">

      <el-form-item label="标题">
        <el-input v-model="diaryTableData.diaryTopic" clearable autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="diaryTableData.diaryTime" type="date" clearable placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="天气">
        <el-input v-model="diaryTableData.weather" clearable autocomplete="off"></el-input>
      </el-form-item>



      <el-form-item label="他人可见">
        <el-switch v-model="diaryTableData.diaryShow" active-color="#13ce66" inactive-color="#ff4949" >
        </el-switch>
      </el-form-item>
      <el-form-item label="正文">
        <el-input v-model="diaryTableData.diaryContent" placeholder="1000字符以内" type="textarea" clearable :rows="10" style="width: 900px"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "AddDiary",
      props:["diaryTableData"],
      created(){

      }
    }
</script>

<style scoped>

</style>
