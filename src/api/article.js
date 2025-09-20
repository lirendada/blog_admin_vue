import request from '@/utils/request'

// 获取文章列表
export const articleApi = (query) => {
    return request({
        method: 'get',
        url: '/article',
        params: query
    })
}

// 删除文章
export const delArticleApi = (id) => {
    return request({
        method: 'delete',
        url: `/article/${id}`
    })
}

// 获取文章详细信息
export const articleDetailApi = (id) => {
    return request({
        method: 'get',
        url: `/article/${id}`
    })
}