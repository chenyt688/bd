<template>
  <div class="block">
    <el-date-picker
      v-model="duringTime.time"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right" @change="getTime">
    </el-date-picker>
  </div>
</template>

<script>
    export default {
      name: "DuringTime",
      props:["duringTime"],
      data() {
        return {
          time:'',
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },

        };
      },
      methods:{
        getTime(start){       //将时间段赋值
          this.time = start;

        }
      }
    }
</script>

<style scoped>

</style>
