<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="row">
        <label>用户名</label> 
        <input type="text" v-model="formData.username">
      </div>
      <div class="row">
        <label >密码</label>
        <input type="password" v-model="formData.password">
      </div>
      <div class="actions">
        <input type="submit" value="提交">
      </div>
    </form>
  </div>
</template>

<script>

import AV from '../lib/leancloud'

export default {
  name:'SignUpForm',
  data(){
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  created(){
  },
  methods:{
    signUp(){
      let {username, password} = this.formData
      var user = new AV.User();
      user.setUsername(username);
      user.setPassword(password);
      user.signUp().then((loginedUser) =>{
        this.$emit('success', {
          username: loginedUser.attributes.username, 
          id: loginedUser.id
        })
      }, (error)=> {
        alert(JSON.stringify(error));
      });
    }
  }
}
</script>
