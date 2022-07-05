<!-- 这个封装的是上层导航栏组件-->

<template>

  <el-header>
    <div class="collapse">
      <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
      <el-breadcrumb separator="/" >
        <el-breadcrumb-item
                :to="{ path: item.path }"
                v-for="item in breadcrumbList"
                :key = "item.path"

        >{{item.meta.title}}</el-breadcrumb-item>


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
          <el-dropdown-item @click.native="toChangePassword">修改密码</el-dropdown-item>
          <el-dropdown-item divided style="" @click.native="logout">退出账号</el-dropdown-item>
        </el-dropdown-menu>

      </el-dropdown>
    </div>

  </el-header>



</template>

<script>
  import utils from "@/utils/utils";
    export default {

      computed:{
        breadcrumbList(){
          return this.$route.matched
        }
      },
        name: "Header",
        props: {
            collapseBtnClass: String,
            collapse: Function,
            realname: String,

        },
        methods: {
            toPersonalCenter: function () {
                this.$router.replace('/admin/PersonalCenter')
            },
          logout() {
            this.request.post('/user/logout',{"userName": this.realname}).then(res=>{
              if (this.utils.isRequestSuccess(res.data)) {
                this.utils.removeObjectFromLocalStorage("user")
                this.$message.success("成功登出")
                window.location.reload()
              } else {
                this.$message.error("登出失败")
              }
            }).catch(err => {
              console.log(err)
            })
          },
          toChangePassword: function () {
            this.$router.replace('/admin/ChangePassword')
          },
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


    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }

</style>


