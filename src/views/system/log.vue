<template>
    <div class="log">
      <div class="search">
        <div class="search-item">
          <span>类型：</span>
          <el-input v-model="search.type" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <span>用户：</span>
          <el-select v-model="search.userName" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>日期：</span>
          <el-date-picker
            v-model="search.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'log',
  data () {
    return {
      listType: true,
      search: {
        userName: '',
        type: '',
        date: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
