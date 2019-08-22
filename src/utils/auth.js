// 操作本地存储的方法封装
export const setUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user))
}
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem('user'))
}
export const removeUser = () => {
  return window.localStorage.removeItem('user')
}
