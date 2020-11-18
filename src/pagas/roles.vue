<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-card style="margin-top: 30px">
        <el-button type="primary" @click="addRoles">添加用户</el-button>
        <el-table :data="rolesList" highlight-current-row border stripe style="margin-top: 20px;cursor: pointer">
          <el-table-column type="expand">
            <template slot-scope="scops">
              <!--                渲染展开页面-->
              <el-form label-position="left" inline class="demo-table-expand">
                <el-row v-for="(item1,li1) in scops.row.children" :key="item1.id"
                        :class="['bdbottom', li1===0? 'bdtop' :'bdbottom']" class="center">
                  <!--                  一级菜单-->
                  <el-col :span="5">
                    <el-tag :style="el-tag" closable @close="remoteTag(scops.row.id, item1.id)">{{item1.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--                    二级菜单-->
                  <el-col :span="19">
                    <el-row :class="[ li2===0? '' : 'bdtop']" v-for="(item2,li2) in item1.children" :key="item2.id"
                            class="center">
                      <el-col :span="6">
                        <el-tag :style="el-tag" type="success" closable @close="remoteTag(scops.row.id, item2.id)">
                          {{item2.authName}}
                        </el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="18">
                        <el-row v-for="(item3,li3) in item2.children" :key="item3.id" :class="[li3===0? '': 'bdtop']"
                                class="center">
                          <el-col :span="10">
                            <el-tag :style="el-tag" type="warning" closable @close="remoteTag(scops.row.id, item3.id)">
                              {{item3.authName}}
                            </el-tag>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" align="center" width="50px"/>
          <el-table-column label="角色名称" align="center" prop="roleName"/>
          <el-table-column label="角色描述" align="center" prop="roleDesc"/>
          <el-table-column label="操作" align="center" width="350px">
            <template slot-scope="scop">
              <el-button type="primary" icon="el-icon-edit" @click="editUser(scop.row.id)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="deleteUser(scop.row)">删除</el-button>
              <el-button type="warning" icon="el-icon-setting" @click="assPermissions(scop.row)">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!--    添加用户-->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%" before-close="true">
      <el-form :model="Form" label-width="150px" ref="FormRef">
        <el-form-item label="名 称:" prop="roleName">
          <el-input type="text" v-model="Form.roleName" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="描 述:" prop="roleDesc" size="medium">
          <el-input type="text" v-model="Form.roleDesc" style="width: 80%"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addUserCancel('FormRef')">取 消</el-button>
          <el-button type="primary" @click="addUserConfirm('FormRef')">确 定</el-button>
        </span>
    </el-dialog>
    <!--    编辑用户-->
    <el-dialog title="编辑用户" :visible.sync="dialogVisibleEidt" width="40%" before-close="true">
      <el-form :model="Form" label-width="150px" ref="FormRef">
        <el-form-item label="名 称:" prop="roleName">
          <el-input type="text" v-model="Form.roleName" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="描 述:" prop="roleDesc" size="medium">
          <el-input type="text" v-model="Form.roleDesc" style="width: 80%"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editUserCancel('FormRef')">取 消</el-button>
          <el-button type="primary" @click="editUserConfirm('FormRef')">确 定</el-button>
      </span>
    </el-dialog>
    <!--    分配权限-->
    <el-dialog title="分配权限" :visible.sync="permissions" width="40%" before-close="true">
      <el-tree
        :data="rightsList"
        default-expand-all
        node-key="id"
        :default-checked-keys="defKey"
        show-checkbox
        :props="defaultProps"
        ref="ListTree">
      </el-tree>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editRolesKeyCancel">取 消</el-button>
          <el-button type="primary" @click="editRolesKey">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      editKey: [],
      defKey: [],
      rightsList: [],
      rolesList: [],
      Form: {
        roleName: '',
        roleDesc: ''
      },
      dialogVisible: false,
      dialogVisibleEidt: false,
      permissions: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async getRoles () {
      const { data: res } = await this.$http.get('/roles')
      this.rolesList = res.data
    },
    async remoteTag (roles, id) {
      // 弹框提示是否删除
      const result = await this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).catch(e => console.log(e))
      if (result !== 'confirm') {
        return this.$message.info('取消删除') // 结束函数运行
      }
      const { data: res } = await this.$http.delete(`roles/${roles}/rights/${id}`)
      if (res.meta.status === 200) {
        this.getRoles()
        return this.$message.success('删除成功！')
      }
      this.$message.error('删除失败!')
    },
    addRoles () { // 打开增加用户窗口
      this.dialogVisible = true
    },
    addUserCancel (e) { // 取消增加用户
      this.$refs.[e].resetFields()
      this.dialogVisible = false
    },
    async addUserConfirm (e) { // 确认增加用户
      const { data: res } = await this.$http.post('/roles', this.Form)
      if (res.meta.status === 201) {
        this.getRoles()
        this.dialogVisible = false
        this.$refs.[e].resetFields()
        return this.$message.success('增加成功！')
      }
      return this.$message.error('增加失败！')
    },
    async editUser (id) {
      const { data: res } = await this.$http.get(`roles/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取信息失败！')
      }
      this.Form = res.data
      console.log(this.Form)
      this.dialogVisibleEidt = true
    },
    editUserCancel (e) { // 取消编辑用户
      this.dialogVisibleEidt = false
      this.$refs.[e].resetFields()
      this.$message.info('用户取消操作')
    },
    async editUserConfirm (e) { // 编辑用户
      const { data: res } = await this.$http.put(`roles/${this.Form.roleId}`, {
        roleName: this.Form.roleName,
        roleDesc: this.Form.roleDesc
      })
      if (res.meta.status === 200) {
        this.dialogVisibleEidt = false
        this.getRoles()
        return this.$message.success('修改成功！')
      }
      return this.$message.error('修改失败！')
    },
    deleteUser (e) {
      this.$confirm(`即将删除用户:${e.roleName}，是否继续?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('roles/' + e.id).then(res => {
          this.$message.success('删除成功!')
          console.log(res)
          this.getRoles()
        }).catch(() => {
          this.$message.error('删除失败!')
        })
      }).catch(() => {
        this.$message.info('取消操作!')
      })
    },
    async assPermissions (e) {
      this.permissions = true
      const { data: res } = await this.$http.get('rights/tree')
      this.rightsList = res.data
      this.getListKey(e, this.defKey)
      this.roleId = e.id
    },
    async editRolesKey (e) { // 确认修改权限
      const keys = [...this.$refs.ListTree.getCheckedKeys(), ...this.$refs.ListTree.getHalfCheckedKeys()]
      const idKeys = keys.join(',') // 拼接的字符串
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idKeys }).catch(e)
      if (res.meta.status === 200) {
        this.permissions = false
        this.getRoles()
        return this.$message.success(res.meta.msg)
      }
      return this.$message.error(this.meta.msg)
    },
    getListKey (node, arr) { // 递归获取子节点数组
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getListKey(item, arr)
      })
    },
    editRolesKeyCancel () {
      this.permissions = false
      this.$message.info('取消操作')
    }
  },
  mounted () {
    this.getRoles()
  }
}
</script>
<style>
  .el-tag {
    margin: 7px;
  }

  .bdtop {
    border-top: 1px solid #eeeeee;
  }

  .bdbottom {
    border-bottom: 1px solid #eeeeee;
  }

  .center {
    display: flex;
    align-items: center;
  }
</style>
