<!-- 这个封装的是上层导航栏组件-->

<template>

  <el-header>
    <div class="collapse">
      <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">文章审核</a></el-breadcrumb-item>

      </el-breadcrumb>
    </div>


    <div class="nav-icon">
      <i id="person-icon" class="el-icon-s-custom" style="margin-right: 5px"></i>
      <span>{{ realname }}</span>
      <el-dropdown>
        <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
        <el-dropdown-menu slot="dropdown"
        >
          <el-dropdown-item @click.native="toPersonalCenter">个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="toMessageCenter">消息中心</el-dropdown-item>
          <el-dropdown-item @click.native="toChangePassword">修改密码</el-dropdown-item>
          <el-dropdown-item divided style="" @click.native="logout">退出账号</el-dropdown-item>
        </el-dropdown-menu>

      </el-dropdown>
    </div>

  </el-header>



</template>

<script>
    export default {
      name: "Header",
      props: {
        collapseBtnClass: String,
        collapse: Function,
        realname: String,

      },

      computed: {
        currentPathName() {
          return this.$store.state.currentPathName;
        }

      },

      data() {
        return {}
      },

      methods: {
        toPersonalCenter: function () {
          this.$router.replace('/admin/PersonalCenter')
        },
        logout: function () {
          this.$store.commit("logout")
          this.$message.success("退出成功")

        },
        toChangePassword: function () {
          this.$router.replace('/admin/ChangePassword')
        },
        toMessageCenter: function () {
          this.$router.replace('/admin/MessageCenter')
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

    .collapse .el-breadcrumb {
      display: inline-block;
      margin-left: 5px;
    }

    .nav-icon {
      height: 30px;
      line-height: 30px;
      margin-top: 15px
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }

</style>


