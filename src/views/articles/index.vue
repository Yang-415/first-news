<template>
  <el-card>
    <breadcumb slot="header">
      <span slot="title">内容列表</span>
    </breadcumb>
    <el-form>
      <!-- 文章状态 -->
      <span class="articleStatus">文章状态:</span>
      <template>
        <el-radio-group v-model="formData.status" @change="changCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </template>
      <!--文章的频道列表 -->
      <el-form-item style="margin:25px 15px" label="频道列表">
        <el-select placeholder="请选择" v-model="formData.channel_id" @change="changCondition">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间选择 -->
      <el-form-item style="margin:25px 15px">
        <span class="demonstration" style="display:inline-block;margin:0 8px 0 2px">时间选择</span>
        <el-date-picker
          @change="changCondition"
          v-model="formData.dateRange"
          value-format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>
    </el-form>
    <template>
      <!-- 内容部分 -->
      <p style="border-bottom:1px dashed #ccc;padding:20px 0">
        共找到{{ page.total }}条符合条件的内容</p>
      <!-- 内容模板 -->
      <el-row
        type="flex"
        justify="space-between"
        v-for="item in list"
        :key="item.id.toString()"
        class="conStyle"
      >
        <el-col :span="18" class="articleContent">
          <el-row type="flex">
            <img :src="item.cover.images.length ? item.cover.images[0]: defaultImg" alt />
            <div class="content">
              <span>{{item.title}}</span>
              <el-tag
                style="width:70px"
                :type="item.status|filterColor"
              >{{item.status | filterStatus}}</el-tag>
              <span class="article-date">{{item.pubdate}}</span>
            </div>
          </el-row>
          <!-- 内容模板结束 -->
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end" class="reviseOrDel">
            <span @click="modifyArt(item.id)">
              <i class="el-icon-edit"></i>修改
            </span>
            <!-- 删除文章事件 -->
            <span @click="deleteArticle(item.id)">
              <i class="el-icon-delete-solid"></i>
              删除
            </span>
          </el-row>
        </el-col>
      </el-row>
    </template>
    <el-row type="flex" justify="center">
      <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changPerArticle"></el-pagination>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channels: [],
      value1: '',
      list: [],
      defaultImg: require('../../assets/img/sz.jpg'),
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  filters: {
    //  筛选状态
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    // 筛选tab颜色
    filterColor (value) {
      switch (value) {
        case 0:
          return 'success'
        case 1:
          return 'info'
        case 2:
          return ' '
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 修改文章
    modifyArt (artId) {
      this.$router.push(`/home/publish/${artId.toString()}`)
      // this.$axios({
      //   url: `/articles/${artId}`,
      //   data:{},
      //   method: 'put'
      // }).then(result => {
      //   console.log(result)
      // })
    },
    // 删除文章事件
    deleteArticle (id) {
      this.$confirm('你确定要删除该文章吗？').then(() => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete' }).then((result) => {
          this.articleConditionParams()
        })
      })
    },
    // 文章分页事件
    changPerArticle (newPage) {
      this.page.currentPage = newPage
      this.articleConditionParams()
    },
    // 条件组合筛选
    changCondition () {
      this.page.currentPage = 1
      this.articleConditionParams()
    },
    articleConditionParams () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        beggin_pubdate: this.formData.dateRange.length
          ? this.formData.dateRange[0]
          : null,
        end_pubdate:
          this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null
      }
      this.getarticle(params)
    },
    //   获取文章列表
    getarticle (params) {
      this.$axios({ url: '/articles', params }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        console.log(this.page.total)
      })
    },
    //   获取文章频道
    getChannels () {
      this.$axios({
        url: 'channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getarticle()
    this.getChannels()
  }
}
</script>
<style lang="less" scoped>
.articleStatus {
  display: inline-block;
  margin: 0 20px;
}
.articleContent {
  img {
    height: 100px;
    width: 150px;
    border-radius: 5px;
  }
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  .article-date {
    font-size: 12px;
    color: #999;
  }
}
.reviseOrDel {
  span {
    cursor: pointer;
    font-size: 14px;
    margin: 0 10px;
  }
}
.conStyle {
  margin: 10px 20px;
  border-bottom: 1px solid rgba(211, 208, 208, 0.6);
  padding: 10px 0;
}
</style>
