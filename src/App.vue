<template>
  <div :class="$style.app">
    <x-canvas></x-canvas>
  </div>
</template>

<script>
import xCanvas from './canvas'

export default {
  components: {
    xCanvas
  },
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style module>
.app{
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}
</style>
<style>
/* *{
  box-sizing: border-box;
} */
</style>
