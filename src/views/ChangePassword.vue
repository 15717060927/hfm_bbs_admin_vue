<template>
  <el-main>
    <el-card shadow="always"
             style="width: 600px;
                     margin-left: 25%;
                     margin-top: 4%">
      <el-form>
        <el-form-item label="输入您的当前密码">
          <el-input v-model="form.oldPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="输入您的新密码">
          <el-input v-model="form.newPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认您的新密码">
          <el-input v-model="form.newPwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="danger" @click="saveAndLogout">确认修改</el-button>
      </div>

    </el-card>


  </el-main>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      form: ''
    }

  },
  methods: {
    saveAndLogout: function () {

    }

  }

}
</script>

<style scoped>


</style>