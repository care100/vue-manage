<template>
  <el-row>
    <el-col
      :span="6"
      :offset="9">
      <h1>Gateway</h1>
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules">
        <el-form-item
          label="username"
          prop="username">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item
          label="password"
          prop="password">
          <el-input
            v-model="form.password"
            type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        remember: false
      },
      rules: {
        username: [
          {required: true, message: 'required'}
        ],
        password: [
          {required: true, message: 'required'}
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    submit () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.login(this.form)
            if (res.data.code === 0) {
              // this.$message.success('登录成功！')
              if (this.$route.query && this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push('/admin')
              }
            } else {
              this.$message.error('用户名或密码错误！')
            }
          } catch (e) {
            this.$message.error('网络错误！')
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-row
  position relative
  top 50%
  transform translateY(-50%)
</style>
