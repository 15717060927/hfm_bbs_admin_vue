<template>
  <el-main>
    <el-card shadow="always"
             style="width: 600px;
                     margin-left: 25%;
                     margin-top: 4%">
      <el-form ref="pass" :model="form" :rules="rules" label-width="120px" size="small" style="margin-top: 20px">
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
        <el-button type="danger" @click="save">确认修改</el-button>
      </div>
    </el-card>
  </el-main>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      form: {},
      admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {},
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
      }
    }

  },
  created() {
    this.form.adminName = this.admin.adminName
  },
  methods: {
    save() {
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

    }

  }

}
</script>

<style scoped>


</style>