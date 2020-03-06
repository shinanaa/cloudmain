<template>
    <div class="moduleLayout" :class="{'bigger': !opened}">
      <slider-bar class="sidebar-container"></slider-bar>
      <div class="module-main">
        <div class="router-show">
          <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="opened"></hamburger>
          <breadcrumb></breadcrumb>
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import sliderBar from '@/components/slidebar/slidebar'
import Hamburger from '@/components/Hamburger/Hamburger'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
export default {
  name: 'module-layout',
  components: {
    sliderBar,
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'opened'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.moduleLayout
  .module-main
    margin-left: $slide-width
    transition: margin-left 0.28s
    .router-show
      position: fixed
      top: 80px
      left: $slide-width
      right: 0
      z-index: 10
      background: #FFFFFF
      transition: left 0.28s
      .hamburger-container
        line-height: 58px
        height: 50px
        float: left
        padding: 0 10px
.bigger
  .module-main
    margin-left: 64px
    .router-show
      left: 64px
</style>
