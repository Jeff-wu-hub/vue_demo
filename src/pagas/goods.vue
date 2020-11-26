<template>
    <div>
      <!--      面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--      添加商品选项-->
      <el-card v-if="addGoods" style="width: 80%;margin-left: 50%;transform: translate(-50%)">
        <el-tag style="width: 100%;text-align: center" type="info" class="el-icon-info">添加商品</el-tag>
        <el-steps :active="active" finish-status="success"
                  style="margin-left: 50%;transform: translate(-50%);width: 80%">
          <el-step title="基本信息"/>
          <el-step title="商品参数"/>
          <el-step title="商品属性"/>
          <el-step title="商品图片"/>
          <el-step title="商品内容"/>
        </el-steps>
        <el-form :model="addGoodsForm" :rules="rules" ref="addGoodsForm" label-width="100px" class="demo-ruleForm"
                 label-position="top">
          <el-tabs tab-position="left" style="margin-top: 20px" v-model="active" :before-leave="leave"
                   @tab-click="click">
            <el-tab-pane label="基本信息">
              <el-form-item label="商品名称 ： " label-width="100px" style="margin-left: 50%;transform: translate(-50%)"
                            prop="goods_name">
                <el-input v-model="addGoodsForm.goods_name" style="width: 80%"/>
              </el-form-item>
              <el-form-item label="商品价格 ： " label-width="100px" style="margin-left: 50%;transform: translate(-50%)"
                            prop="goods_price">
                <el-input v-model="addGoodsForm.goods_price" style="width: 80%"/>
              </el-form-item>
              <el-form-item label="商品数量 ： " label-width="100px" style="margin-left: 50%;transform: translate(-50%)"
                            prop="goods_number">
                <el-input v-model="addGoodsForm.goods_number" style="width: 80%"/>
              </el-form-item>
              <el-form-item label="商品重量 ： " label-width="100px" style="margin-left: 50%;transform: translate(-50%)"
                            prop="goods_weight">
                <el-input v-model="addGoodsForm.goods_weight" style="width: 80%"/>
              </el-form-item>
              <el-form-item label="分 类 ： " label-width="100px" style="margin-left: 50%;transform: translate(-50%)"
                            prop="goods_cat">
                <el-cascader v-model="addGoodsForm.goods_cat" :options="options" :props="props"
                             style="width: 80%"></el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1" @click="getcategories">
              <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox v-for="(cb, i) in item.attr_vals" :label="cb" :key="i" border/>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <el-form-item :label="item.attr_name" v-for="item in manyTableData1" :key="item.attr_id">
                <el-input v-model="item.attr_vals" style="width: 60%;margin-left: 50%;transform: translate(-50%)"/>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <el-form-item>
                <el-upload
                  class="upload-demo"
                  action="http://127.0.0.1:8888/api/private/v1/upload"
                  :headers="headerObj"
                  :on-preview="handlePreview"
                  :on-success="upSuccess"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <quill-editor class="editor"
                            ref="myTextEditor"
                            v-model="addGoodsForm.goods_introduce"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)"
                            @change="onEditorChange($event)">
              </quill-editor>
              <el-button type="danger" @click="addGoodsInfo">点击添加商品</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-card>
      <el-card v-else>
        <!--        添加商品按钮-->
        <el-button type="primary" style="margin:0 0 10px 10px" @click="addGoods=true">添加商品</el-button>
        <!--        表格开始-->
        <el-table
          :data="goodsList"
          style="width: 100%;margin-bottom: 20px"
          size="mini"
          border
          highlight-current-row
          :stripe="true"
          :fit="true"
          >
<!--          表格元素-->
          <el-table-column  label="#" type="index" align="center"/>
          <el-table-column prop="goods_name" label="商品名称" align="center" min-width="85%"/>
          <el-table-column prop="goods_price" label="商品价格（元）" align="center" min-width="7%"/>
          <el-table-column prop="goods_number" label="商品数量" align="center" min-width="7%"/>
          <el-table-column prop="goods_weight" label="商品重量" align="center" min-width="7%"/>
          <el-table-column prop="add_time" label="创建时间" align="center" min-width="10%"/>
          <el-table-column prop="address" label="操作" align="center" min-width="15%">
            <template slot-scope="scop">
<!--              操作按钮-->
              <el-button icon="el-icon-edit-outline" type="primary" @click="edit(scop.row)" size="mini" round/>
              <el-button icon="el-icon-delete" type="warning" @click="edit(scop.row)" size="mini"/>
            </template>
          </el-table-column>
        </el-table>
        <!--        分页栏-->
        <el-pagination
          background
          layout="prev,pager,next,total,jumper"
          :total="page.total"
          :current-page="page.pagenum"
          @current-change="currentChange"/>
      </el-card>
      <!--      编辑按钮弹出旷-->
      <el-dialog :visible.sync="editDialog" title="编辑商品信息" width="30%">
        <el-form label-position="left" label-width="80px" :model="formLabelAlign">
          <el-form-item label="商品名称: " label-width="100px">
            <el-input v-model="goodsRow.goods_name"/>
          </el-form-item>
          <el-form-item label="价格（元） : " label-width="100px">
            <el-input v-model="goodsRow.goods_price"/>
          </el-form-item>
          <el-form-item label="数量(个) : " label-width="100px">
            <el-input v-model="goodsRow.goods_number"/>
          </el-form-item>
          <el-form-item label="数量 : " label-width="100px">
            <el-input v-model="goodsRow.goods_weight"/>
          </el-form-item>
          <el-form-item label="介绍 : " label-width="100px">
            <el-input v-model="goodsRow.goods_introduce"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="editConfirm" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="photo">
        <h1 style="margin: 0 30% 10% 0">图片预览</h1>
        <el-image :src="photoSrc" style="width: 20vw;margin-left: 50%;transform: translate(-50%)"/>
      </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      photoSrc: '',
      photo: false,
      rules: {
        goods_name: [{
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        }],
        goods_price: [{
          required: true,
          message: '请输入商品价格',
          trigger: 'blur'
        }],
        goods_number: [{
          required: true,
          message: '请输入商品数量',
          trigger: 'blur'
        }],
        goods_weight: [{
          required: true,
          message: '请输入商品重量',
          trigger: 'blur'
        }],
        goods_cat: [{
          required: true,
          message: '请选择商品分类',
          trigger: 'blur'
        }]
      },
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      options: [],
      addGoodsForm: {
        attrs: []
      },
      active: 0,
      goodsRow: [], // 要修改的内容，编辑框
      editDialog: false, // 编辑框弹出窗口
      addGoods: true, // 显示添加商品标识
      goodsList: [], // 商品列表
      page: { // 页面商品页码及显示数量
        pagenum: 1, // 当前页面
        pagesize: 15 // 当前页面多少个内容
      },
      props: {
        expandTrigger: 'hover',
        children: 'children',
        label: 'cat_name',
        value: 'cat_id'
      },
      manyTableData: [],
      manyTableData1: []
    }
  },
  methods: {
    // 获取商品列表方法
    leave (activeName, oldactiveName) {
      activeName = Number(activeName)
      oldactiveName = Number(oldactiveName)
      if (activeName > (oldactiveName + 1)) {
        this.$message.info('不要跨越步骤')
        return false
      }
    },
    async getgoodsList () {
      const { data: res } = await this.$http.get('goods', {
        params: this.page
      })
      if (res.meta.status === 200) {
        this.page.total = res.data.total
        this.goodsList = res.data.goods
      }
    },
    currentChange (e) { // 改变当前页码函数
      this.page.pagenum = e // 改变的页码
      this.getgoodsList()
    },
    // 操作栏之编辑按钮
    edit (e) {
      this.editDialog = true // 显示编辑dialog
      this.goodsRow.goods_id = e.goods_id
      this.goodsRow.goods_name = e.goods_name
      this.goodsRow.goods_price = e.goods_price
      this.goodsRow.goods_number = e.goods_number
      this.goodsRow.goods_weight = e.goods_weight
    },
    // 编辑提交确认按钮
    async editConfirm () {
      await this.$http.post(`goods/${this.goodsRow.goods_id}`, this.goodsRow)
    },
    async getOption () {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: 3
        }
      })
      this.options = res.data
    },
    click (e) {
      if (e.index === '1') {
        this.getcategories('many')
      }
      if (e.index === '2') {
        this.getcategories1('only')
      }
    },
    async getcategories (e) {
      const { data: res } = await this.$http.get(`categories/${this.addGoodsForm.goods_cat[2]}/attributes`, {
        params: {
          sel: e
        }
      })
      res.data.forEach(item => {
        item.attr_vals =
          item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
      })
      this.manyTableData = res.data
    },
    async getcategories1 (e) {
      const { data: res } = await this.$http.get(`categories/${this.addGoodsForm.goods_cat[2]}/attributes`, {
        params: {
          sel: e
        }
      })
      this.manyTableData1 = res.data
    },
    handlePreview (file) {
      this.photo = true
      this.photoSrc = file.response.data.url
    },
    addGoodsInfo () {
      this.addGoodsForm.goods_cat = this.addGoodsForm.goods_cat.join(',')
      this.manyTableData.forEach(item => {
        const obj = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(',')
        }
        this.addGoodsForm.attrs.push(obj)
      })
      this.$http.post('goods', this.addGoodsForm)
      console.log(this.addGoodsForm)
    },
    upSuccess (response) {
      this.addGoodsForm.pics = response.data.tmp_path
    }
  },
  mounted () {
    this.getgoodsList() // 获取商品信息
    this.getOption()
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  }
}
</script>
<style>
  .el-checkbox {
    margin: 20px 10px 0 0 !important;
  }

  .el-form-item__label {
    font-size: 10px !important;
    width: 150px !important;
  }

  .ql-container {
    height: 300px !important;
  }

  .editor {
    line-height: normal !important;
    height: 400px;
  }
</style>
