<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li class="active"> x </li>
        <li> x </li>
        <li> x </li>
        <li> x </li>
        <li> x </li>
        <li> x </li>
        <li> x </li>
      </ol>
    </nav>
    <ol class="panels">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'ResumeEditor',
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss">
  #resumeEditor{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    > nav{
      width: 80px;
      background: black;
      color: white;
      > ol {
        > li{
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          &.active{
            background: white;
            color: black;
          }
        }
      }
    }
  }
  ol{
    list-style: none;
  }
</style>