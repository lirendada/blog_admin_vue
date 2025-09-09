// 本地存储token键名
const TOKEN_KEY = 'LOCAL-TOKEN-KEY'

// 存键
const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

// 查键
const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

// 删键
const delToken = (token) => {
    localStorage.removeItem(TOKEN_KEY)
}