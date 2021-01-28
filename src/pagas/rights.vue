<template>
  <!--  全局div-->
  <div class="content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
      <el-table :data="rightsList" stripe border highlight-current-row>
        <el-table-column label="#" align="center" width="50%" type="index"/>
        <el-table-column label="权限名称" align="center" prop="authName"/>
        <el-table-column label="路径" align="center" prop="path"/>
        <el-table-column label="权限等级" align="center" prop="level">
          <template slot-scope="scop">
            <el-tag type="success" v-if="scop.row.level === '0'">一级</el-tag>
            <el-tag type="warning" v-else-if="scop.row.level === '1'">二级</el-tag>
            <el-tag type="info" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  methods: {
    getRights (e) {
      this.$http.get('/rights/' + e).then(res => {
        this.rightsList = res.data.data
      }).catch(() => {
        this.$message.error('请求失败')
      })
    }
  },
  mounted () {
    this.getRights('list')
  },
  watch: {}
}
</script>
<style>
  .content {
    width: 100%;
    height: 100%;
  }

  .card {
    margin-top: 30px;
  }
</style>
