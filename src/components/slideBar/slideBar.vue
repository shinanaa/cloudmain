<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical-demo"
        text-color="#606266"
        :default-active="$route.path"
        active-text-color="#4580bd"
        :collapse="isCollapse"
      >
        <div class="menu-wrapper" v-for="(item, index) in menuList" :key="index">
          <router-link :to="item.path">
            <el-menu-item :index="item.path">
              <span><i class="icon el-icon-menu"></i></span>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </router-link>
        </div>
      </el-menu>
    </el-scrollbar>
</template>

<script>
import {mapGetters} from 'vuex'
import {getPluginList} from 'common/js/cache'
export default {
  data () {
    return {
      menuList: []
    }
  },
  created () {
    // 从路由表中获取菜单列表
    // let menuArr = []
    // this.$router.options.routes.filter(route => {
    //   if (route.path === '/layout') {
    //     route.children.filter(item => {
    //       if (item.path === '/system') {
    //         item.children.map(menu => {
    //           if (getRouter().indexOf(menu.path) > -1) {
    //             menuArr.push(menu)
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    // this.menuList = menuArr

    // 从sessionStorage中获取请求的列表
    this.menuList = getPluginList()
  },
  computed: {
    ...mapGetters([
      'opened'
    ]),
    isCollapse () {
      return !this.opened
    }
  },
  methods: {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
