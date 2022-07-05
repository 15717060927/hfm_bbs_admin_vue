<template>
    <div class="wrapper">
        <div class="login-panel">
            <div class="login-panel-left">
                <img :src=" imgUrl" style="width:260px;height:220px;margin:50px 30px">
            </div>
            <div class="login-panel-right">

                    <span class="normal-text pwd-needy-text">echo后台管理系统</span>



                <el-form ref="userForm" :model="userForm" :rules="formRule" class="login-form">
                    <el-form-item prop="userName">
                        <el-input v-model="userForm.userName" placeholder="手机/邮箱/用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input id="input-password" v-model="userForm.password" placeholder="密码" type="password">
                            <span id="input-suffix" slot="suffix" class="iconfont icon-eye" v-on:click="onPwdButtonClick"></span>
                        </el-input>
                    </el-form-item>

                </el-form>


<!--                <router-link class="register" to="/signup">加入码社</router-link>-->
                <div class="forget-pwd">忘记密码</div>

                <div>
                    <el-button id="login-button" type="primary" v-on:click="onLoginButtonClick">登录</el-button>
                </div>

                <div class="other-login-method">其他登录方式</div>

            </div>
        </div>

    </div>

</template>

<script>
    import {login} from "@/api/api";
    import Cookies from "js-cookie"

    function onPwdButtonClick() {
        let icon = document.getElementById("input-suffix")
        let inputDom = document.getElementById("input-password")
        if (icon.classList.contains("icon-eye")) {
            icon.classList.remove("icon-eye")
            icon.classList.add("icon-eye-close")
            inputDom.type = "text"
        } else if (icon.classList.contains("icon-eye-close")) {
            icon.classList.remove("icon-eye-close")
            icon.classList.add("icon-eye")
            inputDom.type = "password"
        }
    }

    function onLoginButtonClick() {
        // 先清空本地Cookie
        //检查合法性        this.utils.clearCookieByName("token")
        this.utils.clearCookieByName("token")
        if (this.utils.isFormValid('userForm', this)) {
            login(this.userForm.userName, this.userForm.password).then(res => {
                if (this.utils.isRequestSuccess(res)) {
                    // 浏览器存入token
                    let token = res.data.token
                    let user = res.data.user
                    if (token != null) {
                        // 使用js-cookie来传， 默认token过期时间是一天
                        Cookies.set('token', token, {expires: 1})
                    }
                    if (user != null) {
                        this.utils.setObjectToLocalStorage("user", user)
                    }
                    console.log(this.utils.getObjectFromLocalStorage("user"))
                    // 登录成功
                    this.$router.push("/admin/index")
                } else {
                    // 提示错误信息
                }
            }).catch(err => {
            })
        }
    }
    export default {
        name: "login.vue",
        props: {
            msg: String
        },
        methods: {
            onPwdButtonClick,
            onLoginButtonClick,

        },
        data() {
            return {
                userForm: {
                    userName: "",
                    password: ""
                },
                formRule: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur'}
                    ]
                },
                imgUrl:require('@/static/background.png'),

            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/iconfont/iconfont.css";

    .wrapper{
        height:100vh;
        overflow: hidden;
        background-image: url('../static/test.jpg');
        background-repeat:no-repeat;
        background-size: 100% 100%;
        display:flex;
        justify-content:center
    }
    .login-panel{
        display:flex;
    }

    .login-panel-left{
        width:350px;
        height:400px;
        padding:20px;
        overflow: hidden;
        background-color: white;
        border-radius: 5px;
        margin-top:100px;
        background-color: rgb(235,238,245);
        opacity: 80%;
    }

    .login-panel-right {
      margin-top:100px;
        margin-left:0;
        width:400px;
        height:400px;
        padding:20px;
        overflow: hidden;
        background-color: white;
        border-radius: 5px;
        opacity: 80%;
    }

    .text-field {
        margin-top: 16px;
        overflow: hidden;
        height: 40px;
    }

    .normal-text {
        margin-left: 20px;
        font-size: 20px;
        font-weight: bold;
        color: black;
        height: 30px;
    }


    .forget-pwd {
        float: right;
        font-size: 14px;
        margin-right: 18px;
        color: #b1b9d5;
    }

    .register {
        float: left;
        font-size: 14px;
        margin-left: 22px;
        color: #b1b9d5;
        text-decoration: none;
    }

    .other-login-method {
        width: fit-content;
        margin: 20px auto;
        color: #b1b9d5;
        font-size: small;
    }

    #login-button {
        width: 300px;
        margin-top: 20px;
        margin-left: 25px;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #0066ff;
    }

    #login-button:hover {
        background-color: #135dd0;
    }

    .login-form {
        margin-top:10px;
        padding: 20px;
    }

    /deep/ .el-input__inner {
        border: 0;
        border-bottom: 1px solid #ebebeb;
        border-radius: 0;
        padding: 5px;
        font-size: 16px;
        color: black;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }


</style>