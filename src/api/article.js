import request from '@/utils/request'

// 获取文章信息
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