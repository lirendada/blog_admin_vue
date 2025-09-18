import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi, userApi } from '@/api/user.js'
import { setToken, getToken, delToken } from '@/utils/token.js'


export const useUserStore = defineStore('user', () => {
    const user_token = ref(getToken() || '')

    const user_info = ref({})

    const setToken__ = (token) => {
        // 保存pinia以及本地的token
        user_token.value = token
        setToken(token)
    }

    const loginRequest = async (loginForm) => {
        const resp = await loginApi(loginForm)
        // console.log(resp.data.data.token);
        
        setToken__(resp.token) // 不需要resp.data.data.token，因为在响应拦截器里面简化了
        
        loginForm.username = ''
        loginForm.password = ''
    }

    const userRequest = async () => {
        const resp = await userApi() // 获取用户信息
        user_info.value = resp
    }

    const clearRequest = () => {
        user_token.value = ''
        delToken()
    }

    return {
        user_token,
        user_info,
        loginRequest,
        userRequest,
        clearRequest
    }
})