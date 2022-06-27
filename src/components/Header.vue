<!-- 这个封装的是上层导航栏组件-->

<template>

  <el-header>
    <div class="collapse">
      <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
      <el-breadcrumb separator="/" >
        <el-breadcrumb-item :to="{ path: '/' }">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">文章审核</a></el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="nav-icon">
      <i id="person-icon" class="el-icon-s-custom" style="margin-right: 5px"></i>
      <span @click="toPersonalCenter">吴磊</span>

    </div>

  </el-header>



</template>

<script>
    export default {
        name: "Header",
        props: {
            collapseBtnClass: String,
            collapse: Function
        },
        methods: {
            toPersonalCenter: function () {
                this.$router.replace('/admin/PersonalCenter')
            }
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
    .collapse .el-breadcrumb{
      display:inline-block;
      margin-left:5px;
    }
    .nav-icon{
        height:30px;
        line-height: 30px;
        margin-top: 15px
    }

</style>


