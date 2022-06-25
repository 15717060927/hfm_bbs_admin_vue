<!-- 这个封装的是上层导航栏组件-->

<template>
    <el-header>
        <div class="collapse" >
            <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
            <span class="collapse-text">后台管理系统</span>
        </div>
        <div class="nav-icon" >
            <i class="el-icon-s-custom" id="person-icon" style="margin-right: 5px"></i>
            <span>吴磊</span>
            <el-dropdown >
                <i class="el-icon-arrow-down" style="margin-left: 5px" ></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出账号</el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>
        </div>

    </el-header>



</template>

<script>
    export default {
        name: "Header",
        props:{
            collapseBtnClass:String,
            collapse:Function
        }
    }
</script>

<style scoped>
    .el-header{
        line-height:60px;
        display: flex;
        font-size: 14px;
        border-bottom: 1px solid #ccc;

    }


    .collapse{
        flex:1;
        font-size:18px
    }
     .collapse .collapse-text{
        position:relative;
        bottom:2px;
        margin-left: 6px;
        font-size:16px;
    }
    .nav-icon{
        height:30px;
        line-height: 30px;
        margin-top: 15px
    }
</style>