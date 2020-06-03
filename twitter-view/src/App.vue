<template>
  <div id="app">
    <TwitterNews/>
  </div>
</template>

<script>
import TwitterNews from './components/TwitterNews.vue'

export default {
  name: 'App',
  components: {
    TwitterNews
  }
}

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
