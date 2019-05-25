<template>
    <div>
      <page-title :msg="msg"></page-title>
      <div class="block" style="margin-left: 100px;">
        <span class="demonstration">选择年：</span>
        <el-date-picker
          v-model="year"
          align="right"
          @change="changeEvent"
          type="year"
          placeholder="选择年">
        </el-date-picker>
        <a style="margin-left: 50px" @click="changeChart(1)">各省支教活动数量柱状图</a>
        <a style="margin-left: 50px" @click="changeChart(2)">各省支教活动数量饼状图</a>
        <a style="margin-left: 50px" @click="changeChart(3)">预测各省申请支教活动数量柱状图</a>
        <a style="margin-left: 50px" @click="changeChart(4)">预测各省申请支教活动数量饼状图</a>
      </div>

      <div id="myChart"  style="width: 100%; height: 500px;margin-top: 40px" v-show="flag1"></div>
      <div id="myChart1" style="width: 100%; height: 500px;margin-top: 40px" v-show="flag2"></div>
      <div id="myChart3" style="width: 100%; height: 500px;margin-top: 40px" v-show="flag3" ></div>
      <div id="myChart4" style="width: 100%; height: 500px;margin-top: 40px" v-show="flag4"></div>
      <br><br><br>
      <label style="margin-left: 60px;font-size: 20px">结论：{{this.conclusion}}</label>
      <br><br><br><br><br>
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
          year:'',          //选择的年份
          yearStart:'',     //网站开始年份
          conclusion:'',    //结论
          flag1:true,
          flag2:false,
          flag3:false,
          flag4:false,
          type:1,
          chartData:{
            provinceName:'',
            num:'',
          },
          analysisData:{
            provinceName:'',
            num:'',
          },
        }
      },
      created(){
        this.getActivityData();
        this.getYear();
      },
      mounted(){
        //this.drawLineChart();
      },
      methods:{
        changeEvent(){
          if(this.type === 3 ||this.type ===4){
            this.getContent();
          }else {
            this.getActivityData();
          }
        },
        changeChart(val){
          if(val ===1){
            this.flag1=true;
            this.flag2=false;
            this.flag3=false;
            this.flag4=false;
            this.type =1;
            this.getActivityData();
          }else if(val ===2){
            this.flag1=false;
            this.flag2=true;
            this.flag3=false;
            this.flag4=false;
            this.type =2;
            this.getActivityData();

          }else if(val ===3){
            this.flag1=false;
            this.flag2=false;
            this.flag3=true;
            this.flag4=false;
            this.type =3;
            this.getContent();
          }else {
            this.flag1=false;
            this.flag2=false;
            this.flag3=false;
            this.flag4=true;
            this.type =4;
            this.getContent();
          }
        },
        //获取申请支教的最早年份
        getYear(){
          this.$axios.get("/api/getYear").then((response) =>{
            this.yearStart = response.data;

          }).catch(() =>{
            this.$message({type: 'danger', showClose: true, message: '请求异常!'});
          });
        },
        //预测数据
        getContent(){
          if(this.year === null || this.year ===''){
            let myDate = new Date();
            let t = myDate.getFullYear();
            let readyData=Qs.stringify({
              year:t
            });
            this.$axios.put("/api/AnalysisData?"+readyData).then((response) =>{
              this.analysisData = response.data;
              if(this.type ===3){
                this.drawLineChart2();
              }else if(this.type ===4){
                this.drawRatioChart2();
              }
            }).catch(() =>{
              this.$message({type: 'danger', showClose: true, message: '请求异常!'});
            });
          }else {
            let time = this.year.getFullYear();
            if(this.year!==''&&time>=this.yearStart+3){
              let readyData=Qs.stringify({
                year:this.year
              });
              this.$axios.put("/api/AnalysisData?"+readyData).then((response) =>{
                this.analysisData = response.data;
                if(this.type ===3){
                  this.drawLineChart2();
                }else if(this.type ===4){
                  this.drawRatioChart2();
                }
              }).catch(() =>{
                this.$message({type: 'danger', showClose: true, message: '请求异常!'});
              });
            }else if(this.year!==''&&time<=this.yearStart+3){
              let st = this.yearStart + 3;
              this.$message({type: 'warning', showClose: true, message: '活动申请开始年份是'+this.yearStart+'年，如需预测请从' +st+'年开始！'});
            }
          }



        },
        //获取各个省份申报活动的数据
        getActivityData(){
          let readyData=Qs.stringify({
            year:this.year
          });
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
          let maxVal = 0;    //最大数量
          let province  = '';//省份
          for (let i = 0; i < this.chartData.length; i++) {
            if(this.chartData[i].num>maxVal){
              maxVal = this.chartData[i].num;
              province = this.chartData[i].provinceName;
            }
            res.push(
              {
                name: this.chartData[i].provinceName,
                value: this.chartData[i].num
              }
            );

          }
          if(this.year ==='' || this.year ===null){
            this.conclusion = "所有年份申请支教志愿者活动最多的省份是" + province+"数量为：" + maxVal;
          }else {
            this.conclusion = time+"年申请支教志愿者活动最多的省份是" + province+"数量为：" + maxVal;
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
          let maxVal = 0;    //最大数量
          let province  = '';//省份
          for (let i = 0; i < this.chartData.length; i++) {
            if(this.chartData[i].num>maxVal){
              maxVal = this.chartData[i].num;
              province = this.chartData[i].provinceName;
            }
            names.push(this.chartData[i].provinceName);    //挨个取出类别并填入类别数组
            nums.push(this.chartData[i].num);    //挨个取出销量并填入销量数组
          }
          if(this.year ==='' || this.year ===null){
            this.conclusion = "所有年份申请支教志愿者活动最多的省份是" + province+"数量为：" + maxVal;
          }else {
            this.conclusion = time+"年申请支教志愿者活动最多的省份是" + province+"数量为：" + maxVal;
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

        },

        //预测数据生成饼状图
        drawRatioChart2(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart4'));
          myChart.resize({ width: 1540, height: 500 });
          let time;
          // 绘制图表
          let title;
          let t;
          if(this.year !=='' && this.year !==null){
            time = this.year.getFullYear();
            title ='预测'+time+'年各个省份申请志愿者活动数量情况'
          }else {
            let myDate = new Date();
            t = myDate.getFullYear() +1;
            title = '预测'+t+'年份各个省份申请志愿者活动数量情况'
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
          let maxVal = 0;    //最大数量
          let province  = '';//省份
          for (let i = 0; i < this.analysisData.length; i++) {
            if(this.analysisData[i].num>maxVal){
              maxVal = this.analysisData[i].num +"";
              province = this.analysisData[i].provinceName;
            }
            res.push(
              {
                name: this.analysisData[i].provinceName,
                value: this.analysisData[i].num
              }
            );

          }
          if(this.year !=='' && this.year !==null){
            this.conclusion = "预测"+time+"年师资资源缺乏严重的省份是"+province+"，申请支教志愿者活动预计数量为：" + maxVal.substring(0,4);

          }else {

            this.conclusion = "预测"+t+"年师资资源缺乏严重的省份是"+province+"，申请支教志愿者活动预计数量为：" + maxVal.substring(0,4);
          }

          myChart.hideLoading();    //隐藏加载动画
          myChart.setOption({
            series: [{
              data: res
            }]

          });
        },

        //预测数据生成柱状图
        drawLineChart2() {
          let myChart = this.$echarts.init(document.getElementById('myChart3'));
          let title;
          let time;
          let t;
          if(this.year !=='' && this.year !==null){
            time = this.year.getFullYear();
            title ='预测'+time+'年各个省份申请志愿者活动数量情况'
          }else {
            let myDate = new Date();
            t = myDate.getFullYear() +1;
            title = '预测'+t+'年份各个省份申请志愿者活动数量情况'
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
          let maxVal = 0;    //最大数量
          let province  = '';//省份
          for (let i = 0; i < this.analysisData.length; i++) {
            if(this.analysisData[i].num>maxVal){
              maxVal = this.analysisData[i].num + "";
              province = this.analysisData[i].provinceName;
            }
            names.push(this.analysisData[i].provinceName);    //挨个取出类别并填入类别数组
            nums.push(this.analysisData[i].num);    //挨个取出销量并填入销量数组
          }
          if(this.year !=='' && this.year !==null){

            this.conclusion = "预测"+time+"年师资资源缺乏严重的省份是"+province+"，申请支教志愿者活动预计数量为：" + maxVal.substring(0,4);
          }else {
            this.conclusion = "预测"+t+"年师资资源缺乏严重的省份是"+province+"，申请支教志愿者活动预计数量为：" + maxVal.substring(0,4);
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
