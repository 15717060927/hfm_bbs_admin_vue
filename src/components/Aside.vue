<!--此组件封装的是页面的侧边栏 -->

<template>
    <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" style="min-height:100%;overflow-x:hidden; "
                 background-color="rgb(40,46,56) "
                 text-color="#fff"
                 active-text-color="	#87CEFA"
                 :collapse-transition="false"
                 :collapse="isCollapse"
        >
            <div class="menu-logo" >
                <img src="../assets/logo.png" alt="" >
                <b  v-show="logTextShow">后台管理系统</b>
            </div>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </template>
                <el-menu-item-group>
                    <template slot="title" style="position:relative;top:5px;height:200px">首页</template>

                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title" style="position:relative;top:5px;height:200px">用户管理</template>

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