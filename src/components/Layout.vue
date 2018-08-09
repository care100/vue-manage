<template>
  <div class="layout">
    <head-bar class="header"/>
    <side-bar class="aside"/>
    <router-view class="main-content"/>
    <foot-bar class="footer"/>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import SideBar from '@/components/SideBar'
import FootBar from '@/components/FootBar'

export default {
  name: 'Layout',
  components: {
    HeadBar,
    SideBar,
    FootBar
  }
}
</script>

<style lang="stylus" scoped>
.layout
  position relative
  height 100%
  .header
    width 100%
    height 60px
    background-color #222
  .aside
    position absolute
    width 250px
    left 0
    top 60px
    bottom 60px
  .main-content
    position absolute
    left 250px
    right 0
    top 60px
    bottom 60px
    overflow auto
  .footer
    position absolute
    width 100%
    height 60px
    bottom 0
    background-color #333333
    color #fff
</style>
