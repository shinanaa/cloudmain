<template>
  <div class="layout">
    <div class="head">
      <router-link class="logo" to="/home">
        <img src="@/common/img/logo-index.png" alt="">
      </router-link>
      <ul class="modules">
        <li v-for="(item, index) in modules" :key="index" @mouseover="moduleListActive(index)" :class="{'active': activeIndex === index}">
          <span><i class="icon el-icon-menu"></i></span>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div class="right">
        <el-col :span="11">
          <el-row type="flex" class="info">
            <el-col :span="8">
              <el-badge :value="3" class="item">
                <i class="icon el-icon-postcard"></i>
              </el-badge>
            </el-col>
            <el-col :span="8">
              <i class="icon el-icon-microphone"></i>
            </el-col>
            <el-col :span="8">
              <i class="icon el-icon-chat-dot-square"></i>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="13">
          <el-dropdown>
            <div class="user">
              <div class="user-text">
                <div class="username">用户名</div>
                <div class="userIntroduce">后台管理员</div>
              </div>
              <img class="userImg" src="@/common/img/user.png" alt="">
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>切换角色</el-dropdown-item>
              <el-dropdown-item><span @click="showChangePwd = true">修改密码</span></el-dropdown-item>
              <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </div>
    </div>
    <div class="changePwd">
      <el-dialog title="修改密码" :visible.sync="showChangePwd">
        <el-form :model="form" ref="dialogForm">
          <el-form-item label="旧密码：" :label-width="formLabelWidth">
            <el-input type="text" v-model="form.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" :label-width="formLabelWidth">
            <el-input type="text" v-model="form.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" :label-width="formLabelWidth">
            <el-input type="text" v-model="form.surePwd"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="changPwd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'layout',
  data () {
    return {
      activeIndex: null,
      form: {
        oldPwd: '',
        newPwd: '',
        surePwd: ''
      },
      showChangePwd: false,
      formLabelWidth: '100px',
      modules: [
        {
          name: '基础数据'
        },
        {
          name: '考试管理'
        },
        {
          name: '题库管理'
        },
        {
          name: '试卷管理'
        },
        {
          name: '考试管理'
        },
        {
          name: '题库管理'
        },
        {
          name: '试卷管理'
        },
        {
          name: '考试管理'
        },
        {
          name: '题库管理'
        },
        {
          name: '试卷管理'
        },
        {
          name: '考试管理'
        },
        {
          name: '题库管理'
        },
        {
          name: '试卷管理'
        }
      ]
    }
  },
  methods: {
    moduleListActive (index) {
      this.activeIndex = index
    },
    changPwd () {

    },
    logout () {
      console.log(123)
      this.logOut().then(() => {
        this.$router.push({ path: '/login' })
      })
    },
    ...mapActions([
      'logOut'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .head
    position: relative
    height: 80px
    min-width: 1200px
    color: #FFF
    clearfix()
    background-color: #293b5a
    .logo
      float:left
      width: 300px
      height: 80px
      line-height: 80px
      text-align:center
      background-color: #21324f
      img
        width: 80%
        height: auto
        margin-left: -15px
        vertical-align: middle
    .modules
      float: left
      width: calc(100% - 600px)
      height: 80px
      overflow: hidden
      background: rgba(41,59,90,0.9)
      line-height:80px
      &:hover
        position: absolute
        left: 300px
        z-index: 10
        height: auto
      li
        float: left
        width: 180px
        text-align: center
        cursor: pointer
        &.active
          background: #21324f
    .right
      float:right
      width: 300px
      .info
        clearfix()
        height: 60px
        margin-top:10px
        padding-left: 15px
        border-left: 2px solid #21324f
        align-items: center
        .el-col
          .icon
            font-size: 30px
            color: #FFF
      .user
        height: 80px
        padding-left: 10px
        display: flex
        align-items: center
        text-align: right
        clearfix()
        .user-text
          font-size: 14px
          line-height: 20px
          margin-right: 8px
          color: #ffffff
</style>
