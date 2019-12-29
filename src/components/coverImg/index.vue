<template>
  <div class="cover-img">
    <div class="picture" v-for="(item,index) in list" :key="index">
        <img src="../../assets/img/pic_bg.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="less" scoped>
.cover-img {
    display: flex;
  .picture {
    height: 250px;
    width: 250px;
    border: 1px solid #ccc;
  }
}
</style>
