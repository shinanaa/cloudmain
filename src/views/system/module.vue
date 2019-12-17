<template>
    <div class="module">
      <div class="search">
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
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="moduleList"
            style="width: 100%">
            <el-table-column prop="mc" label="名称"></el-table-column>
            <el-table-column prop="dm" label="代码"></el-table-column>
            <el-table-column prop="tb" label="图标"></el-table-column>
            <el-table-column prop="xh" label="序号"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.zt === 'Y' ? '使用' : '禁用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="success">修改</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
          <div class="cardItem" v-for="(item, index) in moduleList" :key="index">
            <div class="userName">{{item.mc}}</div>
            <div class="infoWrapper">
              <div class="info-item">
                <span class="info-key">代码</span>
                <span class="info-value">{{item.dm}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">图标</span>
                <span class="info-value">{{item.tb}}</span>
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
              <el-button size="mini" type="success">修改</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </div>
          </div>
        </div>
        <el-pagination
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import {getModuleList} from '@/api/module'
import {ERR_CODE} from 'common/js/config'
export default {
  name: 'module',
  data () {
    return {
      listType: true,
      search: {
        userName: '',
        state: ''
      },
      states: [
        {value: 'all', label: '全部'},
        {value: 'N', label: '停用'},
        {value: 'Y', label: '使用'}
      ],
      moduleList: [],
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 5
    }
  },
  created () {
    this._getModuleList(this.pageSize, this.currentPage)
  },
  methods: {
    _getModuleList (pageSize, currentPage) {
      const getInfo = {
        pageSize: pageSize,
        pageCurrent: currentPage,
        url: 'getModuleInfo'
      }
      getModuleList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.moduleList = res.rows
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

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "~common/stylus/mixin"
.module
  padding: 0 35px
  .search
    .search-item
      display: inline-block
      margin-top: 133px
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
      .card-btn
        heihgt: 70px
        line-height: 70px
    .el-pagination
      padding: 15px 20px
</style>
