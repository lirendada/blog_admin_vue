/* 功能：本地存储token键名 */

const TOKEN_KEY = 'LOCAL-TOKEN-KEY'

// 存键
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

// 查键
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

// 删键
export const delToken = (token) => {
    localStorage.removeItem(TOKEN_KEY)
}