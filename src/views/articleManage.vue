<template  >
<!--    style="background-color: rgb(240,242,247);height:100%"-->
    <div>
        <div class="search-wrapper" style="width:850px">
            <div class="search-text" style="width: 50px">查找</div>
            <el-input placeholder="请输入文章名称" v-model="title" class="input-with-select">
                <el-button type="primary" @click="load" style="color:dodgerblue" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <div class="btn-group" style="display: flex;height:40px;position: relative;bottom:18px">
                <el-button type="primary"  @click="load" >查询<i class="el-icon-search" style="margin-left:5px"></i></el-button>
                <el-button type="primary"  @click=" handleExport" >导出<i class="el-icon-upload2" style="margin-left:5px"></i></el-button>
            </div>

        </div>
        <div style="margin-top:20px;margin-left:35px">
           <el-button type="primary" size="small" @click="cb">
               <span v-if="show ==true">收起筛选</span>
               <span v-if="show ==false">展开筛选</span></el-button>
            <el-collapse-transition>
                <div v-if="show" class="testshow" style="margin-top: 10px;">
                    <span>状态</span>
                        <el-radio-group v-model="status" style="margin-left:20px">
                            <el-radio-button  label="">全部</el-radio-button>
                            <el-radio-button  label="0" >待审核</el-radio-button>
                            <el-radio-button  label="1" >已上架</el-radio-button>
                            <el-radio-button  label="2" >未上架</el-radio-button>
                        </el-radio-group>
                    <br><br>
                    <div style="display:flex">
                        <span style="margin-top:5px">分类</span>
                        <el-checkbox-group v-model="checkboxGroup1" style="margin-left:20px" size="medium">
                            <el-checkbox-button  label="">全部</el-checkbox-button>
                            <el-checkbox-button  label="0" >前端</el-checkbox-button>
                            <el-checkbox-button  label="1" >后端</el-checkbox-button>
                            <el-checkbox-button  label="2" >未上架</el-checkbox-button>
                        </el-checkbox-group>
                    </div>

                    </div>
            </el-collapse-transition>

        </div>



        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:15px;">
            <el-tab-pane label="文章列表" name="first">
                <div>
                    <el-table :data="tableData" border  @selection-change="handleSelectionChange" style="position:relative;bottom:10px">
                        <el-table-column
                                type="selection"
                                width="55"
                        >
                        </el-table-column>
                        <el-table-column prop="id" label="ID" width="40">
                        </el-table-column>
                        <el-table-column prop="cover" label="封面" width="140">
                            <template slot-scope="scope">
                                <img :src="scope.row.cover" style="width:140px;height:80px"></img>

                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="125" >
<!--                             <span style="width: 120px;-->
<!--                             overflow:hidden;-->
<!--                             text-overflow: ellipsis;-->
<!--                             white-space: nowrap;-->
<!--                             -webkit-line-clamp: 1;-->
<!--                              ">{{title}}</span>-->
                            <template slot-scope="scope" >
                                <span class="table_title" >{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="上传时间" width="110"  sortable>
                            <template slot-scope="scope" >
                                <span v-if="scope.row.createTime!= null">{{scope.row.createTime|dateFormate }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="category" label="文章类型" width="100">

                        </el-table-column>
                        <el-table-column prop="privacy" label="私密性" width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.privacy== 0">全部可见</span>
                                <span v-if="scope.row.privacy== 1">仅自己可见</span>
                                <span v-if="scope.row.privacy== 2">粉丝可见</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="views" label="浏览量" width="90"   sortable>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status== 0">待审核</span>
                                <span v-if="scope.row.status== 1">正常</span>
                                <span v-if="scope.row.status== 2">已下架</span>
                            </template>

                        </el-table-column>
                        <el-table-column prop="isHot" label="是否热门" width="78">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isHot== 0">非热门</span>
                                <span v-if="scope.row.isHot== 1">热门</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">

                            <el-link type="primary" >
                                <span v-if="scope.row.status== 0">去审核</span>
                                <span v-if="scope.row.status== 1" @click="handleOffShelves(scope.row.id)">下架</span>
                                <span v-if="scope.row.status== 2" @click="handleBackShelves(scope.row.id)">上架</span>
                            </el-link>
                            <el-link type="primary" style="margin-left: 7px" @click="drawer = true">详情</el-link>

                            <el-link type="primary" style="margin-left: 7px">
                                <span v-if="scope.row.isHot == 0" @click="handleSetHot(scope.row.id)">设为热门</span>
                                <span v-if="scope.row.isHot == 1" @click="handleOffHot(scope.row.id)">移除热门</span>
                            </el-link>
                                <el-drawer
                                        title="编辑文章"
                                        :visible.sync="drawer"
                                        :with-header="true">
                                    <div class="drawer_header">
                                        <img :src="scope.row.cover" style="width:140px;height:80px">
                                        <span>{{scope.row.title}}</span>

                                    </div>

                                </el-drawer>
                            </template>



                        </el-table-column>

                    </el-table>

                    <div class="page" style="padding:10px 0">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageNum"
                                :page-sizes="[2, 10, 15, 20]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="待审核文章" name="second">
                <div>
                    <el-table :data="tableData" border  @selection-change="handleSelectionChange" style="position:relative;bottom:10px">
                        <el-table-column
                                type="selection"
                                width="55"
                        >
                        </el-table-column>
                        <el-table-column prop="id" label="ID" width="40">
                        </el-table-column>
                        <el-table-column prop="cover" label="封面" width="140">
                            <template slot-scope="scope">
                                <img :src="scope.row.cover" style="width:140px;height:80px"></img>

                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="125" >
                            <!--                             <span style="width: 120px;-->
                            <!--                             overflow:hidden;-->
                            <!--                             text-overflow: ellipsis;-->
                            <!--                             white-space: nowrap;-->
                            <!--                             -webkit-line-clamp: 1;-->
                            <!--                              ">{{title}}</span>-->
                                    <template slot-scope="scope" >
                                        <span class="table_title">{{scope.row.title}}</span>
                                    </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="上传时间" width="110"  sortable>
                            <template slot-scope="scope" >
                                <span v-if="scope.row.createTime!= null">{{scope.row.createTime|dateFormate }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="category" label="文章类型" width="100">

                        </el-table-column>
                        <el-table-column prop="privacy" label="私密性" width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.privacy== 0">全部可见</span>
                                <span v-if="scope.row.privacy== 1">仅自己可见</span>
                                <span v-if="scope.row.privacy== 2">粉丝可见</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="views" label="浏览量" width="90"   sortable>
                        </el-table-column>
                        <el-table-column prop="isHot" label="是否热门" width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isHot== 0">非热门</span>
                                <span v-if="scope.row.isHot== 1">热门</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">

                                <el-link type="primary" style="margin-left: 7px">审核操作</el-link>

                        </el-table-column>
                    </el-table>

                    <div class="page" style="padding:10px 0">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageNum"
                                :page-sizes="[2, 10, 15, 20]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="未通过文章" name="third">角色管理</el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    // fade/zoom 等
    import 'element-ui/lib/theme-chalk/base.css';
    // collapse 展开折叠
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
    import Vue from 'vue'
    Vue.component(CollapseTransition.name, CollapseTransition)
    export default {
        name: "articleManage",
        data(){
            return{
                drawer:false,
                show:false,
                formLabelWidth:'100px',
                title:'',
                status:null,
                category:null,
                activeName:'first',
                total:0,
                tableData: [],
                multipleSelection: [],
                pageNum:1,
                pageSize:2,
                checkboxGroup1:[],

            }


        },
        created() {
            //请求分页查询数据
            this.load()

        },

        methods:{
            handleSizeChange(pageSize){
                this.pageSize = pageSize
                this.load()
            },
            cb() {
                this.show = !this.show;
            },
            handleCurrentChange(pageNum){
                this.pageNum = pageNum
                this.load()
            },
            handleEdit(row){
                this.form = row
                this.dialogFormVisible = true
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            } ,
            handleClick(){

            },
            handleExport(){

            },
            handleSetHot(id){
                this.request.post("/admin/article/set_hot/"+id).then(res=>{
                    if(res.success)
                    {
                        this.$message.success(res.msg)
                        this.load()
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                })
            },
            handleOffHot(id){
                this.request.post("/admin/article/off_hot/"+id).then(res=>{
                    if(res.success)
                    {
                        this.$message.success(res.msg)
                        this.load()
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                })
            },
            handleOffShelves(id){
                this.request.post("/admin/article/off/"+id).then(res=>{
                  if(res.success)
                  {
                      this.$message.success(res.msg)
                      this.load()
                  }
                  else{
                      this.$message.error(res.msg)
                  }
                })

            },
            handleBackShelves(id){
                this.request.post("/admin/article/back/"+id).then(res=>{
                    if(res.success)
                    {
                        this.$message.success(res.msg)
                        this.load()
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                })
            },
            handleDelete(id){
                this.request.delete("/admin/article/delete/"+id).then(res=>{
                    if(res){
                        this.$message.success("删除成功")
                        this.load()
                    }
                    else{
                        this.$message.error("删除失败")
                    }
                })
            },
            delBatch(){
                let id_list = this.multipleSelection.map(v => v.id) //将对象转换成只含有id的数组
                this.request.post("/admin/article/delete_batch",id_list).then(res=>{

                    if(res){
                        this.$message.success("批量删除成功")
                        this.load()
                    }
                    else{
                        this.$message.error("批量删除失败")
                    }
                })
            },
            reset(){
                this.uname=''
                this.load()
            },
            handleInsert(){
                this.dialogFormVisible = true
                this.form = {}

            },
            saveUser(){
                this.request.post("/admin/user/save",this.form).then(res=>{
                    if(res){
                        this.$message.success("保存成功")
                        this.dialogFormVisible = false
                        this.load()
                    }
                    else{
                        this.$message.error("保存失败")
                    }
                })

            },
            load(){

                this.request.get("/admin/article/search_page",{
                    params:{
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        title:this.title,
                        category:this.category,
                        status:this.status,

                    }
                }).then(res=>{
                    console.log(this.status)
                    console.log(res)
                    this.tableData = res.data.records
                    this.total = res.data.total
                })
            }

        }

    }
</script>

<style scoped>
  .table_title{
      text-overflow: ellipsis;
      overflow: hidden;
      width: 125px;
      height:50px;
      display: inline-block;
      -webkit-line-clamp: 2;
      word-wrap: normal;
      word-break: break-all;
      white-space: normal;
  }

</style>