<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import './assets/reset.css'

  import icons from './assets/icons'

  import AV from './lib/leancloud'
  import getAVUser from './lib/getAVUser'

  document.body.insertAdjacentHTML('afterbegin', icons)

  export default {
    name: 'app',
    created() {
      this.$store.commit('initState') // 初始化 resume 结构
      let user = getAVUser()
      this.$store.commit('setUser', user)
      if(user.id){
        this.$store.dispatch('fetchResume').then(()=> { 
          this.restoreResumeFromLocalStorage()
        })
      }else{
        this.restoreResumeFromLocalStorage()
      }
    },
    methods:{
      restoreResumeFromLocalStorage(){
        let resume = localStorage.getItem('resume')
        if(resume){
          this.$store.commit('setResume', JSON.parse(resume))
        }
      }
    }
  }
</script>

<style lang="scss">
  .page{
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #EAEBEC;
    >main{
      flex-grow: 1;  
    }
    >main{
      min-width: 1024px;
      max-width: 1440px;
      margin-top: 16px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%; /* 试试不加这句会怎样 */
      align-self: center;
    }
  }


  #resumeEditor{
    min-width: 35%;
    background: #444;
  }
  #resumePreview{
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
  }
  svg.icon{
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size:16px;
  }
  .button{ 
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
    &.small {
      height: 24px;
      font-size: inherit;
      width: auto;
      padding-left: 1em;
      padding-right: 1em;
    }

  }
</style>
