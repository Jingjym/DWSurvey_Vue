<template>
  <div id="loginPage" >
    <el-row :gutter="0">
      <el-col :span="10" :offset="7">
        <div class="loginFormContent" style="margin-top: 30%;">
          <div style="text-align: center;">
            <br><br><br><br>
            <h1>您正在访问的是实名问卷</h1>
            <br><br><br><br>
            <h2>如需填写问卷，请登录</h2>
          </div>
          <br><br><br><br><br>
          <div style="display: flex;justify-content: center;">
            <el-button type="primary" style="width: 100%;" @click="gotoRegister()">登录账号</el-button>
            <el-button style="width: 100%;">放弃填写请自行关闭网页</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  name: 'DwSurveyAvoid',
  mounted () {
    this.pageH = window.height
  },
  methods: {
    gotoRegister () {
      this.$router.push('/login')
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
