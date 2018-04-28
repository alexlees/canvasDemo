<template>
  <header :class="$style.header">
    <span>
      <i class="mintui mintui-back"></i>
    </span>
    <div :class="$style.tabs">
      <span :class="{[$style.tab_item]: true, [$style.active]: value === 0}" @click="change(0)">
        <i :class="[$style.icon,$style['icon-arrow']]"></i>
      </span>
      <span :class="{[$style.tab_item]: true, [$style.active]: value === 1}" @click="change(1)">
        <i :class="[$style.icon,$style['icon-angle']]"></i>
      </span>
      <span :class="{[$style.tab_item]: true, [$style.active]: value === 2}" @click="change(2)">
        <i :class="[$style.icon,$style['icon-brightness']]"></i>
      </span>
      <span :class="{[$style.tab_item]: true, [$style.active]: value === 3}" @click="change(3)">
        <i :class="[$style.icon,$style['icon-contrast']]"></i>
      </span>
      <span :class="{[$style.tab_item]: true, [$style.active]: value === 4}" @click="change(4)">
        <i :class="[$style.icon,$style['icon-font']]"></i>
      </span>
    </div>
  </header>
</template>

<script>
import { Header, Button } from 'mint-ui'
export default {
  components: {
    [Header.name]: Header,
    [Button.name]: Button
  },
  name: 'x-header',
  props: {
    canChange: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: 0
    }
  },
  methods: {
    change (Value) {
      if (this.canChange) {
        this.value = Value
        this.$emit('changvalue', Value)
      }
    }
  }
}
</script>

<style module>
@import url(./assets/iconfont.css);
.header{
  background: #ffffff;
  color: #000000;
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
  clear: both;
}
.tabs{
  position: absolute;
  right: 0;
  height: 100%;
  margin: 0 10px 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.tab_item{
  width: 30px;
  height: 30px;
  font-size: 20px;
  margin: 0 0 0 10px;
  flex: 1;
  line-height: 30px;
  color: #ccc;
  cursor: pointer;
}
.active{
  color: #000;
  border: 1px solid #000;
  border-radius: 100%;
}
</style>
