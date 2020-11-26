<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tag type="danger" style="width: 100%">
        <el-icon class="el-icon-info"/>
        注意：只允许为第三集分类设置相关参数
      </el-tag>
      <el-form>
        <el-form-item label="选择商品分类 ： " label-width="100px">
          <el-cascader v-model="value" :options="options" :props="expand" @change="handleChange" style="width: 20%"
                       placeholder="请选择商品"/>
        </el-form-item>
      </el-form>
      <el-tabs v-model="active" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name='1'>
          <el-button type="primary" size="small" style="margin: 10px 0 20px 0">添加参数</el-button>
          <el-table :data="manyTableData" size="small" border stripe fit highlight-current-row>
            <el-table-column type="expand" prop="attr_name">
              <template slot-scope="scops">
                <el-tag v-for="(item, id) in scops.row.attr_vals" :key="id" closable disable-transitions hit>{{item}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index" index label="序号" width="50px" align="center"/>
            <el-table-column prop="attr_name" align="center"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scops">
                <el-button type="primary" @click="edit = true" style="margin-right: 20px" size="mini">修改</el-button>
                <el-button type="danger" @click="delete(scops.row)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="2">
          <el-button type="primary" size="small" style="margin: 10px 0 20px 0">添加参数</el-button>
          <el-table :data="manyTableData" size="small" border stripe fit highlight-current-row>
            <el-table-column type="expand" prop="attr_name">
              <template slot-scope="scops">
                <el-tag v-for="(item, id) in scops.row.attr_vals" :key="id" closable disable-transitions hit
                        style="width: auto">{{item}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"/>
                <el-button v-else size="small" @click="showInput">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" index label="序号" width="50px" align="center"/>
            <el-table-column prop="attr_name" align="center"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scops">
                <el-button type="primary" @click="edit = true" style="margin-right: 20px" size="mini">修改</el-button>
                <el-button type="danger" @click="delete(scops.row)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :visible.sync="edit"></el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        inputValue: '',
        inputVisible: false,
        sel: 'many',
        manyTableData: [],
        edit: false,
        active: '1',
        value: [],
        options: [],
        expand: {
          expandTrigger: 'hover',
          label: 'cat_name',
          value: 'cat_id'
        }
      }
    },
    methods: {
      delete (e) {
        console.log(e)
      },
      async handleChange () {
        const { data: res } = await this.$http.get(`categories/${this.value[2]}/attributes`, {
          params: {
            sel: this.sel
          }
        })
        this.manyTableData = res.data
        this.manyTableData.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals = item.attr_vals.split(',') : []
        })
        console.log(this.manyTableData)
      },
      handleClick (e) {
        if (e.name === '2') {
          this.sel = 'only'
          this.handleChange()
        } else {
          this.sel = 'many'
          this.handleChange()
        }
      },
      async getInfo () {
        const { data: res } = await this.$http.get('categories', {
          params: {
            type: 3
          }
        })
        this.options = res.data
      }
    },
    mounted () {
      this.getInfo()
    }
  }
</script>
<style></style>
