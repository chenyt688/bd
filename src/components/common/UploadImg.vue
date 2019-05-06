<template>
    <div>
      <el-upload :data="imgType"
        class="upload-demo" name="picture"
        action="/api/uploadImg"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :before-upload="msgTip"
        :auto-upload="true"
        list-type="picture">
        <el-button size="small" type="primary" title="只能上传jpg/png文件，且不超过500kb">图片上传</el-button>
      </el-upload>
    </div>
</template>

<script>
    export default {
      name: "UploadImg",
      props:["imgType"],
      data() {
        return {
          fileList: []
        };

      },
      methods: {
        handleRemove(file, fileList) {
          alert(this.imgType);
        },
        handlePreview(file,fileList) {

          alert(file.name);
        },
        msgTip(file,fileList) {
          switch (this.imgType){

            case "个人照片":
              break;
            case "个人申请书":
              break;
            case "个人户口页":
              break;
            case "村级证明":
              break;
            case "乡级证明":
              break;
            case "学籍表":
              break;
            case "二维码":
              break;
          }
          this.$message({type: 'warning', showClose: true, message: '最多上传一张图片!'});
        }
      }
    }
</script>

<style scoped>
  input[type="file"] {
    display: none;
  }
</style>
