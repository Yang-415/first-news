<template>
  <el-card>
    <breadcumb slot="header">
      <span slot="title">发布文章</span>
    </breadcumb>
    <el-form label-width="100px" :model="formdata" :rules="rules" ref="publicForm">
      <!-- 内容部分 -->
      <el-form-item label="标题" style="width: 60%" prop="title">
        <el-input v-model="formdata.title"></el-input>
      </el-form-item>
      <!-- 内容部分 -->
      <el-form-item label="内容" prop="content">
        <quill-editor type="textarea" :rows="6" style="height:300px" v-model="formdata.content"></quill-editor>
      </el-form-item>
      <!-- 封面部分 -->
      <el-form-item label="封面" prop="type" style="margin-top:120px">
        <el-radio-group v-model="formdata.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道部分 -->
      <el-form-item label="频道" prop="channel_id" style="margin-top:30px">
        <el-select v-model="formdata.channel_id" clearable placeholder="请选择">
          <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publicArticle(!draft)">发布</el-button>
        <el-button type="danger" plain @click="publicArticle(draft)">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      draft: true,
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
    // 监听如果路由发生变化，并且params的长度不为0，说明是在修改页面,需要重新拉取指定文章的数据,否则发布文章的页面数据为空
    $route: function (to) {
      if (Object.keys(to.params).length) {
        // 需要重新拉取指定文章的数据
        this.getArt()
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
    }
  },
  methods: {
    // 获取修改文章数据
    getArt (artId) {
      this.$axios({ url: `articles/${artId}` }).then(result => {
        this.formdata = result.data
      })
    },
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
    // 发布文章或修改文章
    pubOrDraft (draft) {
      let { artId } = this.$route.artId
      // 方法二：精简方法
      this.$axios({
        url: artId ? `article/${artId}` : 'article',
        method: artId ? 'put' : 'post',
        params: { draft },
        data: this.formdata
      }).then(() => {
        this.$router.push('/home/articles')
      })
      // 方法一，较冗长的方法
      // if (artId) {
      //   this.$axios({
      //     url: `article/${artId}`,
      //     method: 'put',
      //     params: { draft },
      //     data: this.formdata
      //   }).then(() => {
      //     this.$router.push('/home/articles')
      //   })
      // } else {
      //   this.$axios({
      //     url: '/articles',
      //     method: 'post',
      //     params: {
      //       draft
      //     },
      //     data: this.formdata
      //   }).then(() => {
      //     // 跳转到内容列表页面
      //     this.$router.push('/home/articles')
      //   })
      // }
    }
  },
  created () {
    this.getChannelsData()
    let { artId } = this.$route.params
    artId && this.getArt(artId)
  }
}
</script>

<style>
</style>
