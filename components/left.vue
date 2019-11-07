<template>
  <div class="page-left-index m-t-20">
    <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
      <!--<el-radio-button :label="false">展开</el-radio-button>-->
      <!--<el-radio-button :label="true">收起</el-radio-button>-->
    <!--</el-radio-group>-->
    <el-menu :default-active="activeIndex"
             @open="handleOpen"
             @close="handleClose"
             class="el-menu-vertical-demo"
             :collapse="isCollapse">
      <el-submenu :index="index + ''" :class="{'is-active': activeIndex == index}" v-for="(left,index) in lefts" :key="index" @click="goto">
        <template slot="title">
          <i :class="left.icon"></i>
          <span slot="title">{{ left.label }}</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: 'page-left-index',
    data () {
      return {
        isCollapse: false,
        activeIndex: '0',
        lefts: [
          { label: "数据列表", icon: "el-icon-tickets", url: 'record'},
          { label: "用户列表", icon: "el-icon-user", url: 'user'}
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        this.activeIndex = key + ''
        this.$router.push(this.lefts[this.activeIndex].url)
      },
      handleClose(key, keyPath) {
        this.activeIndex = key + ''
        this.$router.push(this.lefts[this.activeIndex].url)
      },
      goto (item) {
        this.$route.push(item.url)
      }
    }
  }
</script>
<style lang="less">
  .page-left-index{
    .el-submenu__icon-arrow{
      display: none;
    }
    .el-menu{
      border-right: none;
    }
  }
</style>
