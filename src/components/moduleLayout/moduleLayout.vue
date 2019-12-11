<template>
    <div class="moduleLayout">
      <sliderbar class="sidebar-container"></sliderbar>
      <div class="module-main">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import sliderbar from '@/components/slidebar/slidebar'
export default {
  name: 'module-layout',
  components: {
    sliderbar
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.module-main
  margin-left: $slide-width
</style>
