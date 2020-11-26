<template>
    <div>
      <!--      面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--      添加商品选项-->
      <el-card v-if="addGoods">
        123
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
          :page-size="page.pagesize"
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
    </div>
</template>
<script>
export default {
  data () {
    return {
      goodsRow: [], // 要修改的内容，编辑框
      editDialog: false, // 编辑框弹出窗口
      addGoods: false, // 显示添加商品标识
      goodsList: [], // 商品列表
      page: { // 页面商品页码及显示数量
        pagenum: 1, // 当前页面
        pagesize: 15 // 当前页面多少个内容
      }
    }
  },
  methods: {
    // 获取商品列表方法
    async getgoodsList () {
      const { data: res } = await this.$http.get('goods', {
        params: this.page
      })
      if (res.meta.status === 200) {
        console.log(res.data.goods)
        this.page.total = res.data.total
        this.formatData(res.data.goods)
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
      console.log(this.goodsRow)
      const { data: res } = this.$http.post(`goods/${this.goodsRow.goods_id}`, this.goodsRow)
      console.log(res)
    },
    formatData (time) {
      time.forEach((e) => {
        e.add_time = new Date(e.add_time).toLocaleString()
      })
    }
  },
  mounted () {
    this.getgoodsList() // 获取商品信息
  },
  computed: {
  }
}
</script>
<style>
</style>
