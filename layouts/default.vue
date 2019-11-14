<template>
  <div class="default-layout">
    <el-container>
      <el-header><topBar></topBar></el-header>

      <el-container class="p-t-20 p-r-20">
        <el-aside width="170px"><left></left></el-aside>

        <el-main>
          <nuxt />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>
<script>
  import topBar from '../components/topBar'
  import left from '../components/left'
  export default {
    name: 'page-record-index',
    data () {
      return {}
    },
    components: { topBar, left },
  }
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.default-layout .el-header{
  padding: 0;
}

</style>
