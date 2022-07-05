<template>
  <div class="container">
      <div class="time">
          <div class="time_title">
              <span style="font-size:25px;font-weight: bold">今日,</span>
              <br>
              <span>{{currentTime}}欢迎{{admin.adminRealname}}使用echo后台管理系统</span>
          </div>
          <div class="time_icon">
              <el-button size="medium" style="width:35px;height:35px"  circle><i class="el-icon-s-management" style="color:cornflowerblue"></i></el-button>
              <div>
                  {{ articleWaitInspectNumber}}<br>待审核
              </div>
          </div>

      </div>
      <el-row type="flex" class="row-bg" justify="center" :gutter="20" style="height:150px;margin-top:10px" >
          <el-col :span="8" >
              <div class="grid-content bg-purple" style="height:150px">
                  <h1>用户总数</h1>
                  <div style="display: flex">
                      <h2 style="position:relative;left:80px;line-height: 75px;flex:2">{{userTotalNumber}}</h2>
                      <img :src=" imgUrl" style="width:140px;height:120px;position: relative;bottom:20px">
                  </div>

              </div>
          </el-col>
          <el-col :span="7">
              <div class="grid-content bg-purple" style="height:150px">
                  <h1>文章总数</h1>
                  <h2 style="position:relative;left:100px;line-height: 75px">{{articleTotalNumber}}</h2>
              </div>
          </el-col>
          <el-col :span="8">
              <div class="grid-content bg-purple" style="height:150px">
                  <h1>阅读量</h1>
                  <div style="display: flex">
                     <h2 style="position:relative;left:80px;line-height: 75px;flex:2">{{totalViews}}</h2>
                    <img :src=" imgUrl2" style="width:110px;height:110px;position:relative;bottom:10px">
                  </div>
              </div>
          </el-col>

      </el-row>
      <el-row type="flex" class="row-bg" justify="center" :gutter="20" style="height:320px;margin-top:20px" >
          <el-col :span="9" >
              <div class="grid-content bg-purple" style="height:300px">
                  <h1>不同语言使用频率</h1>
                  <div style="margin-top: 10px" v-for="language in languages">
                      <div style="display: flex">
                          <div style="font-size:13px;color:rgb(153,153,153);flex:0.5">{{language.name}}</div>
                          <el-progress :text-inside="true" :stroke-width="24" :percentage="language.percentage"   style="width:200px;position:relative;bottom:15px;left:10px;" ></el-progress>
                      </div>

                  </div>

              </div>
          </el-col>

          <el-col :span="14">
              <div class="grid-content bg-purple" style="height:300px">
                  <h1>不同分类的文章个数</h1>
                  <div id="category" style="height:280px"></div>
              </div>
          </el-col>

      </el-row>
      <el-row type="flex" class="row-bg" justify="center" :gutter="20" style="height:320px;margin-top:20px" >
          <el-col :span="11" >
              <div class="grid-content bg-purple" style="height:300px">
                  <h1>不同时间段发表的文章数</h1>
                  <div id="main" style="height:280px"></div>
              </div>
          </el-col>

          <el-col :span="12">
              <div class="grid-content bg-purple" style="height:300px">
<!--                  <h1>不同分类文章的阅读量</h1>-->
                   <div id="pie" style="height:290px"></div>
              </div>
          </el-col>

      </el-row>


  </div>





</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name:'index',
        data() {
            return {
                imgUrl:require('@/static/person.png'),
                imgUrl2:require('@/static/book.png'),
                index:0,
                articleWaitInspectNumber:'',
                articleTotalNumber:'',
                userTotalNumber:'',
                totalViews:'',
                currentTime:'',
                languages:[
                    {id:1,name:"C",percentage:null},
                    {id:2,name:'C++',percentage:null},
                    {id:4,name:'Java',percentage:null},
                    {id:8,name:'Python',percentage:null},
                    {id:16,name:'Javascript',percentage:null},
                ],
                admin:{
                    adminRealname:'',
                    avatar:'',

                },
                hasLogin:false,

            }
        },
        created(){
            this.load()
            this.loadAllArticle()
            this.loadAllUser()
            this.loadAllViews()
            this.getCurrentTime()
            this.getFrequency()
            if (this.utils.getObjectFromLocalStorage("user")) {
                this.admin.adminRealname = this.utils.getObjectFromLocalStorage("user").adminRealname;
                this.admin.avatar = this.utils.getObjectFromLocalStorage("user").avatar;
                this.hasLogin = true
            }
        },


        methods:{
            load(){
                this.request.get("/admin/article/search_page",{
                    params:{
                        pageNum:1,
                        pageSize:2,
                        status:0,

                    }
                }).then(res=>{
                    this.articleWaitInspectNumber = res.data.data.total
                })
            },
            loadAllArticle(){
                this.request.get("/admin/article/search_page",{
                    params:{
                        pageNum:1,
                        pageSize:2,

                    }
                }).then(res=>{
                    this.articleTotalNumber = res.data.data.total
                })
            },
            loadAllUser(){
                this.request.get("/admin/index/total_user"
                ).then(res=>{
                    this.userTotalNumber = res.data.data

                })
            },
            loadAllViews(){
                console.log("begin load")
                this.request.get("/admin/index/total_views"
                ).then(res=>{

                    this.totalViews = res.data.data
                    console.log(this.totalViews)

                })
            },
            getCurrentTime(){
                let aData = new Date();
                this.currentTime =
                    aData.getFullYear() + "年" + (aData.getMonth() + 1) + "月" + aData.getDate()+"日";

            },
            getFrequency(){
                for (let i = 0; i <this.languages.length;i++) {
                    this.request.get("/admin/index/language/frequency/"+this.languages[i].id
                    ).then(res=>{
                        this.languages[i].percentage = Math.round(parseInt(res.data.data)/parseInt(this.articleTotalNumber)*100)
                    })
                    console.log(this.languages[i].percentage)
                }
            }



        },
        mounted(){
            this.loadAllArticle()
            this.getFrequency()
            let chartDom = document.getElementById('main');
            let myChart = echarts.init(chartDom);
            let chartDomPie =  document.getElementById('pie');
            let myChartPie = echarts.init(chartDomPie);
            let chartDomCategory = document.getElementById('category');
            let myChartCategory = echarts.init(chartDomCategory);
            let option= {
                xAxis: {
                    type: 'category',
                    data: ["第一季度","第二季度","第三季度","第四季度"]
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        data: [],
                        type: 'line',
                    },
                    {
                        data:[],
                        type:"bar",
                    },

                ]
            };
            this.request.get("/admin/index/article/trend").then(res=>{
                console.log(res)
                option.series[0].data=res.data.data
                option.series[1].data=res.data.data
                myChart.setOption(option)
            })
            let optionCategory={
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        data: [],
                        type: 'line',
                    },
                    {
                        data:[],
                        type:"bar",
                    },

                ]

            };
            this.request.get("/admin/index/category/article_number").then(res=>{
                optionCategory.xAxis.data =res.data.data.x
                optionCategory.series[0].data=res.data.data.y
                optionCategory.series[1].data=res.data.data.y
                myChartCategory.setOption(optionCategory)
            })
            let categoryOptions = ['前端', '后端', '数据库', '操作系统', '网络', '游戏', '大数据', '人工智能', '测试', '安全', '小程序', '软件工程'];
            let optionPie= {
                title: {
                    text: '不同分类文章的阅读量',
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
                        data: [],
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
            this.request.get("/admin/index/category/article_views").then(res=>{
                console.log('article_views',res)

                    optionPie.series[0].data=
                        [
                            {
                                name:categoryOptions[0],
                                value:res.data.data[0]
                            },
                            {
                                name:categoryOptions[1],
                                value:res.data.data[1]
                            },
                            {
                                name:categoryOptions[2],
                                value:res.data.data[2]
                            },
                            {
                                name:categoryOptions[3],
                                value:res.data.data[3]
                            },
                            {
                                name:categoryOptions[4],
                                value:res.data.data[4]
                            },
                            {
                                name:categoryOptions[5],
                                value:res.data.data[5]
                            },
                            {
                                name:categoryOptions[6],
                                value:res.data.data[6]
                            },
                            {
                                name:categoryOptions[7],
                                value:res.data.data[7]
                            },
                            {
                                name:categoryOptions[8],
                                value:res.data.data[8]
                            },
                            {
                                name:categoryOptions[9],
                                value:res.data.data[9]
                            },
                            {
                                name:categoryOptions[10],
                                value:res.data.data[10]
                            },
                            {
                                name:categoryOptions[11],
                                value:res.data.data[11]
                            },
                            {
                                name:categoryOptions[12],
                                value:res.data.data[12]
                            },


                        ]

                myChartPie.setOption(optionPie)
            })


        },
    };

</script>

<style scoped>
    .container{
        height:100%;
        background-color: rgb(242,242,242);

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
    /*.bg-purple-dark {*/
    /*    background: #99a9bf;*/
    /*}*/
    /*.bg-purple {*/
    /*    background: #d3dce6;*/
    /*}*/
    /*.bg-purple-light {*/
    /*    background: #e5e9f2;*/
    /*}*/
    .grid-content {
        border-radius: 8px;
        min-height: 36px;
        padding:20px;
        border:1px ;
        background-color: white;
        box-shadow: #99a9bf;
    }
    .row-bg {
        padding: 10px 0;
        /*background-color: #f9fafc;*/
    }
</style>