<template>
  <div class="page-record-index m-t-20 m-l-10">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline="true" :model="searchForm" class="search-form m-t-30">
      <el-form-item label="用户名/昵称">
        <el-input v-model="searchForm.name" placeholder="请输入用户名或者昵称"></el-input>
      </el-form-item>
      <el-form-item label="成员类型">
        <el-select v-model="searchForm.role" @change="getList" placeholder="请选择成员类型">
          <el-option v-for="item in roleList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="addAdmin">添加成员</el-button>
      </el-form-item>
    </el-form>

    <el-table
      class="m-t-10"
      v-loading="listLoading"
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="create_time"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nick_name"
        label="姓名/昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="类型">
        <template slot-scope="scope">
          <span v-for="item in roleList"
                v-if="scope.row.role == item.value"
                :key="item.value">{{ item.label }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="280">
        <template slot-scope="scope">
          <el-button @click="editAdmin(scope.row)"
                     type="primary"
                     plain
                     size="small">编辑</el-button>
          <el-button plain v-if="scope.row.status == 1" @click="changeStatus(scope.row, 2)" size="small">停用</el-button>
          <el-button type="primary" plain v-if="scope.row.status == 2" @click="changeStatus(scope.row, 1)" size="small">启用</el-button>
          <el-button @click="deleteAdmin(scope.row)"
                     type="danger"
                     plain
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="text-center p-t-30 p-b-15"
      @size-change="handleSizeChange"
      :current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      :page-sizes="[10, 30, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.totalCount"
      @current-change="getList">
    </el-pagination>

    <addAdminDialog ref="addAdminDialog"
                    :info="info"
                    @resetForm="resetForm"
                    @getList="getList">
    </addAdminDialog>
  </div>
</template>
<script>
  import addAdminDialog from '~/components/dialog/addAdminDialog'

  export default {
    name: 'page-record-index',
    data () {
      return {
        listLoading: false,
        searchForm: {
          name: '',
          role: 0
        },
        info: {},
        roleList: [{ label: '全部', value: 0 },{ label: '管理员', value: 1 }, { label: '成员', value: 2 }],
        tableData: [],
        pageInfo:{
          pageNum: 1,
          pageSize: 10,
          totalCount: 100
        }
      }
    },

    components: { addAdminDialog },

    mounted () {
      this.getList()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },

      getList(page) {
        if (!page) {
          page = 1;
        }
        this.pageInfo.page = page;
        this.listLoading = true
        this.$axios.$get(`/getAllAdmin?name=${this.searchForm.name}&role=${this.searchForm.role}&pageNum=${this.pageInfo.pageNum}&pageSize=${this.pageInfo.pageSize}`).then((res) => {
          this.listLoading = false
          this.tableData = res.content.list || []
          this.pageInfo = res.content.pageInfo
        }).catch(() => {
          this.listLoading = false
        })
      },

      deleteAdmin (item) {
        this.$axios.$post('/deleteAdmin', {
          id: item.id
        }).then((res) => {
          this.$message.success("删除成功")
          this.getList()
        });
      },

      editAdmin(item) {
        this.info = item
        this.$refs.addAdminDialog.dialogVisible = true
      },

      resetForm() {
        this.info = {}
      },

      addAdmin() {
        this.$refs.addAdminDialog.open()
      },

      changeStatus(item, status) {
        let message = '停用成功'
        this.$confirm('确定停用吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$axios.$post('/changeStatus', {
            id: item.id,
            status
          }).then((res) => {
            if (status == 1) { message = '停用成功' }
            this.$message.success(message)
            this.getList()
          });
        }).catch(() => {
        });
      },

      handleSizeChange(val) {
        this.pageInfo.pageSize = val
        this.getList()
      },
    }
  }
</script>
<style lang="less">
  .page-record-index{

  }

</style>
