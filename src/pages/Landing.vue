<template>
  <div>
    <router-view v-bind:class="[!$root.$data.isL ? 'shape2' : 'moveL']"  name="left"/>
    <router-view v-bind:class="[!$root.$data.isR ? 'shape1' : 'moveR']"  name="right"/>
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
