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
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
    <el-table
            :data="tableData"
            border
            style="width: 100%">
        <el-table-column
                prop="name"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="email"
                label="邮箱"
                width="180">
        </el-table-column>
        <el-table-column
                prop="tel"
                label="电话"
                width="180">
        </el-table-column>
        <el-table-column
                prop="role"
                label="角色"
                width="180">
        </el-table-column>
        <el-table-column
                prop="sign"
                label="状态"
                width="180">
            <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
            </el-switch>
        </el-table-column>
        <el-table-column
                prop="setting"
                label="操作"
                width="180">
        </el-table-column>
    </el-table>
    <div class="block">
        <span class="demonstration"></span>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
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
        pagenum: '1',
        pagesize: '2'
      },
      currentPage: 4,
      value: true,
      input: '',
      tableData: [{
        email: '15809812381@163.com',
        name: '吴广帅',
        address: '上海市普陀区金沙江路 1518 弄',
        tel: '15809812381',
        role: '管理员'
      }]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      this.$http.get('users', this.page).then(res => {
        console.log(res)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
