<template>


  <el-main>
    <div class="img">
      <el-card shadow="always" style="width: 600px;margin-left: 25%;margin-top: 4%">
        <el-badge :value="notification_unread" class="item">
          <el-button size="small"><i class="el-icon-bell"></i></el-button>
        </el-badge>
        <br>
        <el-avatar
            :size="100"
            :src="form.avatar"
            style="text-align: center; margin-left: 42%"></el-avatar>
        <el-form label-width="80px"
                 size="small"
                 style="padding: 15px">
          <el-form-item label="员工编号">
            <el-input v-model="form.adminId" auto-complete="off" disabled="true"></el-input>
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
          <el-button type="primary" @click="dialogFormVisible=true">修改密码</el-button>
          <el-button style="" type="danger" @click="logout">退出登录</el-button>
        </div>
      </el-card>

      <el-dialog :visible.sync="dialogFormVisible" title="修改密码">
        <el-form ref="pass" :model="pwdForm" :rules="rules" label-width="120px" size="small" style="margin-top: 20px">
          <el-form-item label="输入当前密码">
            <el-input v-model="form.password" auto-complete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="输入新密码">
            <el-input v-model="form.newPwd" auto-complete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="form.confirmPwd" auto-complete="off" show-password></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="danger" @click="savePwd">确认修改</el-button>
          <el-button type="primary" @click="dialogFormVisible=false">取消</el-button>
        </div>
      </el-dialog>

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
      notification_unread: null,
      form: {
        adminId: '',
        admin_name: '',
        avatar: '',
        tel: '',
        eamil: '',
        admin_realname: ''
      },
      admin_id: '',
      pwdForm: {},
      rules: {
        password: [
          {required: true, message: '请输入原密码', trigger: 'blur'},
          {min: 9, message: '长度不少于9位，不超过32位', trigger: 'blur'}
        ],
        newPwd: [
          {required: true, message: '长度不少于9位，不超过32位', trigger: 'blur'},
          {min: 9, message: '', trigger: 'blur'}
        ],
        confirmPwd: [
          {required: true, message: '长度不少于9位，不超过32位', trigger: 'blur'},
          {min: 9, message: '', trigger: 'blur'}
        ],
      },

      dialogFormVisible: false,
      admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {}
    }


  },

  created() {
    this.getUser()
    this.getNotificationUnread()

  },
  methods: {

    getUser() {
      this.request.get("/admin/adminInfo/" + this.admin.id).then(res => {
        this.form.adminId = res.data.adminId
      })
    },


    getNotificationUnread() {
      this.request.get("/admin/article/search_page", {
        params: {
          pageNum: 2,
          pageSize: 2,
          status: 0

        }
      }).then(res => {
        this.notification_unread = res.data.total
      })
    },

    save() {
      this.request.post("/admin/adminInfo", this.form).then(res => {
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

    savePwd() {
      this.$refs.pass.validate((valid) => {
        if (valid) {
          if (this.form.newPwd !== this.form.confirmPwd)
            this.$message.error("两次输入的密码不一致")
          return false
        }
        this.request.post("/admin/password", this.form).then(res => {
          if (res.success) {
            this.$message.success('修改成功')

          } else {
            this.$message.error('修改失败')
          }
        })
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

.item {
  margin-top: 10px;
  margin-right: 40px;
}

</style>