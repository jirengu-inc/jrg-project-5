<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>

      <div class="actions">
        <span>{{user}}</span>
        <a class="button primary" href="#" @click.prevent="signUpDialogVisible = true">注册</a>
        <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
          <SignUpForm @success="login($event)"/>
        </MyDialog>
        <a class="button" href="#">登录</a>
        <button class="button primary">保存</button>
        <button class="button">预览</button>
      </div>
    </div>
  </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
export default {
  name: 'Topbar',
  data(){
    return {
      signUpDialogVisible: false
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    }
  },
  components: {
    MyDialog, SignUpForm
  },
  methods: {
    login(user){
      this.signUpDialogVisible = false
      this.$store.commit('setUser', user)
    }
  }
}
</script>

<style scoped lang="scss">
  // 自行查阅 scoped 的功能
  // 见：https://cn.vuejs.org/v2/guide/comparison.html#CSS-的组件作用域
  #topbar{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    >.wrapper{
      min-width: 1024px;
      max-width: 1440px;
      margin: 0 auto;
      height:64px;
    }
    >.wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .logo{
      font-size:24px;
      color:#000000;
    }
  }

  .button{ // 由于加了 scoped， 所以这个 button 选择器只在本组件内有效，不会影响其他组件
    width:72px;
    height:32px;
    border: none;
    cursor: pointer;
    font-size: 18px; // 设计稿上是 20px，看起来太大，就改成 18px 了
    background:#ddd;
    color: #222;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    &:hover{
      box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
    }
    &.primary{
      background:#02af5f;
      color: white;
    }

  }
  .actions > a{
  }
</style>
