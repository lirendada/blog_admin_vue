<script setup>
    import { ElMessage } from 'element-plus';
    import { reactive, ref } from 'vue';
    import { useUserStore } from '@/stores/userStore';
    import { useRouter, useRoute } from 'vue-router'

    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()

    const loginForm = reactive({
        username: '',
        password: ''
    })

    const rules = {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名长度范围：3-10个字符', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '密码长度范围：3-10个字符', trigger: 'blur' }
        ]
    }

    const onLogin = () => {
        loginFormRef.value.validate(async (isValid) => {
            if(isValid === false) {
                return ElMessage.error('请进行合法输入！')
            }
            
            try {
                // 进行网络登录请求
                // 注意这里必须加 await，因为返回的是promise，需要让程序停在这里而不是直接往下面执行
                await userStore.loginRequest(loginForm)
                ElMessage.success('登录成功！')

                router.push(route.query.redirectUrl || '/') // 登录后跳回原先地址，若不存在则跳回首页
            } catch (e) {
                ElMessage.error(e.message || e)
            }
        })
    }

    const onCancel = () => {
        loginFormRef.value.resetFields()
    }

    const loginFormRef = ref(null)
</script>

<template>
<div class="login-box">
    <el-card>
        <template #header>
            <div class="card-header">
                <span>文章管理系统</span>
            </div>
        </template>

        <el-form 
            :model="loginForm"
            :rules="rules"
            ref="loginFormRef"
        >
            <el-form-item prop="username">
                <el-input 
                    placeholder="请输入用户名" 
                    prefix-icon="User" 
                    type="text" 
                    clearable
                    v-model="loginForm.username">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input 
                    placeholder="请输入密码" 
                    prefix-icon="Lock" 
                    type="password" 
                    show-password 
                    clearable
                    v-model="loginForm.password">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin">登 录</el-button>
                <el-button @click="onCancel">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<style scoped lang="scss">
    .login-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background: url('@/assets/hya1.jpg') center/cover;

        .el-card {
            width: 35vw;
            // :deep(选择器)  是scss样式穿透的语法，以下情况用到样式穿透：
            //   1. 当前组件的 style 添加了 scoped
            //   2. 修改的是第三方组件内部元素的样式
            :deep(.el-card__header) {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--el-color-primary);
                text-align: center;
                color: white;
                span {
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }

        .el-form {
            padding: 10px 20px;

            .el-form-item:nth-child(2) {
                margin: 20px 0px;
            }

            .el-input {
                height: 40px;
                font-size: 16px;
            }

            .el-form-item:last-child {
                :deep(.el-form-item__content) {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }
            }
        }
    }
</style>