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
              <span slot="title">{{item.text}}</span>
            </el-menu-item>
          </router-link>
        </div>
      </el-menu>
    </el-scrollbar>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      menuList: [
        {path: '/user', text: '用户管理'},
        {path: '/module', text: '模块管理'},
        {path: '/plugin', text: '功能管理'},
        {path: '/role', text: '角色管理'},
        {path: '/log', text: '日志管理'},
        {path: '/unit', text: '单位管理'},
        {path: '/notice', text: '通知公告'}
      ]
    }
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
