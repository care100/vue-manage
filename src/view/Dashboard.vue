<template>
  <div>
    <h2>dashboard</h2>
    <el-button
      type="primary"
      @click="test">test wrong token</el-button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    test () {
      this.$http.post('/test')
    }
  }
}
</script>
