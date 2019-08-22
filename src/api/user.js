import request from '@/utils/request'

export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}
// 拉黑作者
export const blackUserList = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}
// 获取用户自己的信息
export const getUserInfo = () => {
  return request.get('/app/v1_0/user')
}
// 获取用户个人资料接口
export const getUserProfile = () => {
  return request.get('/app/v1_0/user/profile')
}
// 图片上传的接口
export const uploadPhoto = (name, file) => {
  const formData = new FormData()
  formData.append(name, file)
  return request.patch('/app/v1_0/user/photo', formData)
}
