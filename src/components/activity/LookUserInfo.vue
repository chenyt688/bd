<template>
  <el-form :model="formData" :inline="true" >

    <el-form-item label="姓名">
      <el-input v-model="formData.userName" disabled="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="formData.userGender" disabled autocomplete="off" ></el-input>
    </el-form-item>

    <el-form-item label="身份证号">
      <el-input v-model="formData.userIdentityData" disabled ></el-input>
    </el-form-item>

    <el-form-item label="电话">
      <el-input v-model="formData.userPhone" disabled autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="邮箱">
      <el-input v-model="formData.userEmail" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-date-picker v-model="formData.userBirth" type="date" disabled placeholder="选择日期">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="地址">
      <el-input clearable v-model="formData.userAddress" disabled style="width: 490px"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
      name: "LookUserInfo",
      props:["formData"],
      methods:{

      }
    }
</script>

<style scoped>

</style>
