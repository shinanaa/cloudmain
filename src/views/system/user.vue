<template>
    <div class="user">
      <div class="search">
        <div class="search-item">
          <span>部门：</span>
          <el-cascader
            v-model="search.department"
            :options="options"></el-cascader>
        </div>
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
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="代码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="角色">
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="1"
            layout="total, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import {getUserList} from '@/api/user'
export default {
  name: 'user',
  data () {
    return {
      search: {
        department: [],
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
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }]
      }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this._getUserList()
  },
  methods: {
    _getUserList () {
      const getInfo = {
        pageSize: 5,
        pageCurrent: 1,
        url: 'getUserInfo'
      }
      getUserList(getInfo).then((res) => {
        console.log(res)
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
