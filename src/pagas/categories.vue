<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" style="margin-bottom: 10px" @click="addType">添加分类</el-button>
      <tree-table :data="form" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#"
                  border style="margin-bottom: 10px">
        <template slot="isok" slot-scope="scop">
          <i class="el-icon-error" v-if="scop.row.cat_deleted" style="color: red"></i>
          <i class="el-icon-success" v-else style="color: green"></i>
        </template>
        <template slot="order" slot-scope="scop">
          <el-tag type="success" v-if="scop.row.cat_level === 0" size="mini">一级</el-tag>
          <el-tag type="warning" v-else-if="scop.row.cat_level === 1" size="mini">二级</el-tag>
          <el-tag type="info" v-else size="mini">三级</el-tag>
        </template>
        <template slot="control" slot-scope="scop">
          <el-button type="primary" @click="editInfo(scop.row)" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" @click="deleteInfo(scop.row)" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <el-pagination background layout="prev,pager,next,total,jumper" :total="total" :current-page="page.pagenum"
                     :page-size="page.pagesize" @current-change="currentChange"/>
      <el-dialog title="添加分类" :visible="addTypeShow" width="30%" :show-close="false">
        <el-form :model="subType" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称 ： " prop="cat_name">
            <el-input v-model="subType.cat_name"/>
          </el-form-item>
          <el-form-item label="父级分类 ： ">
            <el-cascader v-model="goodsType.id" :options="goodsTypeOptions" @change="handleChange"
                         :props="cascaderProps" clearable/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addTypeShow = false">取 消</el-button>
            <el-button type="primary" @click="confirmSubmmit">确 定</el-button>
          </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      total: '',
      cascaderProps: {
        checkStrictly: true,
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      addTypeShow: false,
      goodsType: {
        id: []
      },
      subType: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      goodsTypeOptions: [],
      rules: {
        cat_name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }
        ]
      },
      page: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      form: [],
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      }, {
        label: '是否有效',
        type: 'template',
        template: 'isok'
      }, {
        label: '排序',
        type: 'template',
        template: 'order'
      }, {
        label: '操作',
        type: 'template',
        template: 'control'
      }]
    }
  },
  methods: {
    getCategories: async function () {
      const { data: e } = await this.$http.get('categories', {
        params: this.page
      })
      if (e.meta.status === 200) {
        this.form = e.data.result
        this.total = e.data.total
      }
    },
    currentChange (e) {
      this.page.pagenum = e
      this.getCategories()
    },
    addType () {
      this.addTypeShow = true
      this.getParantesIdList()
    },
    async getParantesIdList () {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      this.goodsTypeOptions = res.data
    },
    handleChange () {
      if (this.goodsType.id.length > 0) {
        this.subType.cat_pid = this.goodsType.id[this.goodsType.id.length - 1]
        this.subType.cat_level = this.goodsType.id.length
      } else {
        this.subType.cat_pid = 0
        this.subType.cat_level = 0
      }
    },
    async confirmSubmmit () {
      const { data: res } = await this.$http.post('categories', this.subType)
      if (res.meta.status === 201) {
        this.getCategories()
        this.addTypeShow = false
        this.$refs.ruleForm.resetFields()
      }
      return this.$message.info(res.meta.msg)
    },
    async editInfo (e) {
      const result = await this.$prompt('输入要修改的名字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: e.cat_name
      }).catch(() => {
        return this.$message.info('取消编辑')
      })
      if (result.action === 'confirm') {
        const { data: res } = await this.$http.put(`categories/${e.cat_id}`, { cat_name: result.value })
        console.log(res)
        if (res.meta.status === 200) {
          return this.$message.success(res.meta.msg)
        } else {
          return this.$message.error(res.meta.msg)
        }
      }
    },
    async deleteInfo (e) {
      const result = await this.$confirm(`确定删除：${e.cat_name}`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        return this.$message.info('取消操作')
      })
      if (result === 'confirm') {
        const { data: res } = await this.$http.delete(`categories/${e.cat_id}`)
        if (res.meta.status === 200) {
          this.getCategories()
          return this.$message.success(res.meta.msg)
        } else {
          return this.$message.error(res.meta.msg)
        }
      }
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>
<style>
  .el-cascader {
    width: 100%;
  }
</style>
