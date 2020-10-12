<template>
  <div id="app">
    <Landing/>
    <Registrations/>
    <router-view/>
  </div>
</template>

<script>
import Landing from './pages/Landing.vue'
import Registrations from './pages/Registrations.vue'

export default {
  name: 'app',
  components: {
    Landing,
    Registrations
  }
}
</script>

<style lang="scss">
html,body { 
  height:100vh; 
    #app {
      height:100vh;
    }
}

</style>
