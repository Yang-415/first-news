<template>
  <el-row type="flex" align="middle" justify="space-between" class="title-header">
    <el-col :span="6">
      <i class="el-icon-s-fold">积极过好每一天</i>
    </el-col>
    <el-col :span="6" class="header-avatar">
      <span style="float:right">
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
        <el-dropdown @command="handle">
          <span>{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="lyout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // 用 data接resul中传回的结果
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/picture.jpg')
    }
  },
  methods: {
    handle (command) {
      if (command === 'lyout') {
        // 1.删除令牌
        window.localStorage.removeItem('infoToken')
        // 2.退出首页
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.$axios({
      url: '/user/profile'
    }).then(result => {
      // console.log(result.data)
      // result.data.name = '地主家的傻儿子'
      this.userInfo = result.data
      // this.userInfo = 432
    })
  }
}
</script>

<style lang="less" scoped>
.title-header {
  height: 68px;
}
.header-avatar {
  img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
