<template>
  <el-card>
    <breadcumb slot="header">
      <span slot="title">发布文章</span>
    </breadcumb>
    <el-form label-width="100px" :model="formdata" :rules="rules" ref="publicForm">
      <el-form-item label="标题" style="width: 60%" prop="title">
        <el-input v-model="formdata.title"></el-input>
      </el-form-item>
      <!-- 内容部分 -->
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:400px" v-model="formdata.content"></quill-editor>
      </el-form-item>
      <!-- 封面部分 -->
      <el-form-item label="封面" prop="type" style="margin-top:130px">
        <el-radio-group v-model="formdata.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <cover-img :list="formdata.cover.images"></cover-img>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formdata.channel_id" clearable placeholder="请选择">
          <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publicArticle(false)">发布</el-button>
        <el-button type="danger" plain @click="publicArticle(true)">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      list: [],
      formdata: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题' },
          { min: 5, max: 30, message: '文章标题字数5-30之内' }
        ],
        content: [{ required: true, message: '请输入文章内容' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }
    }
  },
  watch: {
    // 解决两个路由公用一个组件跳转的时候，路由没有销毁
    $route: function (to) {
      console.log(to)
      if (Object.keys(to.params).length) {
        console.log(to)

        this.pubOrDraft(to.params)
      } else {
        this.formdata = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    },
    'formdata.cover.type': function () {
      if (this.formdata.cover.type === 0 || this.formdata.cover.type === -1) {
        this.formdata.cover.images = []
      } else if (this.formdata.cover.type === 1) {
        this.formdata.cover.images = ['']
      } else if (this.formdata.cover.type === 3) {
        this.formdata.cover.images = ['', '', '']
      }
    }
  },
  methods: {
    //   发布校验
    publicArticle (draft) {
      this.$refs.publicForm.validate(isOk => {
        if (isOk) {
          this.pubOrDraft(draft)
        }
      })
    },
    // 获取频道数据
    getChannelsData () {
      this.$axios({ url: 'channels' }).then(result => {
        this.list = result.data.channels
      })
    },
    // 发布和修改
    pubOrDraft (draft) {
      let { articleId } = this.$route.params
      // console.log(articleId)
      this.$axios({
        url: articleId ? `/articles/${articleId}` : '/articles',
        method: articleId ? 'put' : 'post',
        params: { draft },
        data: this.formdata
      }).then(() => {
        this.$router.push('/home/articles')
      })
      // 方法一：
      // if (articleId) {
      //   this.$axios({ url: `/articles/${articleId}`, method: 'put', params: { draft }, data: this.formdata }).then(() => {
      //     (this.$router.push('/home/articles'))
      //   })
      // } else {
      //   console.log(1111111)
      //   this.$axios({
      //     url: '/articles',
      //     method: 'post',
      //     params: {
      //       draft
      //     },
      //     data: this.formdata
      //   }).then(() => {
      //   // 跳转到内容列表页面
      //     this.$router.push('/home/articles')
      //   })
      // }
    },
    // 根据id获取文章详情
    getArtById (articleId) {
      this.$axios({ url: `/articles/${articleId}` }).then(result => {
        this.formdata = result.data
      })
    }
  },

  created () {
    this.getChannelsData()
    let { articleId } = this.$route.params
    articleId && this.getArtById(articleId)
  }
}
</script>

<style>
</style>
