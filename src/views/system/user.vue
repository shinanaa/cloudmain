<template>
    <div class="user">
      <div class="search">
        <!--<div class="search-item">-->
          <!--<span>部门：</span>-->
          <!--<el-cascader-->
            <!--v-model="search.department"-->
            <!--:options="options"></el-cascader>-->
        <!--</div>-->
        <div class="search-item">
          <span>角色：</span>
          <el-select v-model="search.role" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>名称：</span>
          <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <span>状态：</span>
          <el-select v-model="search.state" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button type="primary">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button type="primary">新增</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="primary">批量删除</el-button>
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold"></i>
            <i class="el-icon-menu"></i>
          </div>
        </div>
        <div class="table-main">
          <el-table
            :data="userList"
            style="width: 100%">
            <el-table-column prop="mc" label="名称"></el-table-column>
            <el-table-column prop="dm" label="代码"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <!--<el-table-column prop="department" label="部门"></el-table-column>-->
            <el-table-column prop="order" label="序号"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.zt === 'Y' ? '使用' : '禁用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editUser(scope.row)">修改</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="userDialog">
        <el-dialog title="用户修改" :visible.sync="showUserDialog">
          <el-form :model="userForm" ref="userForm">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input type="text" v-model="userForm.mc"></el-input>
            </el-form-item>
            <el-form-item label="代码" :label-width="formLabelWidth">
              <el-input type="text" v-model="userForm.dm"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input type="text" v-model="userForm.mm"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-select v-model="userForm.role" placeholder="请选择">
                <el-option
                  v-for="item in roles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth">
              <el-input type="text" v-model="userForm.xh"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select v-model="userForm.zt" placeholder="请选择">
                <el-option v-for="item in stateDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelUserSet">取 消</el-button>
            <el-button type="primary" @click="submitUserSet">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {getUserList, editUserItem} from '@/api/user'
import {ERR_CODE} from 'common/js/config'
export default {
  name: 'user',
  data () {
    return {
      search: {
        // department: [],
        role: '',
        userName: '',
        state: ''
      },
      states: [
        {value: 'all', label: '全部'},
        {value: 'N', label: '停用'},
        {value: 'Y', label: '使用'}
      ],
      roles: [
        {value: 'admin', label: '管理员'},
        {value: 'teacher', label: '教师'}
      ],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }]
            }]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            }]
        }],
      userList: [],
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 5,
      // 弹窗
      showUserDialog: false,
      userForm: {
        mc: '',
        dm: '',
        mm: '',
        role: '',
        xh: '',
        zt: '',
        yhid: '',
        yhjsid: ''
      },
      formLabelWidth: '60px'
    }
  },
  computed: {
    stateDialog () {
      let stateDialog = JSON.parse(JSON.stringify(this.states))
      stateDialog.shift()
      return stateDialog
    }
  },
  created () {
    this._getUserList()
  },
  methods: {
    editUser (rowData) {
      this.userForm = JSON.parse(JSON.stringify(rowData))
      this.showUserDialog = true
    },
    cancelUserSet () {
      this.$refs.userForm.resetFields()
      this.showUserDialog = false
    },
    submitUserSet () {
      this._editUserInfo(this.userForm)
    },
    _editUserInfo (params) {
      const editParams = {
        dm: params.dm,
        mm: params.mm,
        mc: params.mc,
        zt: params.zt,
        yhjsid: params.yhjsid,
        yhid: params.yhid,
        url: 'editUserInfo'
      }
      editUserItem(editParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
        }
      })
    },
    _getUserList () {
      const getInfo = {
        pageSize: 5,
        pageCurrent: 1,
        url: 'getUserInfo'
      }
      getUserList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.userList = res.rows
          this.total = res.totalCount
        }
        // console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
.user
  padding: 0 35px
  .search
    .search-item
      display: inline-block
      margin-right: 15px
      padding: 20px 0
      span
        color: #606266
      .el-input
        width: auto
  .table-wrapper
    background: #FFFFFF
    border-radius: 8px
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    .table-btn
      padding: 15px 20px
      clearfix()
      .btn-handle
        float: left
      .btn-change
        float: right
        margin-top: 5px
        font-size: 28px
        color: #606266
    .table-main
      .el-pagination
        padding: 15px 20px
</style>
