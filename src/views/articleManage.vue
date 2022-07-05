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
                <el-button type="primary"  @click="handleExport" >导出<i class="el-icon-upload" style="margin-left:5px"></i></el-button>
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
                        <span style="margin-top:5px;margin-left: -10px">私密性</span>
                        <el-radio-group v-model="privacy" style="margin-left:20px">
                            <el-radio-button  label="">全部</el-radio-button>
                            <el-radio-button  label="0" >全部可见</el-radio-button>
                            <el-radio-button  label="1" >仅自己可见</el-radio-button>
                            <el-radio-button  label="2" >粉丝可见</el-radio-button>
                        </el-radio-group>
                    </div>

                    </div>
            </el-collapse-transition>

        </div>



        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:15px;">
            <el-tab-pane label="文章列表" name="first">
                <div>
                    <el-table :data="tableData" border :id="id"  :header-cell-style="headClass" @selection-change="handleSelectionChange" style="position:relative;bottom:10px">
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
                            <template slot-scope="scope" >

                            <span v-if="(scope.row.category & FRONT_END) === FRONT_END">前端 </span>
                            <span v-if="(scope.row.category &BACK_END) === BACK_END">后端 </span>
                            <span v-if="(scope.row.category & DATABASE) === DATABASE">数据库 </span>
                            <span v-if="(scope.row.category & OS) === OS">操作系统 </span>
                            <span v-if="(scope.row.category & NETWORK) === NETWORK">网络 </span>
                            <span v-if="(scope.row.category & GAME) === GAME">游戏 </span>
                            <span v-if="(scope.row.category & BIG_DATA) === BIG_DATA">大数据 </span>
                            <span v-if="(scope.row.category & AI) === AI">人工智能 </span>
                            <span v-if="(scope.row.category & TEST) === TEST">测试 </span>
                            <span v-if="(scope.row.category & SECURITY) ===SECURITY">安全 </span>
                            <span v-if="(scope.row.category & APPLET) ===APPLET">小程序 </span>
                            <span v-if="(scope.row.category &  SOFTWARE_ENGINEER) === SOFTWARE_ENGINEER">软件工程 </span>
                            </template>
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
                                <span v-if="scope.row.status== 0" @click="handleInspect(scope.row)">去审核</span>
                                <span v-if="scope.row.status== 1" @click="handleOffShelves(scope.row.id)">下架</span>
                                <span v-if="scope.row.status== 2" @click="handleBackShelves(scope.row.id)">上架</span>
                            </el-link>
                            <el-link type="primary" style="margin-left: 7px" @click="handleDrawerOpen(scope.row)">详情</el-link>

                            <el-link type="primary" style="margin-left: 7px">
                                <span v-if="scope.row.isHot == 0" @click="handleSetHot(scope.row.id)">设为热门</span>
                                <span v-if="scope.row.isHot == 1" @click="handleOffHot(scope.row.id)">移除热门</span>
                            </el-link>
                                <el-drawer
                                        title="查看文章"
                                        :visible.sync="drawer"
                                        :with-header="false">

                                    <div class="drawer_title">查看文章</div>
                                    <div class="link"></div>
                                    <div class="drawer_header">

                                       <div>
                                           <img :src="form.cover" style="width:140px;height:80px">
                                       </div>
                                        <div class="drawer_header_title">
                                            <h1>{{form.title}}</h1>
                                            <br>

                                        </div>
                                    </div>
                                    <div class="link"></div>
                                    <div class="main_title">文章详情</div>
                                    <div class="main_info">
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">文章标题:</label><span style="margin-left:15px">{{form.title}}</span></div>
                                            <div class="main_info_item_label_second"><label class="main_label">文章编号:</label><span style="margin-left:15px">{{form.id}}</span></div>
                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">文章语言:</label>
                                                <span style="margin-left:10px" v-if="(form.languageField & C ) === C ">C </span>
                                                <span style="margin-left:10px" v-if="(form. languageField &CPP) === CPP">C++ </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & JAVA) === JAVA">Java </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & PYTHON) ===PYTHON">Python </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & JAVASCRIPT) === JAVASCRIPT">Js </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & HTML) === HTML">Html </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & CSS) === CSS">Css </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & CSHARP) === CSHARP">C# </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & RUST) === RUST">Rust </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & GO) ===GO">Go </span>
                                                <span style="margin-left:10px" v-if="(form. languageField & ANDROID) ===ANDROID">Android </span>
                                                <span style="margin-left:10px" v-if="(form. languageField &  KOTLIN) === KOTLIN">Kotlin </span>
                                                <span style="margin-left:10px" v-if="(form. languageField &  SWIFT) === SWIFT">Swift </span>
                                                <span style="margin-left:10px" v-if="(form. languageField &  IOS ) === IOS ">Ios </span>
                                                <span style="margin-left:10px" v-if="(form. languageField &  DART) === DART">Dart </span>
                                            </div>
                                            <div class="main_info_item_label_second"><label class="main_label">浏览量:</label><span style="margin-left:15px">{{form.views}}</span></div>
                                        </div>
                                        <div class="main_info_item">

                                            <div class="main_info_item_label_first"><label class="main_label">上传时间:</label><span style="margin-left:5px;font-size:14px;">{{form.createTime | dateFormate}}</span></div>
                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">文章分类:</label><span style="margin-left:15px">
                                                 <span v-if="(form.category & FRONT_END) === FRONT_END">前端 </span>
                                                <span v-if="(form.category &BACK_END) === BACK_END">后端 </span>
                                                <span v-if="(form.category & DATABASE) === DATABASE">数据库 </span>
                                                <span v-if="(form.category & OS) === OS">操作系统 </span>
                                                <span v-if="(form.category & NETWORK) === NETWORK">网络 </span>
                                                <span v-if="(form.category & GAME) === GAME">游戏 </span>
                                                <span v-if="(form.category & BIG_DATA) === BIG_DATA">大数据 </span>
                                                <span v-if="(form.category & AI) === AI">人工智能 </span>
                                                <span v-if="(form.category & TEST) === TEST">测试 </span>
                                                <span v-if="(form.category & SECURITY) ===SECURITY">安全 </span>
                                                 <span v-if="(form.category & APPLET) ===APPLET">小程序 </span>
                                                 <span v-if="(form.category &  SOFTWARE_ENGINEER) === SOFTWARE_ENGINEER">软件工程 </span>
                                            </span></div>
                                            <div class="main_info_item_label_second"><label class="main_label">审核状态:</label>
                                                <span style="margin-left:15px" v-if="form.status== 0">待审核</span>
                                                <span style="margin-left:15px" v-if="form.status==1">正常</span>
                                                <span style="margin-left:15px" v-if="form.status==2">已下架</span>
                                            </div>
                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">私密性:</label>
                                                <el-radio-group v-model="form.privacy" style="margin-left:2px">
                                                    <el-radio disabled :label="0" style="margin-left:2px">全部可见</el-radio>
                                                    <el-radio disabled :label="1">仅自己可见</el-radio>
                                                    <el-radio disabled :label="2">粉丝可见</el-radio>
                                                </el-radio-group>
                                            </div>

                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label" >是否热门:</label>
                                                <el-radio-group v-model="form.isHot"  style="margin-left:5px">
                                                    <el-radio :label="false">非热门</el-radio>
                                                    <el-radio :label="true">热门</el-radio>
                                                </el-radio-group>
                                            </div>

                                        </div>

                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">文字描述:</label>
                                                <el-input type="textarea" style="margin-top:5px;"  :autosize="{ minRows: 2, maxRows: 4}"  disabled v-model="form.description"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </el-drawer>
                                <el-drawer
                                        title="审核文章"
                                        :visible.sync="inspect"
                                        :with-header="false">

                                    <div class="drawer_title">审核文章</div>
                                    <div class="link"></div>
                                    <div class="drawer_header">

                                        <div>
                                            <img :src="form.cover" style="width:140px;height:80px">
                                        </div>
                                        <div class="drawer_header_title">
                                            <h1>{{form.title}}</h1>
                                            <br>

                                        </div>
                                    </div>
                                    <div class="link"></div>
                                    <div class="main_title">文章详情</div>
                                    <div class="main_info">
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">文章标题:</label><span style="margin-left:15px">{{form.title}}</span></div>
                                            <div class="main_info_item_label_second"><label class="main_label">文章编号:</label><span style="margin-left:15px">{{form.id}}</span></div>
                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">文章标签:</label>
                                                <span v-if="(form.languageField & C ) === C ">C </span>
                                                <span v-if="(form. languageField &CPP) === CPP">C++ </span>
                                                <span v-if="(form. languageField & JAVA) === JAVA">Java </span>
                                                <span v-if="(form. languageField & PYTHON) ===PYTHON">Python </span>
                                                <span v-if="(form. languageField & JAVASCRIPT) === JAVASCRIPT">Js </span>
                                                <span v-if="(form. languageField & HTML) === HTML">Html </span>
                                                <span v-if="(form. languageField & CSS) === CSS">Css </span>
                                                <span v-if="(form. languageField & CSHARP) === CSHARP">C# </span>
                                                <span v-if="(form. languageField & RUST) === RUST">Rust </span>
                                                <span v-if="(form. languageField & GO) ===GO">Go </span>
                                                <span v-if="(form. languageField & ANDROID) ===ANDROID">Android </span>
                                                <span v-if="(form. languageField &  KOTLIN) === KOTLIN">Kotlin </span>
                                                <span v-if="(form. languageField &  SWIFT) === SWIFT">Swift </span>
                                                <span v-if="(form. languageField &  IOS ) === IOS ">Ios </span>
                                                <span v-if="(form. languageField &  DART) === DART">Dart </span>
                                                <span style="margin-left:15px"></span></div>
                                            <div class="main_info_item_label_second"><label class="main_label">浏览量:</label><span style="margin-left:15px">{{form.views}}</span></div>
                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">上传时间:</label><span style="margin-left:5px;font-size:14px;">{{form.createTime | dateFormate}}</span></div>
                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">文章分类:</label>
                                                <span v-if="(form.category & FRONT_END) === FRONT_END">前端 </span>
                                                <span v-if="(form.category &BACK_END) === BACK_END">后端 </span>
                                                <span v-if="(form.category & DATABASE) === DATABASE">数据库 </span>
                                                <span v-if="(form.category & OS) === OS">操作系统 </span>
                                                <span v-if="(form.category & NETWORK) === NETWORK">网络 </span>
                                                <span v-if="(form.category & GAME) === GAME">游戏 </span>
                                                <span v-if="(form.category & BIG_DATA) === BIG_DATA">大数据 </span>
                                                <span v-if="(form.category & AI) === AI">人工智能 </span>
                                                <span v-if="(form.category & TEST) === TEST">测试 </span>
                                                <span v-if="(form.category & SECURITY) ===SECURITY">安全 </span>
                                                 <span v-if="(form.category & APPLET) ===APPLET">小程序 </span>
                                                 <span v-if="(form.category &  SOFTWARE_ENGINEER) === SOFTWARE_ENGINEER">软件工程 </span>
                                            </div>

                                            <div class="main_info_item_label_second"><label class="main_label">审核状态:</label>
                                                <span style="margin-left:15px" v-if="form.status== 0">待审核</span>
                                                <span style="margin-left:15px" v-if="form.status==1">正常</span>
                                                <span style="margin-left:15px" v-if="form.status==2">已下架</span>
                                            </div>
                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">私密性:</label>
                                                <el-radio-group v-model="form.privacy"  style="margin-left:2px">
                                                    <el-radio disabled :label="0">全部可见</el-radio>
                                                    <el-radio disabled :label="1">仅自己可见</el-radio>
                                                    <el-radio disabled :label="2">粉丝可见</el-radio>
                                                </el-radio-group>
                                            </div>

                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label" >是否热门:</label>
                                                <el-radio-group v-model="form.isHot"  style="margin-left:5px">
                                                    <el-radio :label="false">非热门</el-radio>
                                                    <el-radio :label="true">热门</el-radio>
                                                </el-radio-group>
                                            </div>

                                        </div>

                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first"><label class="main_label">文字描述:</label>
                                                <el-input type="textarea" style="margin-top:5px;"  :autosize="{ minRows: 2, maxRows: 4}"  disabled v-model="form.description"></el-input>
                                            </div>
                                        </div>
                                        <div class="main_info_item">
                                            <div class="main_info_item_label_first">
                                                <el-button-group>
                                                    <el-button type="primary" @click="handlePermit(form.id)">允许发布</el-button>
                                                    <el-button type="danger" @click="handleForbide(form.id)">拒绝发布</el-button>
                                                </el-button-group>

                                            </div>
                                        </div>
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
        </el-tabs>
    </div>
</template>

<script>
    // fade/zoom 等
    import 'element-ui/lib/theme-chalk/base.css';
    // collapse 展开折叠
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
    import Vue from 'vue';
    import * as XLSX from "xlsx";
    import FileSaver from 'file-saver';


    Vue.component(CollapseTransition.name, CollapseTransition)
    export default {
        name: "articleManage",
        data(){
            return{
                form:{
                    id:0,
                    title:'',
                    cover:'',
                    views:'',
                    status:'',
                    category:'',
                    createTime:'',
                    privacy:'',
                    description:'',
                    isHot:'',
                    languageField:'',

                },

                FRONT_END : 1,
                BACK_END :1 << 1,
                DATABASE : 1 << 2,
                OS : 1 << 3,
                NETWORK : 1 << 4,
                GAME : 1 << 5,
                BIG_DATA : 1 << 6,
                AI : 1 << 7,
                TEST : 1 << 8,
                SECURITY : 1 << 8,
                APPLET : 1 << 10,
                SOFTWARE_ENGINEER:1 << 11,
                C :1,
                CPP : 1 << 1,
                JAVA : 1 << 2,
                PYTHON : 1 << 3 ,
                  JAVASCRIPT  : 1 << 4 ,
                  HTML  : 1 << 5 ,
                  CSS  : 1 << 6 ,
                  CSHARP  : 1 << 7 ,
                  RUST  : 1 << 8 ,
                  GO  : 1 << 8 ,
                  ANDROID  : 1 << 10 ,
                  KOTLIN  : 1 << 11 ,
                  SWIFT  : 1 << 12 ,
                  IOS  : 1 << 13 ,
                  DART  : 1 << 14 ,
                privacy:'',
                inspect:false,
                drawer:false,
                show:false,
                formLabelWidth:'100px',
                title:'',
                status:'',
                activeName:'first',
                total:0,
                tableData: [],
                multipleSelection: [],
                pageNum:1,
                pageSize:2,
                checkboxGroup1:[],
                id:'exportTable',
                name:'文章信息表'
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
            headClass(){
                return 'background:#DCDCDC'
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
                let gatherData = { raw: true };
                let grid = XLSX.utils.table_to_book(
                    document.querySelector("#" + this.id),
                    gatherData
                );
                let workbook = XLSX.write(grid, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array",
                });
                try {
                    FileSaver.saveAs(
                        new Blob([workbook], {
                            type: "application/octet-stream",
                        }),
                        this.name + ".xlsx"
                    );
                } catch (e) {
                    if (typeof console !== "undefined") console.log(e, workbook);
                }
                return workbook;
            },

            handleInspect(param){
                this.inspect=true
                this.form = param
            },
            handleDrawerOpen(param){
                this.drawer = true
                this.form = param
            },

            handleSetHot(id){
                this.request.post("/admin/article/set_hot/"+id).then(res=>{
                    if(res.data.success)
                    {
                        this.$message.success(res.data.msg)
                        this.load()
                    }
                    else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            handleOffHot(id){
                this.request.post("/admin/article/off_hot/"+id).then(res=>{
                    if(res.data.success)
                    {
                        this.$message.success(res.data.msg)
                        this.load()
                    }
                    else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            handleOffShelves(id){
                this.request.post("/admin/article/off/"+id).then(res=>{
                  if(res.data.success)
                  {
                      this.$message.success(res.data.msg)
                      this.load()
                  }
                  else{
                      this.$message.error(res.data.msg)
                  }
                })

            },
            handleBackShelves(id){
                this.request.post("/admin/article/back/"+id).then(res=>{
                    if(res.data.success)
                    {
                        this.$message.success(res.data.msg)
                        this.load()
                    }
                    else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            handlePermit(id){
                this.request.post("/admin/article/back/"+id).then(res=>{

                    if(res.data.success)
                    {
                        this.$message.success("允许发布成功")
                        this.inspect = false
                        this.load()
                    }
                    else{
                        this.$message.error("允许发布失败")
                    }
                })
            },
            handleForbide(id){
                this.request.post("/admin/article/off/"+id).then(res=>{
                    if(res.data.success)
                    {
                        this.$message.success("拒绝发布成功")
                        this.inspect = false
                        this.load()
                    }
                    else{
                        this.$message.error("拒绝发布失败")
                    }
                })
            },
            load(){

                this.request.get("/admin/article/search_page",{
                    params:{
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        title:this.title,
                        privacy:this.privacy,
                        status:this.status,

                    }
                }).then(res=>{
                    this.tableData = res.data.data.records
                    this.total = res.data.data.total
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
  .link{
      margin-top:5px;
      width: 100%;
      height: 1px;
      border-top: solid lightgrey 1px;
  }
  .drawer_title{
      margin-left:15px;
      margin-top:10px;
      font-size:15px;
      color:rgb(64,158,255);
  }
  .drawer_header{
      margin-top:10px;
      margin-left:15px;
      display: flex;
      vertical-align: top;
  }
    .drawer_header .drawer_header_title{
        margin-left:10px;
    }
    .main_info_item{
        display: flex;
        margin-top:15px;
    }
    .main_info_item .main_info_item_label_first{
        margin-left:20px;
        flex:8;

    }
  .main_info_item .main_info_item_label_first .el-button-group{
      margin-top:10px;
  }
  .main_info_item .main_info_item_label_first .el-button-group .el-button{
      margin-left:15px;
  }
  .main_info_item .main_info_item_label_second{

      flex:5
  }
  .main_label{
      color:rgb(153,153,153);
  }
    .main_title{
        margin-left:15px;
        margin-top:15px;
        font-size:15px;
        color:rgb(64,158,255);
    }

</style>