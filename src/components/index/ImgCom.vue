<template>
  <div class="block">
    <el-carousel height="350px">
      <el-carousel-item  v-for="imgItem in imagesbox" :key="imgItem.id" >
        <img :src="imgItem.idView" class="image" @click="getActivityById(activityId)">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
    export default {
      name: "ImgCom",
      props:["activityId"],
      data(){
          return{
            imagesbox:[
              {id:1,idView:require("../../../static/image/img1.jpg")},
              {id:4,idView:require("../../../static/image/img2.jpg")},
              {id:5,idView:require("../../../static/image/img3.jpg")}],
          }
      },
      methods:{
        getActivityById:function (activityId) {
          this.$router.push({
            path: '/lookActivityInfo',
            query: {
              activityId:activityId
            }
          })
        },
      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img{
    position: relative;
    height: 350px;
    width: 70%;
    left: 240px;
  }
</style>
