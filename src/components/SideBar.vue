<template>
  <el-menu
    class="side-bar"
    mode="vertical">
    <template
      v-for="(m, index) in menu">
      <el-submenu
        v-if="m.children"
        :key="index"
        :index="`/admin/${m.label}`">
        <template slot="title">
          <span>{{ titles[m.label] }}</span>
        </template>
        <el-menu-item
          v-for="(subm, index) in m.children"
          :key="index"
          :index="`/admin/${subm.label}`"
          @click="go(`/admin/${subm.label}`)">
          {{ titles[subm.label] }}
          <!-- <router-link :to="`/admin/${subm.label}`">{{ titles[subm.label] }}</router-link> -->
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else
        :key="index"
        :index="`/admin/${m.label}`"
        @click="go(`/admin/${m.label}`)">
        {{ titles[m.label] }}
        <!-- <router-link :to="`/admin/${m.label}`">{{ titles[m.label] }}</router-link> -->
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { titles } from '@/menu'

export default {
  name: 'SideBar',
  data () {
    return {
      titles
    }
  },
  computed: {
    ...mapGetters('user', ['menu'])
  },
  methods: {
    go (url) {
      this.$router.push(url)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.side-bar
  overflow auto
  .el-menu-item
    padding 0!important
    a
      display block
</style>
