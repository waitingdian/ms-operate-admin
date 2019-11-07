<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <div>
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
        <el-form-item label="账号类型" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择活动区域">
            <el-option v-for="item in roleList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入成员真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="成员账号" prop="account">
          <el-input v-model="userForm.account " placeholder="账号用于成员登录"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="userForm.password" placeholder="成员登录密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  export default {
    name: 'page-record-index',
    data () {
      return {
        dialogVisible: false,
        userForm: {
          name: '',
          role: 1,
          account: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入成员名称', trigger: 'blur'}
          ],
          role: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          account: [
            {required: true, message: '请输入成员登录账号', trigger: 'blur'},
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
    methods: {
      handleClose () {
        if (this.userForm.userId) {
          this.resetForm();
        }
        this.dialogVisible = false;
      },

      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm() {
        this.user = {
          name: '',
          role: 1,
          account: '',
          password: ''
        };
      },
    }
  }
</script>
<style lang="less">

</style>
