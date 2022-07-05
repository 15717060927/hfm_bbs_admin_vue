<template>
  <el-main>
    <el-card shadow="always"
             style="width: 600px;
                     margin-left: 25%;
                     margin-top: 4%">
      <el-form :rules="rules">
        <el-form-item label="输入您的当前密码">
          <el-input v-model="oldPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="输入您的新密码">
          <el-input v-model="newPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认您的新密码">
          <el-input v-model="againPwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="danger" @click="submit">确认修改</el-button>
      </div>

    </el-card>


  </el-main>
</template>

<script>
  import { Md5 } from 'ts-md5'
export default {
  name: "ChangePassword",
  data() {
    const equalToOldPassword = (rule, value, callback) => {
      if (this.initialPwd !== Md5.hashStr("oldPwd").toUpperCase()) {
        callback(new Error("输入的密码错误"));
      } else {
        callback();
      }
    };
    const equalToPwd = (rule, value, callback) => {
      if (this.newPwd !== this.againPwd) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      oldPwd: '',
      newPwd: '',
      againPwd: '',
      initialPwd: '',
      rules: {
        oldPwd: [
          {required: true, message: "旧密码不能为空", trigger: "blur"},
          {required: true, validator: equalToOldPassword, trigger: "blur"}
        ],
        newPwd: [
          {required: true, message: "新密码不能为空", trigger: "blur"},
          {min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur"}
        ],
        againPwd: [
          {required: true, message: "确认密码不能为空", trigger: "blur"},
          {required: true, validator: equalToPwd, trigger: "blur"}
        ]
      }

    }

  },
  created() {
    if (this.utils.getObjectFromLocalStorage("user")) {
      this.initialPwd = this.utils.getObjectFromLocalStorage("user").password;
    }
    ;
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            // this.request.get()
        }
      });
    },


  },


}
</script>

<style scoped>


</style>