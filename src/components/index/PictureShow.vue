<template>
  <div>
    <page-title :msg="msg"></page-title>
    <div v-show="showOperate">
      <el-upload ref='upload' style="width: 30%"
                 class="upload-demo" name="picture"
                 action="/api/uploadPicture"
                 :data="userIdStr"
                 multiple
                 :file-list="fileList3"
                 :before-upload="beforeAvatarUpload"
                 :auto-upload="true"
                 list-type="picture">
        <el-button sslot="trigger" size="small" style="margin-left: 30px" type="primary" title="只能上传jpg/png文件" @click="changeState">上传图片</el-button>
      </el-upload>
      <el-button size="small" style="margin-left: 160px;position: absolute;top: 174px;"  @click="getAllPicture">刷新</el-button>
    </div>

    <div class="demo-image" style="margin-top: 10px" v-if="show">
      <el-image v-for="p in picture"
        style="width: 290px; height: 150px;margin-left: 12px;margin-top: 12px"
        :src="p.img"
        :fit="fits" v-bind:key="p.img"></el-image>
    </div>
    <br><br><br><br><br>
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
            show:true,
            userIdStr:this.$store.state.userId,
            showOperate:false,
            fits: ['fill'],
            fileList3:[],
            picture:{
              id:'',
              imgName:'',
              userId:'',
              img:'',
              flag:'',
            },
          }
      },
      created(){
        if(this.$store.state.userId !='' &&this.$store.state.userId != null ){
          this.showOperate = true;
        }
        this.getAllPicture();
      },
      methods:{
        getAllPicture(){
          this.show = true;
          this.$axios.get("/api/queryAllPicture").then((response) =>{
            let that = this;
            that.picture = response.data;
            this.$refs.upload.clearFiles();
          }).catch(() =>{
            this.$message({type: 'warning', showClose: true, message: '请求数据失败!'});
          })
        },
        changeState(){
          this.show = false;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          if (!isJPG && !isPNG) {
            this.$message.error('上传头像图片只能是JPG/PNG格式!');
            this.getAllPicture();
          }

          return isJPG;
        }
      }
    }
</script>

<style scoped>

</style>
