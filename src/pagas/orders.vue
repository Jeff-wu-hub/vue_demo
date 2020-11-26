<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-input style="width: 30%;margin:0 20px 20px 0" placeholder="请输入查询内容" size="small" v-model="page.query"/>
      <el-button type="primary" size="small" @click="getOrder">查询</el-button>
      <el-table border stripe size="small" highlight-current-row :data="FormOrder" style="margin-bottom: 20px">
        <el-table-column type="index" align="center"/>
        <el-table-column label="订单编号" align="center" prop="order_number"/>
        <el-table-column label="订单价格" align="center" prop="order_price"/>
        <el-table-column label="是否付款" align="center" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === 1">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" align="center" prop="is_send">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.is_send === '是'">已发货</el-tag>
            <el-tag type="danger" v-else>未发货</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" align="center" prop="create_time"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scops">
            <el-button icon="el-icon-edit" size="small" type="primary" title="修改订单地址"
                       @click="showDialog = !showDialog"/>
            <el-button @click="deleteInfo(scops.row)" icon="el-icon-position" size="small" type="warning"/>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="page.pagenum"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="page.pagesize"
                     layout="total, prev, pager, next,sizes"
                     :total="total">
      </el-pagination>
    </el-card>
    <el-dialog width="30%" :visible="showDialog" title="修改地址">
      <el-form :rules="rules" ref="selectform">
        <el-form-item label="省市区/县 ： " label-width="150px" prop="address1">
          <el-cascader v-model="value" :options="address.address1" :props="cascade" @change="caChange"
                       style="width: 60%"/>
        </el-form-item>
        <el-form-item label="详细地址 ： " label-width="150px" prop="address2">
          <el-cascader v-model="value" :options="options" :props="cascade" @change="caChange" style="width: 60%"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        rules: {
          address1: [{
            required: true,
            message: '请选择省市区/县',
            trigger: 'blur'
          }],
          address2: [{
            required: true,
            message: '请填写详细地址',
            trigger: 'blur'
          }]
        },
        address: {
          address1: [],
          address2: ''
        },
        showDialog: true,
        cascade: {},
        value: '',
        total: '',
        FormOrder: [], // 表单信息
        page: {
          pagenum: 1,
          pagesize: 5,
          query: ''
        }
      }
    },
    methods: {
      async getOrder () {
        const { data: res } = await this.$http.get('orders', {
          params: this.page
        })
        this.FormOrder = res.data.goods
        this.total = res.data.total
      },
      handleCurrentChange () {
        this.getOrder()
      },
      handleSizeChange (e) {
        this.page.pagesize = e
        this.getOrder()
      },
      confirmEdit () {
      },
      caChange () {
      }
    },
    mounted () {
      this.getOrder()
    }
  }
</script>
<style></style>
