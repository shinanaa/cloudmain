<template>
    <div class="notice">
      <div class="search">
        <div class="search-item">
          <span>类型：</span>
          <el-select v-model="search.type" placeholder="请选择">
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>标题：</span>
          <el-input v-model="search.code" placeholder="请输入文章标题"></el-input>
        </div>
        <div class="search-item">
          <span>状态：</span>
          <el-select v-model="search.state" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="searchNotice">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button type="primary" @click="addNotice">新增</el-button>
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="noticeList"
            style="width: 100%">
            <el-table-column prop="mc" label="类型"></el-table-column>
            <el-table-column prop="dm" label="标题"></el-table-column>
            <el-table-column prop="lxr" label="发布时间"></el-table-column>
            <el-table-column prop="dh" label="发布人"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.zt === '1'">编辑</span>
                <span v-if="scope.row.zt === '2'">发布</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="seeNotice(scope.row)">查看</el-button>
                <el-button size="mini" type="success" @click="editNotice(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteNotice(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'notice',
  data () {
    return {
      listType: true,
      search: {
        type: '',
        title: '',
        state: ''
      },
      types: [
        {value: '1', label: '通知'},
        {value: '2', label: '公告'}
      ],
      states: [
        {value: '', label: '全部'},
        {value: '1', label: '编辑'},
        {value: '2', label: '发布'}
      ],
      noticeList: []
    }
  },
  methods: {
    searchNotice () {},
    seeNotice () {},
    addNotice () {},
    editNotice () {},
    deleteNotice () {}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .notice
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
