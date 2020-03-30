<template>
    <div class="user common">
      <div class="search">
        <div class="search-item">
          <span>角色</span>
          <el-select v-model="search.role" placeholder="请选择">
            <el-option value="" key="" label="全部"></el-option>
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>名称</span>
          <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <span>状态</span>
          <el-select v-model="search.state" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="searchUser">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button type="primary" @click="addUser">新增</el-button>
            <!--<el-button type="primary">导入</el-button>-->
            <!--<el-button type="primary" @click="delUsers">批量删除</el-button>-->
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="userList"
            style="width: 100%">
            <el-table-column prop="yhmc" label="名称"></el-table-column>
            <el-table-column prop="dm" label="代码"></el-table-column>
            <el-table-column prop="jsmc" label="角色"></el-table-column>
            <!--<el-table-column prop="department" label="部门"></el-table-column>-->
            <el-table-column prop="xh" label="序号"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.zt === 'Y' ? '使用' : '停用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editUser(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
            <div class="cardItem" v-for="(item, index) in userList" :key="index">
              <div class="userName">{{item.yhmc}}</div>
              <div class="infoWrapper">
                <div class="info-item">
                  <span class="info-key">代码</span>
                  <span class="info-value">{{item.dm}}</span>
                </div>
                <div class="info-item">
                  <span class="info-key">角色</span>
                  <span class="info-value">{{item.jsmc}}</span>
                </div>
                <div class="info-item">
                  <span class="info-key">序号</span>
                  <span class="info-value">{{item.xh}}</span>
                </div>
                <div class="info-item">
                  <span class="info-key">状态</span>
                  <span class="info-value">{{item.zt === 'Y' ? '使用' : '停用'}}</span>
                </div>
              </div>
              <div class="card-btn">
                <el-button size="mini" type="success" @click="editUser(item)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteUser(item)">删除</el-button>
              </div>
            </div>
        </div>
        <el-pagination
          @current-change="pageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="dialog">
        <!--新增/修改-->
        <el-dialog :title="dialogTitle" :visible.sync="showUserDialog" :before-close="cancelUserSet">
          <el-form :model="userForm" ref="UsersForm" :rules="userRules">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="yhmc">
              <el-input type="text" v-model="userForm.yhmc"></el-input>
            </el-form-item>
            <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
              <el-input type="text" v-model="userForm.dm"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="mm">
              <el-input type="text" v-model="userForm.mm"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth" prop="yhjsid">
              <el-select v-model="userForm.yhjsid" multiple placeholder="请选择">
                <el-option
                  v-for="item in roles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="xh">
              <el-input type="text" v-model="userForm.xh"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" prop="zt">
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
        <!--批量删除-->
        <!--<el-dialog title="批量删除" :visible.sync="showDelUsers">-->
          <!--<el-tree-->
            <!--:data="userTree"-->
            <!--:props="userTreeProps"-->
            <!--show-checkbox>-->
          <!--</el-tree>-->
        <!--</el-dialog>-->
      </div>
    </div>
</template>

<script>
import {getUserList, editUserItem, addUserItem, deleteUserItem, getUserItem} from '@/api/user'
import {getRoleTree} from '@/api/role'
import {ERR_CODE} from 'common/js/config'
import {pagingMixin} from 'common/js/mixin'
export default {
  name: 'user',
  mixins: [pagingMixin],
  data () {
    return {
      listType: true,
      search: {
        // department: [],
        role: '',
        userName: '',
        state: ''
      },
      states: [
        {value: '', label: '全部'},
        {value: 'N', label: '停用'},
        {value: 'Y', label: '使用'}
      ],
      roles: [],
      userList: [],
      selectRows: [],
      // 弹窗
      isAdd: true,
      showDelUsers: false,
      showUserDialog: false,
      userForm: {
        yhmc: '',
        dm: '',
        mm: '',
        jsmc: '',
        xh: '',
        zt: '',
        yhid: '',
        yhjsid: []
      },
      userRules: {
        yhmc: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        dm: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ],
        mm: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        yhjsid: [
          { required: true, message: '角色不能为空', trigger: 'change' }
        ],
        zt: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ],
        xh: [
          { min: 0, max: 5, message: '长度在 0 到 5 个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '60px',
      userTree: [
        {
          label: '1',
          children: [
            {label: '1.1'},
            {label: '1.2'}
          ]
        },
        {label: '2'}
      ],
      userTreeProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    stateDialog () {
      let stateDialog = JSON.parse(JSON.stringify(this.states))
      stateDialog.shift()
      return stateDialog
    },
    dialogTitle () {
      return this.isAdd ? '用户增加' : '用户修改'
    }
  },
  created () {
    this._getUserList({search: this.search, page: 1})
    // 获取搜索中角色列表
    getRoleTree('getRoleTree').then((res) => {
      if (res.errcode === ERR_CODE) {
        let roleList = res.list
        roleList.map((item) => {
          let roleItem = {}
          roleItem.label = item.mc
          roleItem.value = item.jsid
          this.roles.push(roleItem)
        })
      } else {
        return false
      }
    })
  },
  methods: {
    searchUser () {
      this._getUserList({search: this.search, page: 1})
    },
    // 批量删除
    // selectTable (val) {
    //   this.selectRows = val
    // },
    // delUsers () {
    //   console.log(this.selectRows)
    //   let userids = []
    //   this.selectRows.map((row) => {
    //     userids.push(row.yhid)
    //   })
    //   console.log(userids)
    //   const deleteParams = {
    //     userids,
    //     url: 'deleteUsers'
    //   }
    //   deleteUsers(deleteParams).then((res) => {
    //     if (res.errcode === ERR_CODE) {
    //       this.$message({
    //         showClose: true,
    //         message: res.errmsg,
    //         type: 'success'
    //       })
    //       this._getUserList({search: this.search})
    //     } else {
    //       this.$message({
    //         showClose: true,
    //         message: res.errmsg,
    //         type: 'error'
    //       })
    //     }
    //   })
    //   // this.showDelUsers = true
    // },
    deleteUser (rowData) {
      console.log(rowData)
      this._deleteUserInfo(rowData)
    },
    addUser () {
      this.showUserDialog = true
      this.isAdd = true
    },
    editUser (rowData) {
      this._getUserItem(rowData.yhid)
      this.showUserDialog = true
      this.isAdd = false
    },
    pageChange (val) {
      this.currentPage = val
      this._getUserList({search: this.search})
    },
    cancelUserSet () {
      this.showUserDialog = false
      this.$refs.UsersForm.resetFields()
    },
    submitUserSet () {
      this.$refs.UsersForm.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this._addUserInfo(this.userForm)
          } else {
            this._editUserInfo(this.userForm)
          }
        } else {
          return false
        }
      })
    },
    _deleteUserInfo (params) {
      const deleteParams = {
        yhid: params.yhid,
        url: 'deleteUserInfo'
      }
      console.log(12)
      console.log(deleteParams)
      deleteUserItem(deleteParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUserList({search: this.search})
        } else {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
        console.log(res)
      })
    },
    _addUserInfo (params) {
      const addParams = {
        dm: params.dm,
        mm: params.mm,
        mc: params.yhmc,
        zt: params.zt,
        xh: params.xh,
        yhjsid: params.yhjsid,
        url: 'addUserInfo'
      }
      addUserItem(addParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUserList({search: this.search})
        } else {
          this.cancelUserSet()
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
    _editUserInfo (params) {
      console.log(params)
      const editParams = {
        dm: params.dm,
        mm: params.mm,
        mc: params.yhmc,
        zt: params.zt,
        yhid: params.yhid,
        xh: params.xh,
        yhjsid: params.yhjsid,
        url: 'editUserInfo'
      }
      // console.log('yhjsid')
      // console.log(editParams)
      editUserItem(editParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUserList({search: this.search})
        } else {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _getSearchList (searchParmas) {
      const getInfo = {
        mc: searchParmas.userName,
        jsid: searchParmas.role,
        zt: searchParmas.state,
        pageSize: searchParmas.pageSize,
        pageCurrent: searchParmas.pageCurrent,
        url: 'getUserInfo'
      }
      getUserList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.userList = res.rows
          this.total = res.totalCount
        }
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    _getUserItem (userId) {
      const getInfo = {
        yhid: userId,
        url: 'getUserById'
      }
      getUserItem(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          console.log(124)
          console.log(res.list[0])
          const userItem = res.list[0]
          this.userForm = JSON.parse(JSON.stringify(userItem))
          if (this.userForm.mm) {
            this.userForm.mm = '******'
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getUserList ({search, page = this.currentPage}) {
      const getInfo = {
        mc: search.userName,
        jsid: search.role,
        zt: search.state,
        pageSize: this.pageSize,
        pageCurrent: page,
        url: 'getUserInfo'
      }
      console.log(getInfo)
      getUserList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          console.log(111)
          console.log(res.rows)
          this.userList = res.rows
          this.total = res.totalCount
        }
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/common"
</style>
