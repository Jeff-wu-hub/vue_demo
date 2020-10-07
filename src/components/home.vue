<template>
<el-container class="container">
  <el-header class="head">
      <div class="home_head">
          <img src="../assets/pexels-photo-179114.jpeg" alt="用户头像">
          <span>商务管理后台</span>
      </div>
      <el-button type="primary">退出</el-button>
    </el-header>
  <el-container>
    <el-aside width="200px" class="aside">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
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
.main{
    background-color: rgb(87, 85, 85);
}
</style>
<script>
export default {
  data () {
    return {
      activeName: '1'
    }
  }
}
</script>
