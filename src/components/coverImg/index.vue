<template>
  <div class="cover-img">
    <div class="picture" v-for="(item,index) in list" :key="index" @click="dialogImg(index)">
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog :visible="dialogBoolean" @close="changeDialog">
        <img-material @selectOneImg="reciveImg"></img-material>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogBoolean: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      index: -1
    }
  },
  methods: {
    reciveImg (img) {
      this.$emit('clickOneImg', img, this.index)
      this.changeDialog()
      // alert('接收到的图片地址:' + img + this.index)
    },
    // 点击图片出现素材的弹层
    dialogImg (index) {
      this.dialogBoolean = true
      this.index = index
    },
    changeDialog () {
      this.dialogBoolean = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-img {
    display: flex;
  .picture {
    height: 250px;
    width: 250px;
    border: 1px solid #ccc;
    img {
        width: 100%;
        height: 100%;
    }
  }
}
</style>
