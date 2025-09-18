import request from '@/utils/request'

// 发起登录请求
export const loginApi = (loginForm) => {
    // 注意要return，不然外部拿到的是undefined
    return request({
        method: 'post',
        'url': '/login',
        data: loginForm
    });
}

// 获取用户信息
export const userApi = () => {
    return request({
        method: 'get',
        'url': '/profile'
    });
}