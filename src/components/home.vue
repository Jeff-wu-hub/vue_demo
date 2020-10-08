<template>
<el-container class="container">
  <el-header class="head">
      <div class="home_head">
          <img src="../assets/pexels-photo-179114.jpeg" alt="用户头像">
          <span>商务管理后台</span>
      </div>
      <el-button type="primary" @click="signout">退出</el-button>
    </el-header>
  <el-container>
    <el-aside width="200px" class="aside">
    <el-menu
      :default-active="activeName"
      class="el-menu-vertical-demo"
      background-color="#363233"
      text-color="#fff"
      active-text-color="#ffd04b"
      router="true"
      >
      <el-submenu :index="item.id" v-for="item in menu" :key="item.id">
        <template slot="title">
          <i :class="icon[item.order-1]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="'/'+it.path" v-for="it in item.children" :key="it.id" @click="sessionstore">
              <template slot="title">
                  <i class="el-icon-s-opportunity"></i>
                  <span>{{it.authName}}</span>
              </template>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class="main"><router-view></router-view></el-main>
  </el-container>
</el-container>
</template>
<style scoped>

.head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left:5px;
    width: 100%;
    background-color: rgb(34, 33, 33);
}
.home_head{
    padding-left:20px;
    display:flex;
    align-items: center;
    justify-content: start;
}
.home_head img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.home_head span{
    margin-left: 50px;
    font-size: 1.5em;
    color: white;
}
.aside{
    background-color: rgb(48, 43, 43);
}
.el-menu{
    border-right:none;
}
.main{
    background-color: aliceblue;
}
</style>
<script>
export default {
  created () {
    this.getInfo()
    this.getActive()
  },
  data () {
    return {
      activeName: '',
      menu: [],
      icon: ['el-icon-s-custom', 'el-icon-coordinate', 'el-icon-shopping-bag-2', 'el-icon-chat-dot-square', 'el-icon-pie-chart']
    }
  },
  methods: {
    signout () {
      this.$router.push('/')
      window.sessionStorage.clear()
    },
    getInfo () {
      this.$http.get('menus').then(res => {
        this.menu = res.data.data
      })
    },
    sessionstore (e) {
      window.sessionStorage.setItem('active', e.index)
    },
    getActive () {
      this.activeName = window.sessionStorage.getItem('active')
    }
  }
}
</script>
