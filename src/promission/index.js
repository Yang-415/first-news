import router from '../router'
router.beforeEach(function (to, from, next) {
  // if1如果以home开头的路径里面有if2如果有令牌那么就通过，if2否则就用next强行跳转到login页面，if1否则就通过
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('infoToken')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else { next() }
})
