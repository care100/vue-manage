<template>
  <div id="app">
    <router-view/>
    <!-- <el-button type="primary" @click="fun">btn</el-button> -->
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      usernameLocal: 'new username'
    }
  },
  computed: {
    // ...mapGetters('user', ['username'])
  },
  created () {
    // this.fun()
  },
  methods: {
    // ...mapActions('user', ['setUsername']),
    // fun () {
    //   console.log(this.username)
    //   this.setUsername(this.usernameLocal)

    //   this.$http.post(
    //     '/users/login',
    //     {
    //       data: {
    //         username: 'admin',
    //         password: 'api@kuainiujinke'
    //       }
    //     }
    //   )
    // }
  }
}
</script>

<style lang="stylus">
@import './style/index.styl'

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color: #2c3e50
</style>
