import request from '@/utils/request'
import API from '@/api/index.js'

// 登录方法
export function dwUserInfo () {
  return request({
    url: API.curUserInfo,
    method: 'get'
  })
}

export function dwAnswerUserInfo (id) {
  const params = {
    id
  }
  return request({
    url: API.surveyAnswerUserInfo,
    method: 'post',
    params
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
export function dwUserInfoUpdate (userName, birth, sex, email, phone) {
  const params = {
    userName,
    birth,
    sex,
    email,
    phone,
    type: 'account'
  }
  return request({
    url: API.curUserInfoUpdate,
    method: 'post',
    params
  })
}

