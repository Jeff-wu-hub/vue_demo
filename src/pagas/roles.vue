<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-card style="margin-top: 30px">
        <el-button type="primary">添加用户</el-button>
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
            <template>
              <el-button type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete">删除</el-button>
              <el-button type="warning" icon="el-icon-setting">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      rolesList: []
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
