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
  font-family: Helvetica Neue,Tahoma,Arial,PingFangSC-Regular,Hiragino Sans GB,Microsoft Yahei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c3c3c;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;

}
</style>
<style>
*{
  box-sizing: border-box;
}
</style>
