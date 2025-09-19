/* 封装axios用于发送请求 */
import axios from 'axios'
import { getToken } from './token';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import router from '@/router'

const STATUS_CODE = {
    'success': 10000,
    'unauthorized': 401
}

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000 // 请求超时时间
});

// 请求拦截器：每次请求发出之前都会经过该拦截器
instance.interceptors.request.use(
    (config) => {
        // 每次请求带上token（如果有的话）
        const token = getToken()
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },  
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器：每次响应数据给调用处之前会经过该拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据进行简化，再返回
        const { data:resp } = response
        const { code, data, message } = resp        
        
        if(code === STATUS_CODE.success) {
            return data
        }
        return Promise.reject(message)
    }, 
    (error) => {
        // 走到这说明发生了 4xx、5xx 等错误，比如token过期
        const { status, data: {message} } = error.response

        ElMessage.error(message)

        if(status === STATUS_CODE.unauthorized) {
            const userStore = useUserStore()
            // 清除token
            userStore.clearRequest()
            // 跳转到登陆页面
            router.push(`/login?redirectUrl=${router.currentRoute.value.path}`)
        }
        
        return Promise.reject(message);
    }
);

export default instance;