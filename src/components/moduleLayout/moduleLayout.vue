<template>
    <div class="moduleLayout">
      <sliderbar class="sidebar-container"></sliderbar>
      <div class="module-main">
        <div class="router-show">
          <hamburger class="hamburger-container" :toggleClick="toggleSideBar"></hamburger>
          <breadcrumb></breadcrumb>
        </div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import sliderbar from '@/components/slidebar/slidebar'
import Hamburger from '@/components/Hamburger/Hamburger'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
export default {
  name: 'module-layout',
  components: {
    sliderbar,
    Breadcrumb,
    Hamburger
  },
  methods: {
    toggleSideBar () {
      console.log(123)
      // this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.module-main
  margin-left: $slide-width
  .router-show
    background: #FFFFFF
    .hamburger-container
      line-height: 58px
      height: 50px
      float: left
      padding: 0 10px
</style>
