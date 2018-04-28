<template>
  <div :class="$style.app">
    <x-header @changvalue="changeValue" :canChange="load"></x-header>
    <x-canvas :value="value" @loadImage="loadImage"></x-canvas>
  </div>
</template>

<script>
import xCanvas from './canvas'
import Header from './header'
export default {
  components: {
    xCanvas,
    [Header.name]: Header
  },
  name: 'app',
  data () {
    return {
      value: 0,
      load: false
    }
  },
  methods: {
    changeValue (value) {
      console.log(value)
      this.value = value
    },
    loadImage (value) {
      this.load = value
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
*{
  box-sizing: border-box;
}
</style>
