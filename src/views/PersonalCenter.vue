<template>


  <el-main>
    <div class="img">
      <el-card shadow="always"
               style="width: 600px;
                     margin-left: 25%;
                     margin-top: 4%">
        <el-avatar
            :size="100"
            :src="url"
            style="text-align: center; margin-left: 42%"
        ></el-avatar>
        <el-form label-width="80px"
                 size="small"
                 style="padding: 15px">
          <el-form-item label="员工编号">
            <el-input v-model="admin.adminId" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="admin.adminName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="admin.adminRealname" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="admin.tel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="admin.email" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>

        <div style="text-align: center">
          <el-button type="primary" @click="save">确定并保存</el-button>
          <el-button style="" type="danger" @click="logout">退出登录</el-button>
        </div>
      </el-card>
    </div>


  </el-main>

</template>

<script>

export default {
  name: "PersonalCenter",
  data() {
    return {
      isCollapse: false,
      collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      logTextShow: true,
      circleUrl: '',
      admin:{
         adminId:'',
         adminName:'',
         adminRealname:'',
         tel:'',
         email:'',
        avatar:''
      },
      url:require('@/static/avatar.jpg'),

    }


  },

  created() {

    // this.load();
    if (this.utils.getObjectFromLocalStorage("user")) {
      this.admin.adminId = this.utils.getObjectFromLocalStorage("user").adminId;
      this.admin.adminName = this.utils.getObjectFromLocalStorage("user").userName;
      this.admin.adminRealname = this.utils.getObjectFromLocalStorage("user").adminRealname;
      this.admin.tel= this.utils.getObjectFromLocalStorage("user").tel;
      this.admin.email = this.utils.getObjectFromLocalStorage("user").email;
      this.admin.avatar = this.utils.getObjectFromLocalStorage("user").avatar;
      this.hasLogin = true
    }
  },
  methods: {
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

    logout() {
      this.request.post('/user/logout',{"userName": this.admin.adminName}).then(res=>{
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
    load() {
      this.request.get("http://localhost:8080/admin/loadPersonalInfo", {}
      )

    }


  }
}
</script>

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
  position: relative;
  top: 5px;
}

.menu-logo b {
  color: white;
  margin-left: 3px
}

.el-dropdown {
  width: 20px;
}

.el-dropdown i {
  margin-right: 5px;
  font-size: 16px;
}

.el-breadcrumb {
  margin-top: 15px;
}

.el-main .search-wrapper {
  margin-top: 15px;
  width: 600px;
  display: flex;
  height: 40px;
  line-height: 40px;
}

.el-main .btn-group {
  margin-top: 20px;
  margin-left: 20px;
}

.el-main .btn-group .el-button {
  margin-left: 15px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-table {
  margin-top: 30px;
}


</style>