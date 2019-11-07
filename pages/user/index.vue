<template>
  <div class="page-record-index m-t-20 m-l-10">
    <div>用户列表
      <div>添加用户</div>
      <div>生成二维码</div>
      <div>备注</div>
      <div>赛选</div>
      <div>修改状态</div>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline="true" :model="searchForm" class="search-form m-t-30">
      <el-form-item label="审批人">
        <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="searchForm.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addUser">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      class="m-t-10"
      :data="tableData"
      stripe
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editUser(scope.row, scope.$index)">编辑</el-button>
          <el-button type="text" @click="deleteUser(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <addUserDialog ref="addUserDialog"></addUserDialog>

  </div>
</template>
<script>
  import addUserDialog from '~/components/dialog/addUserDialog'
  export default {
    name: 'page-record-index',
    data () {
      return {
        searchForm: {
          user: '',
          region: ''
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
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },

      addUser () {
        this.$refs.addUserDialog.dialogVisible = true
      },

      editUser(user, index) {
        this.$refs.userForm = {
          name: '',
          role: 1,
          account: '',
          password: '',
          userId: user.userId
        };
        this.$refs.addUserDialog.dialogVisible = true
      },

      deleteUser(user, index) {
        this.$confirm('确定删除该账号', '提示').then(() => {
          this.$axios.$post('/api/v1/user/remove', {
            userId: user.userId
          }).then((resp) => {
            if (resp.code == 200) {
              this.userList.splice(index, 1);
              this.$notify.success({
                title: "成功",
                message: "删除成功"
              });
            } else {
              this.$notify.error({
                title: "失败",
                message: resp.message
              });
            }
          });
        }, () => {

        });
      },
    },
    components: {
      addUserDialog
    }
  }
</script>
<style lang="less">
  .page-record-index{

  }

</style>
