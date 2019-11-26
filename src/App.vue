<template>
  <div id="app" class="app-wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">
  @import './styles/variables';

  .app-wrapper {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: linear-gradient(0, $bambee-dark-purple, $bambee-purple);
  }
  
</style>

<script>
  export default {
    name: 'app',
  }
</script>