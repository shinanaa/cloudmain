<template>
    <div class="unit common">
      <div class="search">
        <div class="search-item">
          <span>名称</span>
          <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
        </div>
      <div class="search-item">
        <span>代码</span>
        <el-input v-model="search.code" placeholder="请输入代码"></el-input>
      </div>
        <div class="search-item">
          <span>状态</span>
          <el-select v-model="search.state" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="searchUnit">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button type="primary" @click="addUnit">新增</el-button>
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="unitList"
            style="width: 100%">
            <el-table-column prop="mc" label="名称"></el-table-column>
            <el-table-column prop="dm" label="代码"></el-table-column>
            <el-table-column prop="lxr" label="联系人"></el-table-column>
            <el-table-column prop="dh" label="电话"></el-table-column>
            <el-table-column prop="yx" label="邮箱"></el-table-column>
            <el-table-column prop="dz" label="地址"></el-table-column>
            <el-table-column prop="xh" label="序号"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.zt === 'Y' ? '使用' : '停用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editUnit(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteUnit(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
          <div class="cardItem" v-for="(item, index) in unitList" :key="index">
            <div class="userName">{{item.mc}}</div>
            <div class="infoWrapper">
              <div class="info-item">
                <span class="info-key">代码</span>
                <span class="info-value">{{item.dm}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">联系人</span>
                <span class="info-value">{{item.lxr}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">电话</span>
                <span class="info-value">{{item.dh}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">邮箱</span>
                <span class="info-value">{{item.yx}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">地址</span>
                <span class="info-value">{{item.dz}}</span>
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
              <el-button size="mini" type="success" @click="editUnit(item)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteUnit(item)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showUnitDialog" :before-close="cancelSet">
          <el-form :model="unitForm" ref="unitForm" :rules="unitRules">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
              <el-input type="text" v-model="unitForm.name"></el-input>
            </el-form-item>
            <el-form-item label="代码" :label-width="formLabelWidth" prop="code">
              <el-input type="text" v-model="unitForm.code"></el-input>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formLabelWidth" prop="contacts">
              <el-input type="text" v-model="unitForm.contacts"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
              <el-input type="text" v-model="unitForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input type="text" v-model="unitForm.email"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
              <el-input type="text" v-model="unitForm.address"></el-input>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="order">
              <el-input type="text" v-model="unitForm.order"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
              <el-select v-model="unitForm.state" placeholder="请选择">
                <el-option v-for="item in stateDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功能" :label-width="formLabelWidth" prop="dwgn">
              <el-tree :data="plugins" :props="pluginTree" show-checkbox ref="pluginTree" node-key="value"></el-tree>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSet">取 消</el-button>
            <el-button type="primary" @click="submitUnitSet">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {getUnitList, getUnitPluginTree, addUnitItem, editUnitItem, getUnitItem, deleteUnitItem} from '@/api/unit'
import {ERR_CODE} from 'common/js/config'
import {pagingMixin} from 'common/js/mixin'
export default {
  name: 'unit',
  mixins: [pagingMixin],
  data () {
    return {
      listType: true,
      search: {
        code: '',
        userName: '',
        state: ''
      },
      states: [
        {value: '', label: '全部'},
        {value: 'N', label: '停用'},
        {value: 'Y', label: '使用'}
      ],
      unitList: [],
      // 弹窗
      isAdd: true,
      showUnitDialog: false,
      unitForm: {
        name: '',
        code: '',
        contacts: '',
        tel: '',
        email: '',
        address: '',
        order: '',
        state: '',
        plugins: []
      },
      plugins: [], // 功能树
      pluginTree: {
        label: 'label',
        children: 'children'
      },
      unitRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ]
      },
      formLabelWidth: '80px'
    }
  },
  computed: {
    stateDialog () {
      let stateDialog = JSON.parse(JSON.stringify(this.states))
      stateDialog.shift()
      return stateDialog
    },
    dialogTitle () {
      return this.isAdd ? '单位增加' : '单位修改'
    }
  },
  created () {
    this._getUnitList({search: this.search})
  },
  methods: {
    pageChange (val) {
      this.currentPage = val
      this._getUnitList({page: val})
    },
    editUnit (item) {
      this._getPluginTree()
      this.isAdd = false
      this.showUnitDialog = true
      this._getUnitItem(item.dwid)
    },
    deleteUnit (item) {
      console.log(item)
      this._deleteUnitInfo(item)
    },
    addUnit () {
      this._getPluginTree()
      this.showUnitDialog = true
      this.isAdd = true
    },
    cancelSet () {
      this.showUnitDialog = false
      this.$refs.unitForm.resetFields()
      this.$refs.pluginTree.setCheckedNodes([])
    },
    submitUnitSet () {
      this.$refs.unitForm.validate(valid => {
        if (valid) {
          const checkArr = this.$refs.pluginTree.getCheckedNodes()
          checkArr.filter((item) => {
            if (item.isgn !== undefined) {
              this.unitForm.plugins.push(item.value)
            }
          })
          if (this.isAdd) {
            this._addUnitInfo(this.unitForm)
          } else {
            this._editUnitInfo(this.unitForm)
          }
        } else {
          return false
        }
      })
    },
    searchUnit () {
      this._getUnitList({search: this.search, page: 1})
    },
    _deleteUnitInfo (params) {
      const deleteParams = {
        unitId: params.dwid,
        url: 'deleteUnitInfo'
      }
      deleteUnitItem(deleteParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUnitList({search: this.search})
        } else {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _addUnitInfo (params) {
      const addParams = params
      addParams.url = 'addUnitInfo'
      addUnitItem(addParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUnitList({search: this.search})
        } else {
          this.cancelSet()
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
    _editUnitInfo (params) {
      const editParams = params
      editParams.url = 'editUnitInfo'
      console.log(editParams)
      editUnitItem(editParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUnitList({search: this.search})
        } else {
          this.cancelSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _getPluginTree () {
      if (!this.plugins.length) {
        getUnitPluginTree('getUnitPluginTree').then((res) => {
          if (res.errcode === ERR_CODE) {
            this.plugins = res.list
            console.log(res)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    _getUnitItem (unitId) {
      const getInfo = {
        unitId,
        url: 'getUnitById'
      }
      getUnitItem(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          const unit = res.list[0].unitInfo[0]
          this.unitForm.name = unit.mc
          this.unitForm.code = unit.dm
          this.unitForm.contacts = unit.lxr
          this.unitForm.tel = unit.dh
          this.unitForm.email = unit.yx
          this.unitForm.address = unit.dz
          this.unitForm.order = unit.xh
          this.unitForm.state = unit.zt
          this.unitForm.unitId = unit.dwid
          const pluginChecked = res.list[0].gnInUnitInfo[0]
          if (pluginChecked) {
            this.$refs.pluginTree.setCheckedKeys(pluginChecked.split(','))
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getUnitList ({search, page = this.currentPage}) {
      console.log(search)
      const getInfo = {
        mc: search.userName,
        dm: search.code,
        zt: search.state,
        pageSize: this.pageSize,
        pageNo: page,
        url: 'getUnitInfo'
      }
      getUnitList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          console.log(res)
          this.unitList = res.rows
          this.total = res.totalCount
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/common"
</style>
