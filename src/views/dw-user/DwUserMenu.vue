<template>
  <el-menu
    :default-active="defActive"
    class="el-menu-vertical-demo"
    style="height: 600px;"
    router
  >
    <el-menu-item index="/dw/user" >
      <i class="el-icon-user"></i>
      <span slot="title">我的账号</span>
    </el-menu-item>
    <el-menu-item index="/dw/user/pwd">
      <i class="el-icon-key"></i>
      <span slot="title">修改密码</span>
    </el-menu-item>
    <el-menu-item index="/dw/user/change-info">
      <i class="el-icon-key"></i>
      <span slot="title">修改个人信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'DwUserMenu',
  data () {
    return {
      defActive: ''
    }
  },
  mounted () {
    this.setDefActive()
  },
  methods: {
    setDefActive () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('/dw/user') >= 0) {
        this.defActive = '/dw/user'
      }
      if (fullPath.indexOf('/dw/user/pwd') >= 0) {
        this.defActive = '/dw/user/pwd'
      }
      if (fullPath.indexOf('/dw/user/change-info') >= 0) {
        this.defActive = '/dw/user/change-info'
      }
    }
  }
}
</script>

<style scoped>

</style>
