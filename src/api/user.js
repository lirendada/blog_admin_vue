import request from '@/utils/request'

export const loginApi = (loginForm) => {
    // 注意要return，不然外部拿到的是undefined
    return request({
        method: 'post',
        'url': '/login',
        data: loginForm
    });
}