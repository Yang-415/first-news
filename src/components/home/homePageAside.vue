<template>
  <div>
      <div class="aside-logo"><img src="../../assets/img/logo_admin.png" alt=""></div>
    <!--1.<el-menu>用来作为左侧导航容器 -->
    <el-menu background-color=" #353b4e" text-color="#adafb5" active-text-color=" #ffd04b" router>
      <el-menu-item>首页</el-menu-item>
      <!--2. 通过设置index属性确定点击的下拉列表对象 -->
      <el-submenu index="art-container">
        <span slot="title">内容管理</span>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容管理</el-menu-item>
        <el-menu-item index="/home/comment">评论管理</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <!--3. 通过<el-submenu>来设置下拉列表 -->
      <el-submenu index="fans-manage">
        <span slot="title" index="/home/fans">粉丝管理</span>
        <el-menu-item index="/home/fans-data">图文数据</el-menu-item>
        <el-menu-item index="/home/fans-picture">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fans-life">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fans-list">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </div>
  <!-- 4.激活样式 -->
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.aside-logo{
    background: #2e2f32;
    padding:10px 0;
    text-align: center;
    img {
        height: 35px
    }
}
</style>
