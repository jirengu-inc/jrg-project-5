<template>
  <div>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function(){
    return {
      text: '你好'
    }
  }
}
</script>

<style>
  p{color: red;}
</style>
