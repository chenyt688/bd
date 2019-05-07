<template>
  <div>
    <el-form-item label="省">
      <el-cascader :options="provinces" v-model="formData.province" clearable style="width: 170px" @change="getCityInfo"></el-cascader>
    </el-form-item>
    <el-form-item label="市">
      <el-cascader  clearable :options="cities" v-model="formData.city" style="width: 170px" @change="getCountyInfo"></el-cascader>
    </el-form-item>
    <el-form-item label="区">
      <el-cascader style="width: 170px" :options="counties" v-model="formData.county" clearable @change="getTownInfo"></el-cascader>
    </el-form-item>
    <el-form-item label="乡镇">
      <el-cascader style="width: 170px" :options="towns" v-model="formData.town" clearable @change="getVillageInfo"></el-cascader>
    </el-form-item>
    <el-form-item label="村">
      <el-cascader style="width: 170px" :options="villages" v-model="formData.village" clearable></el-cascader>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input clearable v-model="formData.speAdd" style="width: 260px"></el-input>
    </el-form-item>
  </div>
</template>

<script>
    export default {
      name: "AddressSelect",
      props:["formData"],
      data(){
        return{
          provinces:[{
            value:'',
            label:'',
          }],
          cities:[{                 //省
            value:'',
            label:'',
          }],                       //市
          counties:[{
            value:'',
            label:'',
          }],                       //区
          towns:[{
            value:'',
            label:'',
          }],                       //乡镇
          villages:[{
            value:'',
            label:'',
          }],
        }
      },created(){
      this.getProvinceInfo();
    },
      methods:{
        //地址级联
        getProvinceInfo:function () {
          this.$axios.put("/api/getProvinceInfo").then((response) =>{          //省
            let _this = this;
            //回调函数处于其它函数的内部this不会与任何对象绑定，为undefined
            _this.provinces= response.data;
          })
        },
        getCityInfo:function(val){
          this.$axios.post("/api/getCityInfo?provinceId="+val).then((response) =>{          //市
            let _this = this;
            _this.cities= response.data;
          })
        },
        getCountyInfo:function(val){
          this.$axios.post("/api/getCountyInfo?cityId="+val).then((response) =>{          //区
            let _this = this;
            _this.counties= response.data;
          })
        },
        getTownInfo:function(val){
          this.$axios.post("/api/getTownInfo?countyId="+val).then((response) =>{          //乡
            let _this = this;
            _this.towns= response.data;
          })
        },
        getVillageInfo:function(val){
          this.$axios.post("/api/getVillageInfo?townId="+val).then((response) =>{          //村
            let _this = this;
            _this.villages= response.data;
          })
        },
      }
    }
</script>

<style scoped>

</style>
