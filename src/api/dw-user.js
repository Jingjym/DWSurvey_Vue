import request from '@/utils/request'
import API from '@/api/index.js'

// 登录方法
export function dwUserInfo () {
  return request({
    url: API.curUserInfo,
    method: 'get'
  })
}

// 退出方法
export function dwUserPwd (curpwd, pwd) {
  const params = {
    curpwd,
    pwd
  }
  return request({
    url: API.curUserPwdUpdate,
    method: 'post',
    params
  })
}

// 修改用户信息
export function dwUserInfoUpdate (email, sex, birth) {
  const params = {
    email,
    sex,
    birth
  }
  return request({
    url: API.curUserInfoUpdate,
    method: 'post',
    params
  })
}

