<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-user-body">
          <el-row>
            <el-col :span="4" style="height: 600px;">
              <dw-user-menu></dw-user-menu>
            </el-col>
            <el-col :span="20">
              <div style="padding: 30px;width: 400px;">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="100px" label-position="top">
                  <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName" :readonly="true" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="出生年月" prop="birth">
                    <el-date-picker v-model="ruleForm.birth" type="date" placeholder="请选择出生年月"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                    <el-input v-model="ruleForm.sex" type="string" autocomplete="off" ></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" type="email" autocomplete="off" ></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="phone">
                    <el-input v-model="ruleForm.phone" type="string" autocomplete="off" ></el-input>
                  </el-form-item>
                  <el-form-item style="padding-top: 20px;">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
                    <el-button @click="resetForm('ruleForm')">清空信息</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import DwUserMenu from './DwUserMenu'
import {dwUserInfoUpdate, dwUserInfo} from '../../api/dw-user'
export default {
  name: 'DwUserChangeInfo',
  components: {
    DwUserMenu
  },
  data () {
    return {
      userInfo: {},
      ruleForm: {
        userName: '',
        birth: '',
        sex: '',
        email: '',
        phone: ''
      },
      rules: {
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
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      dwUserInfo().then((response) => {
        const resultData = response.data.data
        this.userInfo = resultData
        this.ruleForm.phone = this.userInfo.cellphone
        this.ruleForm.sex = this.userInfo.sex === 0 ? '男' : '女'
        this.ruleForm.birth = this.userInfo.birthday.split(' ')[0]
        this.ruleForm.birth = new Date(this.ruleForm.birth)
        this.ruleForm.email = this.userInfo.email
        this.ruleForm.userName = this.userInfo.loginName
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dwUserInfoUpdate(this.ruleForm.email, this.ruleForm.birth, this.ruleForm.sex, this.ruleForm.email, this.ruleForm.phone).then((response) => {
            const httpResult = response.data
            if (httpResult.resultCode === 200) {
              this.$message.success('信息修改成功')
            } else {
              this.$message.error('信息修改失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.userName = this.userInfo.loginName
    }
  }
}
</script>

<style scoped>
.dw-user-body{
  background-color: white;
  min-height: 600px;
}
</style>
