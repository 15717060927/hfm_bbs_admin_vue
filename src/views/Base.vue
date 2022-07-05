<template>

  <el-container style="min-height: 100vh" >

      <Aside :is-collapse="isCollapse" :log-text-show="logTextShow" :side-width="sideWidth" />

    <el-container>
    <el-header>
      <Header :collapse-btn-class="collapseBtnClass" :collapse="collapse" :realname="admin.adminRealname" />
    </el-header>
      <el-main style="padding-top: 5px; ">
        <!--        表示当前页面的子路由在这里展示-->
        <router-view/>

      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-container {
  min-height: 100vh
}

.menu-logo {
  height: 60px;
  line-height: 60px;
  text-align: center
}

.menu-logo img {
  width: 20px;
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
    };
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
        sideWidth: 200,
        logTextShow: true,
      admin:{
        adminRealname:'',
        avatar:'',

      },
      };
    },
    components:{
      Aside,
      Header
    },
    created() {
      //请求分页查询数据
      // this.getAdmin()
      if (this.utils.getObjectFromLocalStorage("user")) {
        this.admin.adminRealname = this.utils.getObjectFromLocalStorage("user").adminRealname;
        this.admin.avatar = this.utils.getObjectFromLocalStorage("user").avatar;
        this.hasLogin = true
      }
    },
    methods: {
      //点击收缩按钮触发收缩函数
      collapse() {
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
          this.sideWidth = 64
          this.collapseBtnClass = "el-icon-s-unfold"
          this.logTextShow = false
        } else {
          this.sideWidth = 200
          this.collapseBtnClass = "el-icon-s-fold"
          this.logTextShow = true
        }

      },


      // getAdmin(){
      //   let adminRealname = localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")).admin_realname :""
      //   if(adminRealname){
      //     this.request.get("/admin/adminRealname").then(res=>{
      //       this.admin = res.data
      //         })
      //   }
      // }

    }

  };

</script>
