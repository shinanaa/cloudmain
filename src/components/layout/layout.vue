<template>
  <div class="layout">
    <div class="head">
      <router-link class="logo" to="/home">
        <img src="@/common/img/logo-index.png" alt="">
      </router-link>
      <ul class="modules">
        <li v-for="(item, index) in modules" :key="item.mkid" @click="moduleListItem(index, item)" :class="{'active': activeIndex === index}">
          <!--<router-link tag="span" :to="item.url">{{item.name}}</router-link>-->
          {{item.mc}}
        </li>
      </ul>
      <div class="right">
        <el-dropdown>
          <div class="user">
            <div class="user-text">
              <div class="username">{{userName}}</div>
              <div class="userIntroduce">{{userRole}}</div>
            </div>
            <img class="userImg" src="@/common/img/user.png" alt="">
          </div>
          <el-dropdown-menu slot="dropdown">
            <p v-if="roleList.length > 1" v-for="(item, index) in roleList" :key="index">
              <el-dropdown-item><span @click="changeRoles(item)">切换到：{{item.mc}}</span></el-dropdown-item>
            </p>
            <el-dropdown-item divided><span @click="showChangePwd = true">修改密码</span></el-dropdown-item>
            <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="changePwd">
      <el-dialog title="修改密码" :visible.sync="showChangePwd" width="30%">
        <el-form :model="changePwdForm" ref="changePwdForm" :rules="changePwdRules">
          <el-form-item label="旧的密码" :label-width="formLabelWidth" prop="oldPwd">
            <el-input type="text" v-model="changePwdForm.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新的密码" :label-width="formLabelWidth" prop="newPwd">
            <el-input type="text" v-model="changePwdForm.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="surePwd">
            <el-input type="text" v-model="changePwdForm.surePwd"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelChangePwd">取 消</el-button>
          <el-button type="primary" @click="changPwd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {ERR_CODE} from 'common/js/config'
import {setPluginList, setRouteList} from 'common/js/cache'
import {mapActions, mapGetters} from 'vuex'
import {changePwd, getPluginList} from '@/api/login'
import {getUserRole, getUserModule, getPowerList} from '@/api/user'
export default {
  name: 'layout',
  data () {
    const validateSurePwd = (rule, value, callback) => {
      if (this.changePwdForm.newPwd !== this.changePwdForm.surePwd) {
        callback(new Error('新密码与确认密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      activeIndex: null,
      changePwdForm: {
        oldPwd: '',
        newPwd: '',
        surePwd: ''
      },
      changePwdRules: {
        oldPwd: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        surePwd: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateSurePwd }
        ]
      },
      showChangePwd: false,
      formLabelWidth: '100px',
      roleList: [],
      modules: []
    }
  },
  computed: {
    ...mapGetters([
      'userName',
      'userRole',
      'roleId',
      'moduleList',
      'userLogin'
    ])
  },
  created () {
    this._getUserRole()
    this._getUserModule()
    this._getPowerList()
  },
  methods: {
    changeRoles (role) {
      console.log(role)
      this.changeRole(role).then(() => {
        this._getUserModule()
        this.$router.push('/home')
      })
    },
    moduleListItem (index, item) {
      this.activeIndex = index
      const getInfo = {
        yhid: this.userLogin,
        jsid: this.roleId,
        mkid: item.mkid,
        url: 'getPluginList'
      }
      getPluginList(getInfo).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          console.log(res.menuList)
          setPluginList(res.menuList)
          if (item.mc === '系统管理') {
            this.$router.push('/system')
          }
          if (item.mc === '题库管理') {
            this.$router.push('/unit')
          }
        }
      })
      this.changeModule(item.mc)
    },
    changPwd () {
      this.changePwdForm.url = 'changePwd'
      changePwd(this.changePwdForm).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.cancelChangePwd()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    cancelChangePwd () {
      this.$refs.changePwdForm.resetFields()
      this.showChangePwd = false
    },
    logout () {
      const url = 'logOut'
      this.logOut(url).then(() => {
        this.$router.push({ path: '/login' })
      })
    },
    _getPowerList () {
      getPowerList('getPowerList').then(res => {
        if (res.errcode === ERR_CODE) {
          setRouteList(res.route)
        }
        console.log(res)
      })
    },
    _getUserRole () {
      const info = {
        yhid: this.userLogin,
        url: 'getUserRole'
      }
      getUserRole(info).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.roleList = res.list
        }
      })
    },
    _getUserModule () {
      const info = {
        yhid: this.userLogin,
        jsid: this.roleId,
        url: 'getUserModule'
      }
      getUserModule(info).then(res => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.modules = res.list
        }
      })
    },
    ...mapActions([
      'logOut',
      'changeRole',
      'changeModule'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .layout
    height: 100%
    .head
      position: fixed
      top: 0
      left: 0
      right: 0
      z-index: 12
      height: 80px
      min-width: 1200px
      color: #FFF
      clearfix()
      background-color: #293b5a
      .logo
        float:left
        width: $slide-width
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
        width: 'calc(100% - 300px - %s)' % $slide-width
        height: 80px
        overflow: hidden
        background: #293b5a
        line-height:80px
        &:hover
          position: absolute
          left: $slide-width
          z-index: 10
          height: auto
        li
          float: left
          width: 180px
          text-align: center
          cursor: pointer
          &.active
            background: rgba(255,255,255,0.1)
          &:hover
            background: rgba(255,255,255,0.1)
      .right
        float:right
        width: 150px
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
          display: flex
          align-items: center
          text-align: right
          height: 80px
          padding-left: 10px
          border-left: 2px solid #21324f
          clearfix()
          .user-text
            font-size: 14px
            line-height: 20px
            margin-right: 8px
            color: #ffffff
</style>
