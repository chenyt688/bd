<template>
  <div>
    <page-title :msg="msg"></page-title>
    <div class="demo-image">
      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z1.jpg"
        :fit="fits"></el-image>

      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z2.jpg"
        :fit="fits"></el-image>

      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z3.jpg"
        :fit="fits"></el-image>

      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z4.jpg"
        :fit="fits"></el-image>

      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z5.png"
        :fit="fits"></el-image>
      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z6.png"
        :fit="fits"></el-image>

      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z7.jpg"
        :fit="fits"></el-image>

      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z8.jpg"
        :fit="fits"></el-image>

      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z9.jpg"
        :fit="fits"></el-image>

      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z10.jpg"
        :fit="fits"></el-image>
      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z11.jpg"
        :fit="fits"></el-image>
      <el-image
        style="width: 300px; height: 200px"
        src="../../../static/image/z12.jpg"
        :fit="fits"></el-image>
    </div>
    <br><br><br><br><br>
  </div>

</template>

<script>
    import IndexPage from "../common/indexPage";
    import PageTitle from "../common/PageTitle";
    export default {
        name: "PictureShow",
      components: {PageTitle},
      data() {
          return {
            msg:'支教图片风采',
            fits: ['fill'],
            fileList:[{name: 'z1.jpg', url: '../../../static/image/z1.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z2.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z3.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z4.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z5.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z6.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z7.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z8.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z9.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z10.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z11.jpg'},
              {name: 'food2.jpeg', url: '../../../static/image/z12.jpg'}
          ]
          }
        }
    }
</script>

<style scoped>

</style>
