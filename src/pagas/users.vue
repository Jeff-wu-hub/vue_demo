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
          <!--          修改信息-->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"/>
            <!--          删除用户-->
            <el-button type="warning" icon="el-icon-delete" @click="deleteUser(scope.row)"/>
            <!--          分配权限-->
            <el-tooltip effect="dark" content="分配角色" placement="top">
              <el-button type="primary" icon="el-icon-aim"/>
            </el-tooltip>
          </template>
        </el-table-column>
    </el-table>
  <!--  底部跳转页面-->
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
  <!--  添加用户-->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%" before-close="true">
      <el-form :model="Form" :rules="rules" ref="FormRef" label-width="150px" class="FormRef">
        <el-form-item label="姓 名:" prop="username">
          <el-input type="text" v-model="Form.username" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="邮 箱:" prop="email" size="medium">
          <el-input type="email" v-model="Form.email" style="width: 39%"/>
          <el-select v-model="Tem_email" placeholder="请选择" style="margin-left: 20px">
            <el-option v-for="item in select_options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="电 话:" prop="mobile">
          <el-input type="tel" v-model="Form.mobile" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="密 码:" prop="text_password">
          <el-input type="password" show-password v-model="test_pass" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="确认密码:" prop="password">
          <el-input type="password" show-password v-model="Form.password" style="width: 80%"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addUserCancel('FormRef')">取 消</el-button>
          <el-button type="primary" @click="addUserConfirm()">确 定</el-button>
        </span>
    </el-dialog>
  <!--  编辑用户页面-->
  <el-dialog title="编辑信息" :visible="EditdialogVisible" width="40%" before-close="true">
    <el-form :model="EditForm" :rules="rules" label-width="150px" label-position="center" ref="editFormRef">
      <el-form-item label="用户名 : " prop="username">
        <el-input v-model="EditForm.username" :disabled="true" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="邮箱地址 : " prop="email">
        <el-input v-model="EditForm.email" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="联系方式 : " prop="mobile">
        <el-input v-model="EditForm.mobile" style="width: 80%"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editUserCancel()">取 消</el-button>
      <el-button type="primary" @click="editUserConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
export default {
  data () {
    const emailRex = /^[a-zA-Z0-9_]+[a-zA-Z0-9_]/
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
    const passwordTest = (rule, value, callback) => {
      if (!this.test_pass) {
        return callback(new Error('请输入密码'))
      }
      callback()
    }
    const passTest = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      }
      if (value !== this.test_pass) {
        return callback(new Error('两次密码不一致'))
      }
      callback()
    }
    return {
      page: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      EditForm: {}, // 修改用户信息,
      Form: { // 增加用户
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      Tem_email: '@163.com', // 临时变量
      rules: { // 增加用户验证规则
        username: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: emailTest,
            required: true,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            validator: telTest,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: passTest,
            trigger: 'blur'
          }
        ],
        text_password: [
          {
            required: true,
            validator: passwordTest,
            trigger: 'blur'
          }
        ]
      },
      test_pass: '',
      dialogVisible: false,
      EditdialogVisible: false, // 修改用户信息
      loading: true,
      total: 0,
      input: '',
      tableData: [{}],
      select_options: [
        {
          value: '@163.com',
          label: '@163.com'
        },
        {
          value: '@qq.com',
          label: '@qq.com'
        }
      ]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () { // 调用API获取用户信息
      this.$http.get('users', { params: this.page }).then(res => {
        this.tableData = res.data.data.users
        this.total = res.data.data.total
        this.page.pagenum = res.data.data.pagenum
      })
      this.loading = false
    },
    handleSizeChange (val) { // 改变页面数量
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
    changeState (e) { // 改变状态
      this.$http.put(`users/${e.id}/state/${e.mg_state}`)
    },
    reback () {
      this.page.query = ''
      this.getUserList()
    },
    addUserCancel (e) { // 取消操作
      this.dialogVisible = false
      this.$refs[e].resetFields()
    },
    addUserConfirm () { // 增加用户
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
              this.getUserList()
            }
          })
        }
      })
    },
    async showEditDialog (e) { // 编辑用户信息
      this.EditdialogVisible = true
      const { data: res } = await this.$http.get('users/' + e)
      if (res.meta.status !== 200) {
        return this.$message.error('查询信息失败')
      }
      this.EditForm = res.data
    },
    editUserCancel () { //
      this.EditdialogVisible = false
    },
    editUserConfirm () {
      this.$refs.editFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.put('users/' + this.EditForm.id, {
            email: this.EditForm.email,
            mobile: this.EditForm.mobile
          })
          if (res.meta.status === 200) {
            this.$message.success('更新成功!')
            this.EditdialogVisible = false
            this.getUserList()
          } else {
            return this.$message.error('编辑用户信息失败!')
          }
        } else {
          return this.$message.error('请输入正确格式!')
        }
      })
    },
    deleteUser (e) {
      this.$confirm(`即将删除用户:${e.username}，是否继续?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('users/' + e.id).then(res => {
          this.$message.success('删除成功!')
          console.log(res)
          this.getUserList()
        }).catch(() => {
          this.$message.error('删除失败!')
        })
      }).catch(() => {
        this.$message.info('取消操作!')
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
