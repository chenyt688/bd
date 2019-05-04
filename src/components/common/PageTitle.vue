<template xmlns:img="http://www.w3.org/1999/xlink">
  <nav class="navbar navbar-default" >
    <div class="container-fluid" >
      <div class="navbar-header" >
        <a class="navbar-brand"  >
          <img src="../../assets/logo.png"  alt=""  id="brand" style="position:relative;left: 40px">
          <span style="position:relative;left: 60px">{{msg}}</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
      name: "PageTitle",
      props:["msg","imgUrl"],

    }
</script>

<style scoped>
  #brand {
    display: inline-block;
    width: 20px;
  }
</style>
