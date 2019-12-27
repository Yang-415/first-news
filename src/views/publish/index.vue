<template>
  <el-card>
    <breadcumb slot="header">
      <span slot="title">发布文章</span>
    </breadcumb>
    <el-form label-width="100px" :model="formdata" :rules=rules>
      <el-form-item label="标题" style="width: 60%" prop="title">
        <el-input v-model="formdata.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" :rows="6" style="width: 60%" v-model="formdata.content"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="type">
        <el-radio-group  v-model="formdata.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id" >
        <el-select v-model="formdata.channel_id" clearable placeholder="请选择" >
          <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="danger" plain>草稿</el-button>
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
          type: 0
        },
        channel_id: ''
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题' }, { min: 5, max: 30, message: '文章标题字数5-30之内' }],
        content: [{ required: true, message: '请输入文章内容' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }
    }
  },
  methods: {
    // 获取频道数据
    getChannelsData () {
      this.$axios({ url: 'channels' }).then(result => {
        this.list = result.data.channels
      })
    }
  },
  created () {
    this.getChannelsData()
  }
}
</script>

<style>
</style>
