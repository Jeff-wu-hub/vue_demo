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
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%" before-close="true">
        <el-form :model="Form" :rules="rules" ref="FormRef" label-width="150px" class="FormRef">
            <el-form-item label="姓 名:" prop="username" ><el-input type="text" v-model="Form.username" style="width: 80%"></el-input></el-form-item>
            <el-form-item label="邮 箱:" prop="email"><el-input type="email" v-model="Form.email" style="width: 46.5%"></el-input><el-select v-model="Tem_email" placeholder="请选择">
                <el-option v-for="item in select_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select></el-form-item>
            <el-form-item label="电 话:" prop="mobile"><el-input type="tel" v-model="Form.mobile" style="width: 80%"></el-input></el-form-item>
            <el-form-item label="密 码:" prop="text_password"><el-input type="password" show-password v-model="test_password" style="width: 80%"></el-input></el-form-item>
            <el-form-item label="确认密码:" prop="password"><el-input type="password" show-password v-model="Form.password" style="width: 80%"></el-input></el-form-item>
        </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addUserCancel('FormRef')">取 消</el-button>
    <el-button type="primary" @click="addUserConfirm()">确 定</el-button>
  </span>
    </el-dialog>
</div>
</template>
<script>
export default {
  data () {
    const emailRex = /^[a-zA-Z0-9_]/
    const telRex = /^1+[3-9]+[0-9]{9}/
    const emailTest = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (!emailRex.test(value)) {
        return callback(new Error('邮箱名称不合法'))
      }
      callback()
    }
    const telTest = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入电话号'))
      }
      if (!telRex.test(value)) {
        return callback(new Error('电话号不合法'))
      }
      callback()
    }
    const passTest = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      }
      if (value !== this.test_password) {
        return callback(new Error('两次密码不一致'))
      }
      callback()
    }
    return {
      page: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      Form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      Tem_email: '@163.com',
      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { validator: emailTest, required: true, trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: telTest, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: passTest, trigger: 'blur' }
        ],
        text_password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      test_password: '',
      dialogVisible: false,
      loading: true,
      total: 0,
      input: '',
      tableData: [{}],
      select_options: [
        { value: '@163.com', label: '@163.com' },
        { value: '@qq.com', label: '@qq.com' }
      ]
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
      this.dialogVisible = true
    },
    changeState (e) {
      this.$http.put(`users/${e.id}/state/${e.mg_state}`)
    },
    reback () {
      this.page.query = ''
      this.getUserList()
    },
    addUserCancel (e) {
      this.dialogVisible = false
      this.$refs[e].resetFields()
    },
    addUserConfirm () {
      this.$refs.FormRef.validate(valid => {
        if (!valid) {
          this.$message.error('请填写信息')
        }
        if (valid) {
          const a = this.Form.email
          this.Form.email = a + this.Tem_email
          this.$http.post('users', this.Form).then(res => {
            if (res.data.meta.status === 400) {
              this.$message.error(res.data.meta.msg)
            }
            if (res.data.meta.status === 201) {
              this.$message.success(res.data.meta.msg)
              this.dialogVisible = false
            }
          })
        }
      })
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
