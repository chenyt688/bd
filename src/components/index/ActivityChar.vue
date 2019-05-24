<template>
    <div>
      <page-title :msg="msg"></page-title>
      <div class="block" style="margin-left: 100px;">
        <span class="demonstration">选择年：</span>
        <el-date-picker
          v-model="year"
          align="right"
          @change="getActivityData"
          type="year"
          placeholder="选择年">
        </el-date-picker>
        <a style="margin-left: 50px" @click="changeChart(1)">柱  状  图</a>
        <a style="margin-left: 50px" @click="changeChart(2)">饼  状  图</a>
      </div>

      <div id="myChart" style="width: 100%; height: 500px;margin-top: 40px" v-show="flag1"></div>
      <div id="myChart1" style="width: 100%; height: 500px;margin-top: 40px" v-show="flag2"></div>
      <br><br><br>
      <br><br><br>
    </div>
</template>

<script>
    import PageTitle from "../common/PageTitle";
    import Qs from 'qs';

    export default {
      name: "ActivityChar",
      components: {PageTitle},
      data(){
        return{
          msg:'数据分析',
          year:'',
          flag1:true,
          flag2:false,
          type:1,
          chartData:{
            provinceName:'',
            num:'',
          },
        }
      },
      created(){
        this.getActivityData();
      },
      mounted(){
        //this.drawLineChart();
      },
      methods:{
        changeChart(val){
          if(val ===1){
            this.flag1=true;
            this.flag2=false;
            this.type =1;
            this.drawLineChart();
          }else {
            this.flag1=false;
            this.flag2=true;
            this.type =2;
            this.drawRatioChart();

          }
        },

        //获取各个省份申报活动的数据
        getActivityData(){
          let readyData=Qs.stringify({
            year:this.year
          });
          console.log(this.year)
          this.$axios.put("/api/getActivityCountByProvinceName?"+readyData).then((response) =>{
            let _this = this;
            _this.chartData = response.data;
            if(this.type ===1){
              this.drawLineChart();
            }else {
              this.drawRatioChart();
            }

          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          });

        },


        //生成饼状图
        drawRatioChart(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart1'));
          myChart.resize({ width: 1540, height: 500 });
          let time;
          if(this.year !==''&& this.year !==null){
            time = this.year.getFullYear();
          }

          // 绘制图表
          let title;
          if(this.year ==='' || this.year ===null){
            title ='所有年份各个省份申请志愿者活动数量饼状图'
          }else {
            title =time+'年各个省份申请志愿者活动数量饼状图'
          }

          myChart.setOption({
            title : {
              text: title,
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
              show : true,
              //left: 'left',
              x:1200,
              y:50,
              feature : {
                dataView : {show: true, readOnly: false},
                //magicType : {show: true, type: ['line', 'bar']},
                //restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            legend: {
              orient: 'vertical',
              x:250,
              y:50,

            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '70%',
                center: ['50%', '60%'],
                data:[],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });
          myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
          let res = [];
          for (let i = 0; i < this.chartData.length; i++) {
            res.push(
              {
                name: this.chartData[i].provinceName,
                value: this.chartData[i].num
              }
            );

          }
          myChart.hideLoading();    //隐藏加载动画
          myChart.setOption({
            series: [{
              data: res
            }]

          });
        },

        //生成柱状图
        drawLineChart() {
          let myChart = this.$echarts.init(document.getElementById('myChart'));
          let title;
          let time;
          if(this.year !=='' && this.year !==null){
            time = this.year.getFullYear();
          }
          if(this.year ==='' || this.year ===null){
            title ='所有年份各个省份申请志愿者活动数量情况'
          }else {
            title =time+'年各个省份申请志愿者活动数量情况'
          }
          myChart.setOption({
            color: ['#3398DB'],
            title: {
              text: title,
              x:'center'
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show : true,
              x:1300,
              y:0,
              feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                estore : {show: true},
                saveAsImage : {show: true}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            legend: {
              data: []
            },
            xAxis : [
              {
                type : 'category',
                data : [],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'省份申请活动总数',
                type:'bar',
                barWidth: '60%',
                data:[]
              }
            ]
          });
          myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
          let names = [];    //省份数组（实际用来盛放X轴坐标值）
          let nums = [];     //活动数量数组（实际用来盛放Y坐标值）
          for (let i = 0; i < this.chartData.length; i++) {
            names.push(this.chartData[i].provinceName);    //挨个取出类别并填入类别数组
            nums.push(this.chartData[i].num);    //挨个取出销量并填入销量数组
          }

          myChart.hideLoading();    //隐藏加载动画
          myChart.setOption({        //加载数据图表
            xAxis: {
              data: names
            },
            series: [{
              // 根据名字对应到相应的系列
              name: '具体数据:',
              data: nums
            }]
          });

        }
      }
    }
</script>


<style scoped>

</style>
