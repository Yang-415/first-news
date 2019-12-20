<template>
  <!-- //一、页面布局，页面首先分为两部分，第一部分为左侧导航栏和中间的内容部分 -->
  <el-container>
    <!-- 侧边导航栏 -->
    <el-aside  class="aside-nav" style="width:230px">
      <homePageAside style="width:231px"></homePageAside>
    </el-aside>
    <el-main style="padding:0">
      <!-- 内容区头部 -->
      <el-header>
        <homePageHeader></homePageHeader>
      </el-header>
      <!-- 内容区容器 -->
      <el-main>容器区</el-main>
    </el-main>
  </el-container>
</template>
<script>
// import HomePageAaside from '../../components/home/homePageAside.vue'
// import HomePageHeader from '../../components/home/homePageHeader.vue'
export default {
  // components: {
  //   'homePageAside': HomePageAaside,
  //   'homePageHeader': HomePageHeader
  // }
}
</script>

<style lang="less" scoped>
.aside-nav {
  height: 100vh;
  background: #323745;
}

</style>
