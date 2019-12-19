<template>
  <div class="login-bag">
    <el-card class="login-card">
      <img src="../../assets/img/logo_index.png" alt />
      <el-form :model="loginForm" :rules="loginRules" ref="myform">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" style="margin-top:20px" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" style="width:70%" v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checkboxed">
          <el-checkbox style="float:left" v-model="loginForm.checkboxed">
            我已阅读并同意
            <span class="login-word">协议条款</span>和
            <span class="login-word">隐私协议</span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="loginSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checkboxed: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        checkboxed: {
          validator (rules, value, callback) {
            if (value) {
              callback()
            } else {
              callback(new Error('您必须阅读并同意协议'))
            }
          }
        }
      }
    }
  },
  methods: {
    loginSubmit () {
      this.$refs.myform.validate((isOk) => {
        if (isOk) {
          this.$axios.post('/authorizations', this.loginForm).then(result => {
            window.localStorage.setItem('token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '验证码不正确',
              type: 'warnning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-bag {
  height: 100vh;
  background: url(../../assets/img/login_bg.jpg);
  background-size:                                                                                                                                                                                                                                                                  100%;
  box-sizing: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    height: 350px;
    width: 440px;
    text-align: center;
    img {
      height: 45px;
    }
    .login-word {
      color: rgb(95, 165, 223);
    }
  }
}
</style>
