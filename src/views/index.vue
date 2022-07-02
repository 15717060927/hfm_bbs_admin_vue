<template>
  <div class="container">
      <div class="time">
          <div class="time_title">
              <span style="font-size:25px;font-weight: bold">今日,</span>
              <br>
              <span>2022年7月1日，欢迎使用echo后台管理系统</span>
          </div>
          <div class="time_icon">
              <el-button size="medium" style="width:35px;height:35px"  circle><i class="el-icon-s-management"></i></el-button>
              <div>
                  54<br>待审核
              </div>
          </div>

      </div>
      <el-row type="flex" class="row-bg" justify="center" :gutter="20" style="height:150px;margin-top:20px" >
          <el-col :span="8" >
              <div class="grid-content bg-purple" style="height:150px">
                  <h1>用户总数</h1>
                  <h2 style="position:relative;left:80px;line-height: 75px">用户总数</h2>
              </div>
          </el-col>
          <el-col :span="8">
              <div class="grid-content bg-purple" style="height:150px">
                  <h1>文章总数</h1>
                  <h2 style="position:relative;left:80px;line-height: 75px">文章总数</h2>
              </div>
          </el-col>
          <el-col :span="8">
              <div class="grid-content bg-purple" style="height:150px">
                  <h1>阅读量</h1>
                  <h2 style="position:relative;left:80px;line-height: 75px">用户总数</h2>
              </div>
          </el-col>

      </el-row>
      <el-row type="flex" class="row-bg" justify="center" :gutter="20" style="height:320px;margin-top:20px" >
          <el-col :span="8" >
              <div class="grid-content bg-purple" style="height:300px">
                  <h1>各标签引用次数</h1>
                  <div style="margin-top: 20px">
                      <div style="display: flex">
                          前端：
                          <el-progress :text-inside="true" :stroke-width="26" :percentage="60" style="width:200px;position:relative;bottom:15px;" ></el-progress>
                      </div>
                      <div style="display: flex">
                          前端：
                          <el-progress :text-inside="true" :stroke-width="26" :percentage="100" style="width:200px;position:relative;bottom:15px;" ></el-progress>
                      </div>
                      <div style="display: flex">
                          前端：
                          <el-progress :text-inside="true" :stroke-width="26"  :percentage="50" status="exception" style="width:200px;position:relative;bottom:15px;" ></el-progress>
                      </div>
                      <div style="display: flex">
                          前端：
                          <el-progress :text-inside="true" :stroke-width="26"  :percentage="50" status="exception" style="width:200px;position:relative;bottom:15px;" ></el-progress>
                      </div>
                      <div style="display: flex">
                          前端：
                          <el-progress :text-inside="true" :stroke-width="26"  :percentage="50" status="exception" style="width:200px;position:relative;bottom:15px;" ></el-progress>
                      </div>


                  </div>

              </div>
          </el-col>

          <el-col :span="18">
              <div class="grid-content bg-purple" style="height:300px">
                  <h1>不同分类的文章个数</h1>
                  柱状图
              </div>
          </el-col>

      </el-row>
      <el-row type="flex" class="row-bg" justify="center" :gutter="20" style="height:320px;margin-top:20px" >
          <el-col :span="18" >
              <div class="grid-content bg-purple" style="height:300px">
                  <h1>不同时间段文章的阅读量</h1>
                  <div id="main" style="height:250px"></div>
              </div>
          </el-col>

          <el-col :span="12">
              <div class="grid-content bg-purple" style="height:300px">
                  <h1>不同分类文章的阅读量</h1>
                   <div id="pie" style="height:250px"></div>
              </div>
          </el-col>

      </el-row>


  </div>



<!--        <div class="header">-->
<!--            <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>-->
<!--        </div>-->



</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name:'index',
        data() {
            return {
                circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            }
        },
        mounted(){
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var chartDomPie =  document.getElementById('pie');
            var myChartPie = echarts.init(chartDomPie);
            var option= {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ]
            };
            var optionPie= {
                title: {
                    text: 'Referer of a Website',
                    subtext: 'Fake Data',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
            myChartPie.setOption(optionPie);
        },
    };

</script>

<style scoped>
    .container{
        height:100%;
        /*background-color: rgb(242,242,242);*/
    }
   .time{
       display:flex;
       margin-top:10px;
       margin-left:20px;
   }
   .time .time_title{
       flex:15;
   }
   .time .time_icon{
       flex:2;
       display:flex;
       margin-top:5px;

   }
   .time .time_icon i{
       font-size:16px;

   }
   .time .time_icon div{
       margin-left:15px;

   }

   .header{
       display:inline-block;
       margin-top:25px;
       margin-left:25px;
       height:20%;
       padding:30px;
       width:100%;
      background-color: white;
      box-shadow: #99a9bf;
      /*border:3px solid blue;*/

  }
   .el-progress{
       margin-top:15px;
   }

    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        padding:20px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>