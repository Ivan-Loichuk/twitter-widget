<template>
  <div id="app">
    <TwitterWidget/>
    <notifications group="errors" />
  </div>
</template>

<script>
import TwitterWidget from './components/TwitterWidget/TwitterWidget'

export default {
  name: 'App',
  components: {
    TwitterWidget
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
