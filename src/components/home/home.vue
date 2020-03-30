<template>
    <div class="home">
      <div class="count">
        <el-card class="box-card">
          <div class="count-info">
            <img src="@/common/img/user.png" alt="">
            <div class="count-num">
              <b>37</b>
              <p>单位数量</p>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="count-info">
            <img src="@/common/img/user.png" alt="">
            <div class="count-num">
              <b>1089</b>
              <p>用户数量</p>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="count-info">
            <img src="@/common/img/user.png" alt="">
            <div class="count-num">
              <b>26</b>
              <p>模块数量</p>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="count-info">
            <img src="@/common/img/user.png" alt="">
            <div class="count-num">
              <b>375</b>
              <p>数据信息</p>
            </div>
          </div>
        </el-card>
      </div>
      <div class="lists">
        <el-card class="box-infos">
          <div slot="header" class="clearfix card-head">
            <span>活跃用户统计</span>
          </div>
          <el-row :gutter="60">
            <el-col :span="12">
              <template>
                <ve-line :data="chartData" :settings="chartSettings" :legend-visible="false"></ve-line>
              </template>
            </el-col>
            <el-col :span="12">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#4e77b5',color:'#FFFFFF'}"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-infos">
          <div slot="header" class="clearfix card-head">
            <span>用户整体趋势</span>
          </div>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#4e77b5',color:'#FFFFFF'}"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12">
              <template>
                <ve-line :data="chartData"></ve-line>
              </template>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    this.chartSettings = {
      area: true
    }
    this.colors = ['#4e77b5']
    return {
      chartData: {
        columns: ['日期', '活跃度'],
        rows: [
          { '日期': '1/1', '活跃度': 1093 },
          { '日期': '1/2', '活跃度': 3230 },
          { '日期': '1/3', '活跃度': 2623 },
          { '日期': '1/4', '活跃度': 1423 },
          { '日期': '1/5', '活跃度': 3492 },
          { '日期': '1/6', '活跃度': 4293 }
        ]
      },
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
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.home
  padding: 30px
  margin-top: 80px
  min-width:1200px
  box-sizing: border-box
  .count
    margin: 0
    padding: 0
    text-align: justify
    text-align-last:justify
    .box-card
      display: inline-block
      box-sizing: border-box
      width: 23.5%
      text-align-last: start
      .count-info
        img
          width: 60px
          height: 60px
          margin-right: 20px
          vertical-align: sub
        .count-num
          display: inline-block
          line-height: 30px
          b
            font-size: 34px
            color: $color-theme
          p
            font-size: 15px
            color: $color-dialog-background
      &:hover
        background: #293b5a
        .count-num
          b
            color: $color-text
          p
            color: $color-text
  .lists
    .box-infos
      margin-top: 30px
      .card-head
        span
          color: $color-theme
          font-size: 18px
          font-weight: bold
</style>
