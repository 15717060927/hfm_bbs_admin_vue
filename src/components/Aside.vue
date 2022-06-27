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


      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title" style="">首页</span>
        </template>
        <el-menu-item-group>

          <template slot="title">首页</template>

        </el-menu-item-group>
      </el-submenu>


      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>

          <template slot="title">用户管理</template>
          <el-menu-item index="/admin/UserInfoManagement" router="">用户信息查看</el-menu-item>

        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
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

<style scoped>

</style>