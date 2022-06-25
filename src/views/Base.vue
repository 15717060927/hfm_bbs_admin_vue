<template>
  <el-container style="min-height: 100vh" >

      <Aside :is-collapse="isCollapse" :log-text-show="logTextShow" :side-width="sideWidth" />

    <el-container>
    <el-header>
      <Header :collapse-btn-class="collapseBtnClass" :collapse="collapse" />
    </el-header>
      <el-main style="padding-top: 5px;">

        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">文章管理</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">文章审核</a></el-breadcrumb-item>

        </el-breadcrumb>

          <div class="search-wrapper">
            <div class="search-text" style="width: 50px">查找</div>
            <el-input placeholder="请输入用户名" v-model="uname" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名"  value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button type="primary" @click="load" style="color:dodgerblue" slot="append" icon="el-icon-search"></el-button>

            </el-input>

          </div>
        <div class="btn-group">
          <el-button type="primary"  @click="load"  >查询</el-button>
          <el-button type="warning"  @click="reset"  >重置</el-button>
          <el-button type="primary"  @click="handleInsert"  >新增<i class="el-icon-circle-plus-outline" style="margin-left:5px"></i></el-button>
          <el-button type="primary"  @click=" delBatch"  >批量删除<i class="el-icon-delete" style="margin-left:5px"></i></el-button>
        </div>

        <el-table :data="tableData" border  @selection-change="handleSelectionChange">
          <el-table-column
                  type="selection"
                  width="55"
                 >
          </el-table-column>
          <el-table-column prop="id" label="ID" width="40">
          </el-table-column>
          <el-table-column prop="uname" label="姓名" width="140">
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="200">
          </el-table-column>
          <el-table-column prop="phone" label="联系方式" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <!--scope.row获取当前的数据对象 -->
                <el-button type="success" size="medium" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit" style="margin-left:5px"></i></el-button>
                <el-popconfirm
                        confirm-button-text='确定'
                        cancel-button-text='我再想想'
                        icon="el-icon-info"
                        icon-color="red"
                        title="您确定删除吗？"
                        @confirm="handleDelete(scope.row.id)"
                        style="margin-left:5px"
                >
                <el-button type="danger" size="medium"  slot="reference">删除<i class="el-icon-delete"></i></el-button>
                </el-popconfirm>
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

        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
          <el-form :model="form" >
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.uname" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户状态" :label-width="formLabelWidth">
              <el-select  v-model="select" placeholder="请选择状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="已禁用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="saveUser" type="primary">确 定</el-button>
            <el-button  @click="dialogFormVisible = false">取消</el-button>

          </div>
        </el-dialog>

      </el-main>
    </el-container>
  </el-container>
</template>

<style>
 .el-container{
   min-height: 100vh
 }
  .menu-logo{
    height:60px;
    line-height: 60px;
    text-align: center
  }
  .menu-logo img{
    width:20px;
    position:relative;
    top:5px;
  }
  .menu-logo b{
    color:white;
    margin-left: 3px
  }

  .el-dropdown {
    width:20px;
  }
  .el-dropdown i{
    margin-right: 5px;
    font-size:16px;
  }
  .el-breadcrumb{
    margin-top:15px;
  }
  .el-main .search-wrapper{
    margin-top: 15px;
    width:600px;
    display:flex;
    height:40px;
    line-height: 40px;
  }
  .el-main .btn-group{
    margin-top: 20px;
    margin-left:20px;
  }
 .el-main .btn-group .el-button{
   margin-left:15px;
 }
 .el-select .el-input {
   width: 130px;
 }
 .input-with-select .el-input-group__prepend {
   background-color: #fff;
 }
  .el-table{
    margin-top:30px;
  }

</style>

<script>
  import Aside from "@/components/Aside";
  import Header from "@/components/Header";
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };

      return {
        form: {
          uname: '',
          phone:'',
          address:'',

        },
        dialogFormVisible:false,
        formLabelWidth:'100px',
        input1: '',
        uname:'',
        total:0,
        input2: '',
        select: '',
        tableData: [],
        multipleSelection: [],
        pageNum:1,
        pageSize:2,
        collapseBtnClass: 'el-icon-s-fold',
        isCollapse: false,
        sideWidth: 200,
        logTextShow: true,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
    },
    components:{
      Aside,
      Header
    },
    created() {
      //请求分页查询数据
     this.load()

    },
    methods:{
      //点击收缩按钮触发收缩函数
      collapse(){
        this.isCollapse = !this.isCollapse;
        if(this.isCollapse)
        {
          this.sideWidth = 64
          this.collapseBtnClass = "el-icon-s-unfold"
          this.logTextShow = false
        }
        else{
          this.sideWidth = 200
          this.collapseBtnClass = "el-icon-s-fold"
          this.logTextShow = true
        }

      },
      handleSizeChange(pageSize){
         this.pageSize = pageSize
        this.load()
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
      handleDelete(id){
         this.request.delete("/user/delete/"+id).then(res=>{
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
        this.request.post("/user/delete_batch",id_list).then(res=>{

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
        this.request.post("/user/save",this.form).then(res=>{
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
        this.request.get("http://localhost:8080/user/search_page",{
          params:{
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            uname:this.uname,

          }
        }).then(res=>{
          console.log(res)
          this.tableData = res.records
          this.total = res.total
        })
      },
    }

  };
</script>
