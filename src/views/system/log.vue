<template>
    <div class="log common">
      <div class="search">
        <div class="search-item">
          <span>类型</span>
          <el-select v-model="search.type" placeholder="请选择">
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>用户</span>
          <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <span>日期</span>
          <el-date-picker
            v-model="search.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button type="primary" @click="searchLog">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="logList"
            style="width: 100%">
            <el-table-column prop="rq" label="日期"></el-table-column>
            <el-table-column prop="sj" label="时间"></el-table-column>
            <el-table-column prop="dz" label="地址"></el-table-column>
            <el-table-column prop="yh" label="用户"></el-table-column>
            <el-table-column prop="lx" label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.lx === '1'">登录</span>
                <span v-if="scope.row.lx === '2'">操作</span>
              </template>
            </el-table-column>
            <el-table-column prop="nr" label="内容"></el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
          <div class="cardItem" v-for="(item) in logList" :key="item.rzid">
            <div class="userName">{{item.yh}}</div>
            <div class="infoWrapper">
              <div class="info-item">
                <span class="info-key">日期</span>
                <span class="info-value">{{item.rq}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">时间</span>
                <span class="info-value">{{item.sj}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">地址</span>
                <span class="info-value">{{item.dz}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">类型</span>
                <span class="info-value"  v-if="item.lx === '1'">登录</span>
                <span class="info-value"  v-if="item.lx === '2'">操作</span>
              </div>
              <div class="info-item">
                <span class="info-key">内容</span>
                <span class="info-value">{{item.nr}}</span>
              </div>
              <div class="info-item">
              </div>
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
    </div>
</template>

<script>
import {getLogList} from '@/api/log'
import {ERR_CODE} from 'common/js/config'
import {pagingMixin} from 'common/js/mixin'
export default {
  name: 'log',
  mixins: [pagingMixin],
  data () {
    return {
      listType: true,
      types: [
        {value: '', label: '全部'},
        {value: '1', label: '登录'},
        {value: '2', label: '操作'}
      ],
      search: {
        userName: '',
        type: '',
        date: ''
      },
      logList: []
    }
  },
  created () {
    this._getLogList({search: this.search, page: 1})
  },
  methods: {
    searchLog () {
      this._getLogList({search: this.search, page: 1})
    },
    pageChange (val) {
      this.currentPage = val
      this._getLogList({search: this.search})
    },
    _dateAdd0 (time) {
      return time < 10 ? `0${time}` : time
    },
    _changeData (date) {
      return date.getFullYear() + '-' + this._dateAdd0(date.getMonth() + 1) + '-' + this._dateAdd0(date.getDate())
    },
    _getLogList ({search, page = this.currentPage}) {
      if (search.date) {
        if (search.date.length) {
          let dateStart = new Date(search.date[0])
          let dateEnd = new Date(search.date[1])
          search.dateStart = this._changeData(dateStart)
          search.dateEnd = this._changeData(dateEnd)
        } else {
          this.search.dateStart = ''
          this.search.dateEnd = ''
        }
      } else {
        this.search.dateStart = ''
        this.search.dateEnd = ''
      }
      const getInfo = {
        lx: search.type,
        yh: search.userName,
        ksrq: search.dateStart,
        jsrq: search.dateEnd,
        pageSize: this.pageSize,
        pageNo: page,
        url: 'getLogInfo'
      }
      getLogList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          console.log(res)
          this.logList = res.rows
          this.total = res.totalCount
        }
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
