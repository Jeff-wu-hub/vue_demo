<template>
  <div class="bg">
    <div class="main">
      <div class="photo"><img src="../assets/pexels-photo-179114.jpeg" alt="头像图片"></div>
      <div class="text"><h2>欢迎登陆XX管理系统</h2></div>
      <!-- 登陆表单 -->
      <div class="form">
        <el-input class="input" v-model="log.username" prefix-icon="el-icon-user" placeholder="请输入账号" ></el-input>
        <el-input class="input" v-model="log.password" placeholder="请输入密码" prefix-icon="el-icon-key
" @keyup.enter.native="login" type="password" id=""></el-input>
        <el-button class="button" @click="login" >Login</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
/* 整体form */
.main{
  box-shadow: #000010 10px 10px 50px;
  width: 550px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 20px 20px;
}
/* 头像 */
  .photo{
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  top: -50px;
  left: 50%;
  transform: translate(-50%);
  border:solid 2px;
  }
  .photo img{
    width: 100%;
    height: 100%;
  }
  /* 文本h2标题 */
  .text{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
  }
  /* 输入表单 */
  .form{
    position: relative;
    top: 5%;
    left:50%;
    transform: translate(-50%);
    width: 60%;
  }
  .input{
    margin-top: 50px;
  }
  .button{
    position: relative;
    margin-top: 30px;
    left: 50%;
    transform: translate(-50%);
  }
</style>
<script>
export default {
  data () {
    return {
      log: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    // 登陆方法
    login () {
      this.$http.post('login', this.log).then(res => {
        if (res.data.meta.status !== 200) this.$message.error('用户名或密码错误，请重试！')
        else if (res.data.meta.status === 200) {
          window.sessionStorage.setItem('token', res.data.data.token)
          this.$message.success('登陆成功！')
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>
