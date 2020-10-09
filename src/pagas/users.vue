<template>
<div>
<!--    面包屑-->
 <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>用户管理</el-breadcrumb-item>
     <el-breadcrumb-item>用户列表</el-breadcrumb-item>
 </el-breadcrumb>
<!--    卡片-->
<el-card class="box-card">
    <div class="text item">
        <el-input placeholder="请输入内容" v-model="page.query" class="input-with-select" @input="getUserList">
            <el-button slot="append" type="success" @click="reback">重置</el-button>
        </el-input>
        <el-button type="primary" style="margin-left: 30px" @click="addUser">添加用户</el-button>
    </div>
    <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱" ></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色" ></el-table-column>
        <el-table-column prop="sign" label="状态" align="center"><template slot-scope="scope"><el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeState(scope.row)"></el-switch></template></el-table-column>
        <el-table-column prop="setting" label="操作" width="250" align="center">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="warning" icon="el-icon-delete"></el-button>
            <el-tooltip  effect="dark" content="分配角色" placement="top">
                <el-button type="primary" icon="el-icon-aim"></el-button>
            </el-tooltip>
        </el-table-column>
    </el-table>
    <div class="block">
        <span class="demonstration"></span>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="page.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</el-card>
</div>
</template>
<script>
export default {
  data () {
    return {
      page: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      loading: true,
      total: 0,
      input: '',
      tableData: [{}]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      this.$http.get('users', { params: this.page }).then(res => {
        this.tableData = res.data.data.users
        this.total = res.data.data.total
        this.page.pagenum = res.data.data.pagenum
        console.log(res.data.data)
      })
      this.loading = false
    },
    handleSizeChange (val) {
      this.page.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.page.pagenum = val
      this.getUserList()
    },
    addUser () {
    },
    changeState (e) {
      this.$http.put(`users/${e.id}/state/${e.mg_state}`)
    },
    reback () {
      this.page.query = ''
      this.getUserList()
    }
  }
}
</script>
<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        margin-top: 30px;
        width: 100%;
    }
    .input-with-select{
        margin-left: 30px;
        background-color: #fff;
        width: 40%;
    }
    .block{
        margin-top:30px;
    }
</style>
