import request from '@/utils/request'
import API from '@/api/index.js'

// 注册方法
export function dwRegister (userName, password, birth, sex, email, phone) {
  const params = {
    userName,
    password,
    birth,
    sex,
    email,
    phone,
    type: 'account'
  }
  return request({
    url: API.registerAccount,
    method: 'post',
    params
  })
}

