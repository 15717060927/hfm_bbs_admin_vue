<!--此组件封装的是页面的侧边栏 -->

<template>

  <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246)">
    <el-menu :collapse="isCollapse" :collapse-transition="false"
             :default-active="$route.path"
             :default-openeds="[]"
             active-text-color="	#87CEFA"
             background-color="rgb(40,46,56) "
             default-active="activeIndex"
             router
             style="min-height:100%;overflow-x:hidden; " text-color="#fff"

    >

      <div class="menu-logo">
        <img alt="" src="../assets/logo.png">
        <b v-show="logTextShow">后台管理系统</b>
      </div>


      <el-menu-item index="/admin/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>


      </el-menu-item>

      <!--      <el-submenu index="1">-->
      <!--        <template slot="title">-->
      <!--          <i class="el-icon-s-custom"></i>-->
      <!--          <span slot="title">用户管理</span>-->
      <!--        </template>-->
      <!--        <el-menu-item index="/admin/user">用户管理</el-menu-item>-->
      <!--        <el-menu-item index="/admin/UserInfoManagement">用户信息管理</el-menu-item>-->

      <!--      </el-submenu>-->
      <el-menu-item index="/admin/UserInfoManagement">
        <i class="el-icon-s-home"></i>
        <span slot="title">用户管理</span>


      </el-menu-item>

      <el-submenu index="/admin/article">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">文章管理</span>
        </template>

        <el-menu-item index="/admin/article">文章审核</el-menu-item>


      </el-submenu>
    </el-menu>
  </el-aside>


</template>

<script>

    export default {
        name: "Aside",
        props: {
            isCollapse: Boolean,
            logTextShow:Boolean,
            sideWidth:Number
        }
    }

</script>

<style>

</style>