/* 封装axios用于发送请求 */
import axios from 'axios'
import { getToken } from './token';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000 // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // console.log(config);
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

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // console.log(response);
        const { data:resp } = response
        const { code, data, message } = resp        
        
        if(code === 10000) {
            return data
        }
        return Promise.reject(message)
    }, 
    (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;