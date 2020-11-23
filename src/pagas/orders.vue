<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-input style="width: 30%;margin:0 20px 20px 0" placeholder="请输入查询内容" size="small"/>
      <el-button type="primary" size="small">查询</el-button>
      <el-table border stripe size="small" highlight-current-row>
      </el-table>
    </el-card>
  </div>
</template>
<script></script>
<style></style>
