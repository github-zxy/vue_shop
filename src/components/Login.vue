<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <!-- 头像 -->
                <img src="../assets/logo.png" alt="" srcset="">
            </div>
            <div>
                <!-- 登录表单 -->
                <el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules"
                    ref="loginFormRef">

                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username">
                        </el-input>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input prefix-icon="iconfont icon-3702mima" type="password" v-model="loginForm.password">
                        </el-input>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button type="info" @click="resetLoginForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //登录表单数据绑定对象
                loginForm: {
                    username: "admin",
                    password: "123456"
                },
                //登录表单验证规则
                loginFormRules: {
                    username: [
                        { required: true, message: '请输入账户', trigger: 'blur' },
                        { min: 3, max: 16, message: '账户长度在 3 到 16 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        //事件绑定方法
        methods: {
            //点击重置按钮,重新登录表单
            resetLoginForm() {
                //测试 console.log(this);
                this.$refs.loginFormRef.resetFields()
            },
            //点击登录按钮
            login() {
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return;
                    const { data: res } = await this.$http.post("login", this.loginForm)
                    if (res.meta.status != 200) return this.$message.error("登陆失败,请重新登录!")
                    this.$message.success("登录成功!")
                    //1.将登录成功的token,保存到客户端的sessionStorage中!
                    // 1.1.未登录前,其他接口API都不能使用
                    //1.2.token只能在网站打开期间有效,所以token 保存在sessionStorage
                    console.log(res);
                    window.sessionStorage.setItem("token", res.data.token)
                    //编程时导航跳转home页面
                    this.$router.push("/home")
                })
            }

        }
    }
</script>


<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        height: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
    }

    .avatar_box img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>