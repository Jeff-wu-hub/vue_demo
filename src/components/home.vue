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
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#363233"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
      <el-submenu :index="item.id" v-for="item in menu" :key="item.id">
        <template slot="title">
          <i :class="item.i"></i>
          <span>{{item.title}}</span>
        </template>
          <el-menu-item index="1-1">
              <template slot="title">
                  <i :class="item.i"></i>
                  <span>{{item.title}}</span>
              </template>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class="main">Main</el-main>
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
    background-color: rgb(87, 85, 85);
}
</style>
<script>
export default {
  data () {
    return {
      activeName: '1',
      menu: [
        { id: '1', title: '权限管理', path: 'rights', i: 'el-icon-s-custom' },
        { id: '2', title: '商品管理', path: 'goods', i: 'el-icon-s-goods' },
        { id: '3', title: '订单管理', path: 'shoplist', i: 'el-icon-receiving' },
        { id: '4', title: '数据统计', path: 'datacom', i: 'el-icon-pie-chart' },
        { id: '5', title: '库存管理', path: 'product', i: 'el-icon-box' }
      ]
    }
  },
  methods: {
    signout () {
      this.$router.push('/')
    }
  }
}
</script>
