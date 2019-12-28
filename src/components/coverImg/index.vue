<template>
  <div class="cover">
    <div v-for="(item,index) in list" :key="index" class="cover_type">
      <img src="../../assets/img/pic_bg.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  props: ['list']
}
</script>

<style lang="less" scoped>
.cover {
  display: flex;
  .cover_type {
    height: 250px;
    width: 250px;
    border: 1px solid #ccc;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
