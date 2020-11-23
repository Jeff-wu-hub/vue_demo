<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        111111
<!--        占位预留-->
        <el-table :data="FormOrder.data" style="width: 100%" size="small" border="true" stripe="true" highlight-current-row="true">
          <el-table-column prop="order_number" label="订单号" align="center"/>
          <el-table-column prop="order_pay" label="支付" align="center"/>
          <el-table-column prop="is_send" label="是否发货" align="center"/>
          <el-table-column prop="trade_no" label="XX" align="center"/>
          <el-table-column prop="order_fapiao_title" label="订单类型" align="center"/>
          <el-table-column prop="order_fapiao_company" label="订单公司" align="center"/>
          <el-table-column prop="order_fapiao_content" label="商品类型" align="center"/>
          <el-table-column prop="pay_status" label="支付" align="center"/>
          <el-table-column prop="create_time" label="创建日期" align="center"/>
          <el-table-column prop="update_time" label="修改日期" align="center"/>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="FormOrder.total"></el-pagination>
      </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      pageInfo: {
        pagenum: 1, // 当前页码
        pagesize: 15 // 每一页显示的数量
      },
      FormOrder: [] // 订单列表
    }
  },
  methods: {
    async getFormData () {
      const { data: res } = await this.$http.get('orders', {
        params: this.pageInfo
      })
      this.FormOrder = res.data
    }
  },
  mounted () {
    this.getFormData()
  }
}
</script>
<style></style>
