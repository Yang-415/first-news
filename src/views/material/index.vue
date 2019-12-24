<template>
  <el-card>
    <breadcumb slot="header">
      <template slot="title">素材管理</template>
    </breadcumb>
    <el-row type="flex" justify="end">
      <el-upload :http-request="uploadImg" :show-file-list="false" action>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeClick" @tab-click="clickCollect">
      <el-tab-pane label="全部素材" name="all">
        <div class="materialImg">
          <el-card class="materialCard" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" align="middle" class="cardIco">
                <!-- 收藏图片 -->
              <i class="el-icon-star-on" :style= '{color:item.is_collected ? "red" : "" }' @click="collectClick(item)"></i>
              <i class="el-icon-delete-solid" @click="delMaterial(item.id)"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="pageChange"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="materialImg">
          <el-card class="materialCard" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="pageChange"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      activeClick: 'all',
      list: [],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 8
      }
    }
  },
  methods: {
    //   点击图标删除事件;
    delMaterial (id) {
      this.$axios({
        url: `user/images/${id}`,
        method: 'delete'
      }).then((result) => {
        this.material()
      })
    },
    //  点击图标收藏事件,因为要用item里的is_collect属性,所以需要将整个item都传过来
    collectClick (item) {
      this.$axios({ url: `user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected, id: item.id } }).then(result => {
        this.material()
      })
    },
    //   上传图片
    uploadImg (params) {
    //   console.log(params)

      let fd = new FormData()
      fd.append('image', params.file)
      this.$axios({
        url: 'user/images',
        method: 'post',
        data: fd
      }).then(() => {
        this.material()
      })
    },
    //   分页点击事件发请求重新调用数据加载的方法
    pageChange (newPage) {
      this.page.currentPage = newPage
      this.material()
    },
    // 点击到收藏页时重新发请求调用方法，但必须强制当前页变成第一页
    clickCollect () {
      this.page.currentPage = 1
      this.material()
    },

    material () {
      this.$axios({
        url: '/user/images',
        params: {
          // 当collect 的值是false的时候调用all的数据,当collect的数据为true的时候调用collect里的 数据
          collect: this.activeClick === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        console.log(result)
        this.page.total = result.data.total_count
        this.list = result.data.results
      })
    }
  },
  //   利用钩子函数当页面实例创建之后调用拿素材的方法
  created () {
    this.material()
  }
}
</script>

<style lang="less" scoped>
.materialImg {
  width: 100%;
  overflow: hidden;
  .materialCard {
    height: 200px;
    width: 150px;
    float: left;
    margin: 20px 40px;
    position: relative;
    img {
      height: 100%;
      width: 100%;
    }
    .cardIco {
      position: absolute;
      bottom: 0;
      height: 40px;
      font-size: 20px;
      width: 100%;
      left: 0;
      background-color: #f4f5f6;
      i {
          cursor:pointer;
      }
    }
  }
}
</style>
