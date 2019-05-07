<template>
  <div>
    <el-form :model="financeTableData" :inline="true" style="position:relative;left:80px">

      <el-form-item label="捐款人">
        <el-input v-model="financeTableData.userName" clearable style="position: relative;width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="financeTableData.financeType">
          <el-option label="支出" value="支出"></el-option>
          <el-option label="收入" value="收入"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="捐款额度">
        <el-input v-model="financeTableData.financeAmount" clearable style="position: relative;width: 150px" placeholder="单位:元"></el-input>
      </el-form-item>
      <el-form-item label="捐款渠道">
        <el-input v-model="financeTableData.financeChannel" clearable ></el-input>
      </el-form-item>

      <el-form-item label="财务用途">
        <el-input v-model="financeTableData.financeAbout" placeholder="100字符以内" type="textarea" clearable :rows="4" style="width: 945px"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "AddFinance",
      props:["financeTableData"]
    }
</script>

<style scoped>

</style>
