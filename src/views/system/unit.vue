<template>
    <div class="unit">
      <div class="search">
        <div class="search-item">
          <span>名称：</span>
          <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
        </div>
      <div class="search-item">
        <span>代码：</span>
        <el-input v-model="search.code" placeholder="请输入代码"></el-input>
      </div>
        <div class="search-item">
          <span>状态：</span>
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
                <span>{{scope.row.zt === 'Y' ? '使用' : '禁用'}}</span>
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
                <span class="info-value">{{item.zt === 'Y' ? '使用' : '禁用'}}</span>
              </div>
            </div>
            <div class="card-btn">
              <el-button size="mini" type="success" @click="editUser(item)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(item)">删除</el-button>
            </div>
          </div>
        </div>
        <el-pagination
          hide-on-single-page
          @current-change="pageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="dialog">
        <el-dialog :title="dialogTitle" :visible.sync="showUnitDialog">
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
            <!--<el-button @click="cancelUserSet">取 消</el-button>-->
            <!--<el-button type="primary" @click="submitUserSet">确 定</el-button>-->
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {getUnitList, getUnitPluginTree} from '@/api/unit'
import {ERR_CODE} from 'common/js/config'
export default {
  name: 'unit',
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
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 5,
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
        yhmc: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        dm: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ],
        mm: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
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
    this._getUnitList(this.search)
  },
  methods: {
    pageChange (val) {
      this.currentPage = val
      this._getUnitList(this.pageSize, val)
    },
    addUnit () {
      this._getPluginTree()
      this.showUnitDialog = true
      this.isAdd = true
    },
    searchUnit () {
      this._getUnitList(this.search)
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
    _getUnitList (params) {
      console.log(params)
      const getInfo = {
        mc: params.userName,
        dm: params.code,
        zt: params.state,
        pageSize: this.pageSize,
        pageNo: this.currentPage,
        url: 'getUnitInfo'
      }
      getUnitList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          console.log(res)
          this.unitList = res.rows
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .unit
    padding: 0 35px
    margin-top: 133px
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
          .active
            color: #409eff
      .table-main
      .card-mian
        clearfix()
        .cardItem
          float: left
          padding: 15px 2.5%
          margin-left: 4%
          margin-bottom: 20px
          width: 20%
          box-sizing: border-box
          background-color: #f2f6fc
          border-radius: 15px
          .userName
            line-height: 38px
            font-size: 17px
            text-align: center
            color: #606266
            border-bottom: 1px solid #909399
          .info-item
            margin-top: 15px
            font-size: 15px
            .info-key
              display: inline-block
              margin-right: 10px
              width: 70px
              height: 30px
              line-height: 30px
              text-align: center
              background: #FFFFFF
              box-shadow: 0px 0px 5px 0px rgba(76, 112, 161, 0.5)
              border-radius: 3px
            .info-value
              textOverflow(calc(100% - 85px))
        .card-btn
          heihgt: 70px
          line-height: 70px
      .el-pagination
        padding: 15px 20px
</style>
