<template>
  <div>
    <menu-list></menu-list>
    <login-page></login-page>
    <regist-page></regist-page>
    <forget-password></forget-password>
  </div>


</template>

<script>

  import MenuList from "./MenuList";
  import LoginPage from "./LoginPage";
  import RegistPage from "./RegistPage";
  import ForgetPassword from "./ForgetPassword";

    export default {
        name: "indexPage",
        components: {
          MenuList,
          LoginPage,
          RegistPage,
          ForgetPassword
      }
    }
</script>

<style scoped>

</style>
