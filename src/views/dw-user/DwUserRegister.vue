<template>
  <div id="loginPage" >
    <el-row :gutter="0">
      <el-col :span="10" :offset="7">
        <div class="loginFormContent" >
          <div style="text-align: center;">
            <h3>欢迎注册</h3>
            <div>
              <el-tag type="success">调问</el-tag>
              <el-tag type="warning">专业</el-tag>
              <el-tag>开源</el-tag>
              <el-tag type="success">实用的</el-tag>
              <el-tag type="warning">调查问卷系统</el-tag>
            </div>
          </div>
          <div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-position="top" label-width="100px" class="demo-ruleForm" @submit.native.prevent >
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.userName" placeholder="请设置登录账号" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" placeholder="请设置登录密码" autocomplete="off" show-password ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" placeholder="重新输入密码确认密码无误" show-password ></el-input>
              </el-form-item>
              <el-form-item label="出生年月" prop="birth">
                <el-date-picker v-model="ruleForm.birth" type="date" placeholder="请选择出生年月"></el-date-picker>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex" type="string" placeholder="仅可填「男」或「女」" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" type="email" placeholder="请填入未注册过的邮箱" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" type="string" placeholder="请输入您的电话号码" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit" style="width: 100%;" @click="register('ruleForm')">确认注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DwAuthorized from '../../utils/dw-authorized'
import {msgError} from '../../utils/dw-msg'
import {dwRegister} from '@/api/dw-register'

export default {
  name: 'Register',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入的密码不一致，请检查'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        pass: '',
        checkPass: '',
        birth: '',
        sex: '',
        email: '',
        phone: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass, trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请填写性别', trigger: 'blur'},
          {type: 'enum', enum: ['男', '女']}
        ],
        birth: [
          {required: true, message: '请输入生日', trigger: 'blur'},
          {type: 'date', format: 'yyyy-MM-dd', message: '请输入正确格式的日期', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入正确的邮箱作为用户名', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入正确长度的电话号码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.pageH = window.height
  },
  methods: {
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dwRegister(this.ruleForm.userName, this.ruleForm.pass, this.ruleForm.birth, this.ruleForm.sex, this.ruleForm.email, this.ruleForm.phone).then((response) => {
            const resultData = response.data
            console.log('login-begin')
            console.log(resultData)
            if (resultData.status === 'ok') {
              DwAuthorized.setAuthority(resultData.currentAuthority)
              DwAuthorized.setUserName(this.ruleForm.userName)
              this.$router.push('/dw/survey/')
            } else {
              if (resultData.hasOwnProperty('httpResult') && resultData.httpResult != null && resultData.httpResult.hasOwnProperty('resultMsg')) {
                msgError(resultData.httpResult.resultMsg)
              } else {
                msgError('注册失败，请确认！')
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>

<style scoped>
#loginPage {
    /*background-image: url("http://localhost:8181/diaowen/images/style-model/login_bg/1.jpg");*/
}

.loginFormContent {
  padding: 20px;
  margin-top: 50px;
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 3px;
}
</style>
