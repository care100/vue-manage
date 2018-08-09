<template>
  <div class="head-bar">
    <h1>{{ title }}</h1>
    <!-- <span @click="showDialog">{{ username }}</span> -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userCenter">用户中心</el-dropdown-item>
        <el-dropdown-item command="showDialog">修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button
      size="mini"
      @click="logout">退出</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      width="500px"
      title="修改密码"
      @close="cancel">
      <el-form
        ref="passForm"
        :model="form"
        :inline="true"
        :rules="rules"
        label-width="120px">
        <el-form-item
          label="原密码"
          prop="oldPass">
          <el-input
            v-model="form.oldPass"
            placeholder="请输入原密码"
            type="password"/>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPass">
          <el-input
            v-model="form.newPass"
            placeholder="请输入新密码"
            type="password"
            @input="validateEqual"/>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="newPassSure">
          <el-input
            v-model="form.newPassSure"
            placeholder="请再次输入新密码"
            type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HeadBar',
  data () {
    return {
      title: 'Gateway',
      dialogVisible: false,
      form: {
        oldPass: '',
        newPass: '',
        newPassSure: ''
      },
      rules: {
        oldPass: [
          {required: true, message: '必填'},
          {min: 6, max: 20, message: '6~20个字符'}
        ],
        newPass: [
          {required: true, message: '必填'},
          {min: 6, max: 20, message: '6~20个字符'}
        ],
        newPassSure: [
          {required: true, message: '必填'},
          {min: 6, max: 20, message: '6~20个字符'},
          {validator: this.equalNew, message: '新密码不一致'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters('user', ['username'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    // 验证规则，重复密码等于新密码
    equalNew (rule, value, callback) {
      if (this.form.newPass === this.form.newPassSure) {
        callback()
      } else {
        callback(new Error(rule.message))
      }
    },
    // newPass改变时触发NewPassSure验证
    validateEqual () {
      if (this.form.newPassSure) {
        this.$refs.passForm.validateField('newPassSure')
      }
    },
    // 用户名下拉处理逻辑
    handleCommand (command) {
      if (command === 'userCenter') {
        this.$router.push('/admin/userCenter')
      } else {
        this.showDialog()
      }
    },
    // 展示修改密码弹窗
    showDialog () {
      this.dialogVisible = true
    },
    // 提交修改密码
    submit () {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          // 增加API调用逻辑
          this.dialogVisible = false
        }
      })
    },
    // 取消修改密码
    cancel () {
      this.dialogVisible = false
      this.$refs.passForm.resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.head-bar
  display flex
  align-items center
  h1
    flex 1
    line-height 60px
    color #fff
  .el-dropdown
    color #ffffff
    margin-right 20px
  .el-button
    margin-right 20px
</style>
