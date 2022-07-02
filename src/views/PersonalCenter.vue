<template>


  <el-main>
    <div class="img">
      <el-card shadow="always"
               style="width: 600px;
                     margin-left: 25%;
                     margin-top: 4%">
        <el-avatar
            :size="100"
            :src="circleUrl"
            style="text-align: center; margin-left: 42%"
        ></el-avatar>
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
      circleUrl: '',
      form: '',
      admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {}
    }


  },

  created() {
    const adminName = this.admin.admin_name;
    if (!adminName) {
      this.$message.error("当前无法获取用户信息")
      return
    }
    this.load();
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
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    save() {
      this.request.post("/admin/save", this.form).then(res => {
            if (res) {
              this.$message.success("保存成功")
              this.load();
            } else {
              this.$message.error("保存失败,请重试")
            }
          }
      )
    },
    logout() {

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