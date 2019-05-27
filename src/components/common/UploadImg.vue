<template>
    <div>
      <el-upload :data1="imgType" ref='upload'
        class="upload-demo" name="picture"
        action="/api/uploadImg"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
                 :data="userIdStr"
        :before-upload="msgTip"
        :auto-upload="true"
        list-type="picture">
        <el-button size="small" type="primary" title="只能上传jpg文件，且不超过500kb">图片上传({{this.imgType+".jpg"}})</el-button>
      </el-upload>
    </div>
</template>

<script>
    export default {
      name: "UploadImg",
      props:["imgType"],
      data() {
        return {
          userIdStr:this.$store.state.userId,
          fileList: []
        };

      },
      methods: {
        handleRemove(file, fileList) {

        },
        handlePreview(file,fileList) {

        },
        msgTip(file,fileList) {
          let fileName = file.name.substring(0,file.name.indexOf("."));
          if(fileName != this.imgType){
            this.$message({type: 'warning', showClose: true, message: '图片命名不规则！请重新上传' });
            this.$refs.upload.clearFiles();
          }else {
            this.$message({type: 'warning', showClose: true, message: '最多上传一张图片!'});
            //this.imgType = this.$store.state.userId;
          }


        }
      }
    }
</script>

<style scoped>
  input[type="file"] {
    display: none;
  }
</style>
