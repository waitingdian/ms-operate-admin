<template>
  <div class="top-bar-container box-shadow">
    <img class="logo" src="../static/images/small-transparent-logo.png" alt="">
    <!--<span style="display: inline-block">码上汇编程</span>-->
    <div class="pull-right cursor-pointer" @click="signOut">
      <i class="icontuichu iconfont fs24"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'topBar',
    data() {
      return {
      }
    },
    beforeMount () {

    },
    mounted () {
    },
    methods: {
      // 退出
      signOut() {
        this.$router.push('/login')
      },
      personal () {
        this.$router.push('/personal/order')
      }
    }
  }
</script>
<style lang="less">
  @import '../assets/css/theme-basic';
  .top-bar-container{
    height: @header-height;
    line-height: @header-height;
    padding: 0 60px;
    .logo{
      width: 40px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 20px;
    }
  }
</style>
