<template>
  <div class="page-login">
    <div class="text-white p-l-50 p-t-50 m-t-50 m-l-50">
      <h1>朋来互动 运营后台</h1>
      <h3 class="p-t-15">PengLai Interaction</h3>
      <p class="p-t-35 f-fs20">签到高效 畅通无阻 统计方便</p>
      <p class="p-t-5 f-fs20">大幅提升参会体</p>
    </div>

    <div class="login-section p-t-50 p-r-50 p-l-50">
      <p class="text-center f22 m-b-40">账户登录</p>

      <no-ssr>
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="password" @keyup.enter.native="login"></el-input>
          </el-form-item>
        </el-form>
      </no-ssr>

      <no-ssr>
        <el-button type="primary" class="w-full m-t-20" size="large" @click="login">登录</el-button>
      </no-ssr>

    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    layout: 'empty',
    data() {
      return {
        userName: '',
        password: ''
      }
    },

    methods: {
      login() {
        this.$axios.$post('/api/v1/user/login', {
          account: this.userName.trim(),
          pwd: this.password.trim()
        }).then((res) => {
          this.$store.commit('user/set', res.data.userInfo);
          this.$axios.setHeader('Authorization', res.data.userInfo.token);
          if (sessionStorage && sessionStorage.setItem) {
            sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
            this.$router.push('/');
          }
        });
      }
    }
  }
</script>

<style lang="less">
  .page-login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #509BF9;
    background-image: url('/images/website_bg.png');
    background-size: 800px;
    background-repeat: no-repeat;
    background-position: left center;

    .login-section {
      width: 500px;
      height: 520px;
      position: absolute;
      right: 50px;
      top: 50%;
      margin-top: -255px;
      background-color: #fff;
      border-radius: 10px;
    }
  }
</style>
