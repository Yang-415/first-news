<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material" class="material">
      <el-card v-for="item in list" :key="item.id" class="materialImg">
        <img :src="item.url" alt @click="selectImg(item.url)" />
      </el-card>
      <el-pagination
      background
      layout="prev, pager, next"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      @current-change="changePage"
    ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload-img">
      <el-upload action class="upload" :http-request="uploadImg">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: 'user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
      })
    },
    // 点击照片传递参数
    selectImg (img) {
      this.$emit('selectOneImg', img)
    },
    //   切换当前页
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
    },
    // 获取素材
    getMaterial () {
      this.$axios({
        url: 'user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        // console.log(result)
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.material {
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  .materialImg {
    height: 120px;
    width: 120px;
    margin: 5px 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
 .upload {
   display: flex;
   justify-content: center;
    i {
       font-size: 80px;
       margin: 20px 0;
       padding: 20px;;
       border: 1px dashed #ccc;
       border-radius: 4px;
    }

  }
</style>
