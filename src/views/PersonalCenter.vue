<template>


  <el-main>
    <div class="img">
      <el-card shadow="always"
               style="width: 600px;
                     margin-left: 25%;
                     margin-top: 4%">

        <el-button circle style="margin-left: 90%" @cilck="gotoArticleManage"><i class="el-icon-bell"></i></el-button>
        <el-avatar
            :size="100"
            :src="form.avatar"
            style="text-align: center; margin-left: 42%"></el-avatar>
        <el-form label-width="80px"
                 size="small"
                 style="padding: 15px">
          <el-form-item label="员工编号">
            <el-input v-model="form.admin_id" auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.admin_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.admin_realname" auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.tel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" auto-complete="off"></el-input>
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
      form: {},
      admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {}
    }


  },

  created() {
    this.getUser().then(res => {
      console.log(res)
      this.form = res
    })
  },
  methods: {
    async getUser() {
      return (await this.request.get("/admin/PersonalCenter/" + this.admin.id)).data
    },

    show() {

    },
    gotoArticleManage: function () {
      this.$router.replace('/admin/article')
    },

    save() {
      this.request.post("/admin/savePersonalInfo", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")

          this.getUser().then(res => {
            res.token = JSON.parse(localStorage.getItem("admin")).token
            localStorage.setItem("admin", JSON.stringify(res))
          })
        } else {
          this.$message.error("保存失败,请重试")
        }
      })
    },
    logout() {

    },

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