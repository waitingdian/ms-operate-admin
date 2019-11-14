<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="480px"
    class="p-l-15 p-r-15"
    @open="open"
    @close="close">
    <div v-loading="loading">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
        <el-form-item label="账号类型" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择类型" style="width: 100%;">
            <el-option v-for="item in roleList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名/昵称" prop="nick_name">
          <el-input v-model="userForm.nick_name" placeholder="请输入成员真实姓名或昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="userForm.user_name " placeholder="账号用于成员登录"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="userForm.password" placeholder="成员登录密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('userForm')">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    name: 'page-record-index',
    data () {
      return {
        loading: false,
        dialogVisible: false,
        userForm: {
          nick_name: '',
          role: 1,
          user_name: '',
          password: ''
        },
        rules: {
          nick_name: [
            {required: true, message: '请输入成员名称', trigger: 'blur'}
          ],
          user_name: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入成员登录密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
          ]
        },
        roleList: [
          { label: '管理员', value: 1 },
          { label: '操作员', value: 2 }
        ]
      }
    },

    props: {
      info: {
        type: Object,
        default: {}
      }
    },

    methods: {
      close () {
        if (this.info._id) {
          this.$emit("resetForm")
          this.userForm = {
            _id: null,
            nick_name: '',
            role: '',
            user_name: '',
            password: ''
          };
        }
        this.dialogVisible = false;
      },

      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$axios.$post('/addAdmin', {
              ...this.userForm
            }).then((res) => {
              this.loading = false;
              this.dialogVisible = false;
              let message = this.userForm.id ? '编辑成功' : '添加成功'
              this.$message.success(message)
              this.$emit("getList")
            }).catch(() => { this.loading = false})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      open() {
        console.log(this.info._id)
        if (this.info._id) {
          this.userForm = {
            id: this.info._id,
            nick_name: this.info.nick_name,
            role: this.info.role,
            user_name: this.info.user_name,
            password: this.info.password
          };
        }
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang="less">

</style>
