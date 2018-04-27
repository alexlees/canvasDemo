<template>
  <div :class="$style.waper">
    <mt-popup v-model="showPopup" position="right" :class="$style.popup">
      <mt-field label="文字" placeholder="请添加文字" type="textarea" rows="2" v-model="text"></mt-field>
      <mt-range
        v-model="fontSize"
        :min="10"
        :max="40"
        :step="1"
        value="20">
        <div slot="start" :class="[$style.icon_center]">字体大小</div>
      </mt-range>
      <mt-radio
        title="字体颜色"
        v-model="fontColor"
        :options="colorS">
      </mt-radio>
      <mt-button @click="closePopup" type="primary" size="large">确定</mt-button>
    </mt-popup>
    <div :class="$style.canvas_waper">
      <canvas ref="canvas" width="300px" height="300px" :class="$style.canvas"></canvas>
      <div :class="[$style.upload, $style['icon-upload'], $style.icon]" v-if="!load">
        <span :class="$style.upload_text">上传文件</span>
        <input type="file" name="image" id="" @change="fileData" accept="image/*"  :class="$style.file_input">
      </div>
    </div>
    <div v-if="!canText">
      <!-- <x-range :min="0.1" :max="2" :step="0.01" @change="change" :disabled="canDr" tag="缩放" key="1"></x-range> -->
      <mt-button @click="getText" :disabled="canDr" v-if="!canText" type="primary" size="large">下一步</mt-button>
    </div>
    <div v-if="canText" :class="$style.range_warper">
      <!-- <input type="text" @input="setText"/> -->
      <!-- <x-range @change="changeR" :min="-180" :max="180" :step="1" :initValue="0" tag="旋转" key="2"></x-range>
      <x-range @change="changeInvert" :min="0" :max="100" :step="1" :initValue="0" tag="反色" key="3"></x-range>
      <x-range @change="changeBrightness" :min="30" :max="100" :step="1" tag="亮度" :initValue="100" key="4"></x-range>
      <x-range  @change="changeContrast" :min="0" :max="100" :step="1" :initValue="100" tag="对比度" key="5"></x-range> -->
      <mt-range
        v-model="deg"
        :min="-180"
        :max="180"
        :step="1">
        <div slot="start"><i :class="[$style.icon, $style['icon-angle'], $style.icon_center]"></i></div>
      </mt-range>
      <mt-range
        v-model="brightness"
        :min="30"
        :max="200"
        :step="1"
        value="100">
        <div slot="start"><i :class="[$style.icon, $style['icon-brightness'], $style.icon_center]"></i></div>
      </mt-range>
      <mt-range
        v-model="contrast"
        :min="0"
        :max="200"
        :step="1"
        value="100">
        <div slot="start"><i :class="[$style.icon, $style['icon-contrast'], $style.icon_center]"></i></div>
      </mt-range>
      <div :class="$style.button_warper">
        <mt-button @click="addText" type="primary">添加文字</mt-button>
        <mt-button @click="fetchImage" type="primary">上传图片</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
import Hammer from 'hammerjs'
import { Button, Range, Popup, Field, Radio } from 'mint-ui'
export default {
  components: {
    [Button.name]: Button,
    [Range.name]: Range,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Radio.name]: Radio
  },
  name: 'x-canvas',
  data () {
    return {
      canvas: null,
      ctx: null,
      hammertime: null,
      dx: null,
      dy: null,
      dWidth: null,
      dHeight: null,
      width: null,
      height: null,
      load: false,
      image: new Image(),
      scale: 1,
      canText: false,
      brightness: 100,
      invert: 0,
      contrast: 100,
      noPan: false,
      deg: 0,
      text: '',
      fontColor: '#ffffff',
      deltaY: 0,
      deltaX: 0,
      fontSize: 20,
      showPopup: false,
      colorS: [{
        label: '红色',
        value: 'red'
      },
      {
        label: '白色',
        value: '#ffffff'
      },
      {
        label: '黑色',
        value: 'black'
      }]
    }
  },
  methods: {
    drawImage (noDelta = true) {
      const scale = this.scale
      const deg = this.deg
      const x = this.canvas.width / 2 // 画布宽度的一半
      const y = this.canvas.height / 2 // 画布高度的一半
      if (noDelta) {
        this.deltaX = this.deltaY = 0
      }
      // Rotate
      this.ctx.save()
      this.ctx.clearRect(0, 0, x * 2, y * 2) // 先清掉画布上的内容
      this.ctx.translate(x, y) // 将绘图原点移到画布中点
      this.ctx.rotate((Math.PI / 180) * deg) // 旋转角度
      this.ctx.scale(scale, scale)
      this.ctx.translate(-x, -y) // 将画布原点移动
      // Filter
      this.ctx.filter = `contrast(${this.contrast}%) brightness(${this.brightness}%) invert(${this.invert}%)`
      // 绘制图片
      this.ctx.drawImage(this.image, this.dx + this.deltaX, this.dy + this.deltaY, this.dWidth, this.dHeight)
      this.ctx.restore()
      this.ctx.save()
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = this.fontColor
      this.ctx.font = `${this.fontSize}px bold serif`
      this.ctx.fillText(this.text, x, y)
      this.ctx.restore()
      // Scale
    },
    changeBrightness (value) {
      this.brightness = value
      this.drawImage()
    },
    initCanvas () {
      this.$nextTick(() => {
        this.canvas = this.$refs.canvas
        this.ctx = this.$refs.canvas.getContext('2d')
        this.canvasClip()
        this.initHammer()
      })
    },
    fileData (e) {
      try {
        this.image.src = URL.createObjectURL(e.target.files[0])
      } catch (error) {
        console.log(error)
      }
    },
    initHammer () {
      let callBack = () => {
        this.hammertime = new Hammer.Manager(this.$refs.canvas)
        this.hammertime.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }))
        this.hammertime.add(new Hammer.Pinch({ enable: true }))
        this.hammertime.on('pan', this.panLisener)
        this.hammertime.on('panend', this.panEnd)
        this.hammertime.on('pinchin', this.pinchIn)
        this.hammertime.on('pinchout', this.pinchOut)
      }
      window.requestAnimationFrame(callBack)
    },
    panEnd (e) {
      if (this.noPan) {
        return
      }
      this.dx += e.deltaX
      this.dy += e.deltaY
    },
    pinchIn (e) {
      if (this.noPan) {
        return
      }
      if (this.scale <= 0.3) {
        return
      }
      this.scale -= 0.03
      this.drawImage()
    },
    pinchOut (e) {
      if (this.noPan) {
        return
      }
      if (this.scale >= 2.5) {
        return
      }
      this.scale += 0.03
      this.drawImage()
    },
    canvasClip () {
      this.ctx.beginPath()
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2, 0, Math.PI * 2, true)
      this.ctx.clip()
    },
    initCanvasImage () {
      this.dx = this.canvas.width / 2 - this.image.width / 2
      this.dy = this.canvas.height / 2 - this.image.height / 2
      this.ctx.drawImage(this.image, this.dx, this.dy)
      this.load = true
    },
    imageOnload () {
      this.image.addEventListener('load', (e) => {
        this.dWidth = this.width = this.image.width
        this.dHeight = this.height = this.image.height
        this.initCanvasImage()
      }, false)
    },
    panLisener (e) {
      if (this.noPan) {
        return
      }
      if (e.additionalEvent) {
        console.log(`deltaX`, e.deltaX)
        console.log(`deltaY`, e.deltaY)
        this.deltaX = e.deltaX
        this.deltaY = e.deltaY
        this.drawImage(false)
      }
    },
    getText () {
      this.canText = true
      this.noPan = true
    },
    async fetchImage () {
      const formData = new FormData()
      this.canvas.toBlob(async (blob) => {
        formData.append('image', blob, `$image-${Date.now()}.png`)
        console.log(blob)
        const res = await fetch('http://192.168.1.107:3000/', {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        })
        console.log(res)
      })
    },
    addText (e) {
      this.showPopup = true
    },
    closePopup () {
      this.showPopup = false
      this.drawImage()
    }
  },
  created () {
    this.initCanvas()
    this.imageOnload()
  },
  computed: {
    canDr () {
      if (this.canText) {
        return true
      }
      return !this.load
    }
  },
  watch: {
    deg () {
      this.drawImage()
    },
    brightness () {
      this.drawImage()
    },
    contrast () {
      this.drawImage()
    }
  }
}
</script>

<style module>
@import url(./assets/iconfont.css);
.canvas{
  display: block;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 0 auto;
}
.canvas_waper{
  width: 100%;
  position: relative;
}
.upload{
  position: absolute;
  width: 130px;
  height: 130px;
  left: calc(50% - 130px / 2);
  bottom: calc(50% - 130px / 2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  border: 1px #ccc;
  border-style: dashed;
}
.file_input{
  position: absolute;
  opacity: 0;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.upload_text{
  display: block;
}
.range_warper{
  padding: 0 10px;
}
.icon_center{
  line-height: 30px;
  margin: 0 10px 0 0;
}
.button_warper{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.popup{
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around; */
  padding: 10px;
}
</style>
