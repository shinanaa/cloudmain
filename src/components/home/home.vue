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
        </el-card>
        <el-card class="box-infos">
          <div slot="header" class="clearfix card-head">
            <span>用户整体趋势</span>
          </div>
        </el-card>
      </div>
    </div>
</template>

<script>

export default {
  name: 'home'
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
