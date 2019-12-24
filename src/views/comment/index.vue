<template>
  <el-card>
    <breadcumb slot="header">
      <template slot="title">评论列表</template>
    </breadcumb>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="500·"></el-table-column>
      <!-- 格式化方法 -->
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOrClose(obj.row)"
          >{{obj.row.comment_status?"关闭评论":"打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination background layout="prev,pager,next"
      :total=" page.pageTotal"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @current-change="pageChange"
      >
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  methods: {
    pageChange (newPage) {
      this.page.currentPage = newPage
      this.getData()
    },
    getData () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.pageTotal = result.data.total_count
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你确定要${mess}评论`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          this.$message({ type: 'success', message: '操作成功' })
          this.getData()
        })
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>
</style>
