<template>
  <div :class="$style.waper">
    <div :class="$style.canvas_waper">
      <canvas ref="canvas" width="300px" height="300px" :class="$style.canvas"></canvas>
      <div :class="[$style.upload, $style['icon-upload'], $style.icon]" v-if="!load">
        <span :class="$style.upload_text">上传文件</span>
        <input type="file" name="image" id="" @change="fileData" accept="image/*"  :class="$style.file_input">
      </div>
    </div>
    <div v-if="value === 4" :class="$style.fontBox">
      <div :class="$style.leftBox">
        <div :class="{[$style.item]: true, [$style.active]: fontColor === '#000000'}">
          <span :class="[$style.background_000]" @click="changeColor('#000000')">></span>
        </div>
        <div :class="{[$style.item]: true, [$style.active]: fontColor === '#cccccc'}">
          <span :class="[$style.background_ccc]" @click="changeColor('#cccccc')"></span>
        </div>
        <div :class="{[$style.item]: true, [$style.active]: fontColor === '#ffffff'}">
          <span :class="[$style.background_fff]" @click="changeColor('#ffffff')"></span>
        </div>
      </div>
      <div :class="$style.rightBox">
        <span :class="{[$style.icon]: true, [$style['icon-add']]: noFont, [$style.fontSize]: true, [$style['icon-angle']]: !noFont,}" @click="changeModle"></span>
      </div>
      <div :class="$style.tool_box">
        <mt-range
        v-model="fontSize"
        :barHeight="2"
        :min="10"
        :max="40"
        :step="1"
        value="40">
          <div slot="start"><i :class="[$style.icon, $style['icon-font'], $style.icon_center]"></i></div>
        </mt-range>
      </div>
    </div>
    <div v-if="!canText">
      <div :class="$style.tool_box" v-if="value === 0">
        <mt-range
        :disabled="!load"
        :barHeight="2"
        v-model="invert"
        :min="0"
        :max="100"
        :step="1">
          <div slot="start" :class="$style.font_indet">反色</div>
        </mt-range>
      </div>
      <div :class="$style.tool_box" v-if="value === 1">
        <mt-range
        :barHeight="2"
        v-model="deg"
        :min="-180"
        :max="180"
        :step="1">
          <div slot="start" :class="$style.font_indet">旋转</div>
        </mt-range>
      </div>
      <div :class="$style.tool_box" v-if="value === 2">
        <mt-range
          :barHeight="2"
          v-model="brightness"
          :min="30"
          :max="200"
          :step="1"
          value="100">
          <div slot="start" :class="$style.font_indet">亮度</div>
        </mt-range>
      </div>
      <div :class="$style.tool_box" v-if="value === 3">
        <mt-range
          :barHeight="2"
          v-model="contrast"
          :min="0"
          :max="200"
          :step="1"
          value="100">
          <div slot="start" :class="$style.font_indet">对比度</div>
        </mt-range>
      </div>
      <div :class="$style.padding">
        <mt-button @click="fetchImage" :disabled="!load" type="primary" size="large">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'
import { Button, Range, MessageBox, Indicator, Toast } from 'mint-ui'
export default {
  components: {
    [Button.name]: Button,
    [Range.name]: Range,
    [MessageBox.name]: MessageBox
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  name: 'x-canvas',
  data () {
    return {
      noFont: true,
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
      fontColor: '#000000',
      deltaY: 0,
      deltaX: 0,
      fontSize: 40
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
      this.ctx.translate(this.deltaX, this.deltaY)
      this.ctx.drawImage(this.image, this.dx, this.dy, this.dWidth, this.dHeight)
      this.ctx.restore()
      this.ctx.save()
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = this.fontColor
      this.ctx.font = `${this.fontSize}px bolder serif`
      this.ctx.fillText(this.text, x, y)
      this.ctx.restore()
      // Scale
    },
    drawText (addHitRegion = true) {
      this.drawImage()
    },
    changeColor (value) {
      this.fontColor = value
      this.drawText()
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
      if (this.scale <= 0.1) {
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
      this.$emit('loadImage', true)
    },
    imageOnload () {
      this.image.addEventListener('load', (e) => {
        this.dWidth = this.width = this.image.width
        this.dHeight = this.height = this.image.height
        this.initCanvasImage()
      }, false)
    },
    changeModle () {
      console.log(this.noFont)
      if (this.noFont) {
        this.getText()
      } else {
        this.text = ''
      }
      this.noFont = !this.noFont
    },
    panLisener (e) {
      if (this.noPan) {
        return
      }
      if (e.additionalEvent) {
        this.deltaX = e.deltaX
        this.deltaY = e.deltaY
        this.drawImage(false)
      }
    },
    getText () {
      MessageBox.prompt('请输入文字', '').then(({ value, action }) => {
        if (value) {
          this.text = value
        }
      })
        .catch((err) => console.log(err))
    },
    async fetchImage () {
      const url = 'http://www.cinoart.com/Printer/UpdateImg'
      const formBody = []
      const cpuInfo = window.location.search.slice(9) || '277eb3b1e31aa900f406c039a9679902'
      const base64 = this.canvas.toDataURL()
      const data = {
        'cpuInfo': cpuInfo,
        file: base64
      }
      for (let key in data) {
        const encodedKey = encodeURIComponent(key)
        const encodedValue = encodeURIComponent(data[key])
        formBody.push(`${encodedKey}=${encodedValue}`)
      }
      const formData = formBody.join('&')
      try {
        Indicator.open({text: '正在上传', spinnerType: 'double-bounce'})
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          credentials: 'include',
          body: formData
        })
        setTimeout(() => {
          Indicator.close()
        }, 500)
        if (res.body.status === 1) {
          setTimeout(() => {
            Toast('上传成功！')
          }, 500)
        } else {
          setTimeout(() => {
            Toast('上传失败！')
          }, 500)
        }
      } catch (error) {
        console.log(error)
        Indicator.close()
        Toast('上传失败！')
      }
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
    },
    value (value) {
      if (value !== 0) {
        this.noPan = true
      } else {
        this.noPan = false
        this.deg = 0
        this.text = ''
        this.invert = 0
        this.brightness = 100
        this.contrast = 100
        this.initCanvasImage()
      }
    },
    text (value) {
      this.drawImage()
    },
    fontSize () {
      if (this.text) {
        this.drawText()
      }
    },
    invert () {
      this.drawImage()
    }
  }
}
</script>
<style>
@import url(./assets/iconfont.css);
</style>

<style module>
@import url(./assets/iconfont.css);
.leftBox{
  position: absolute;
  left: 20px;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.fontBox{
}
.waper{
  margin-top: 20px;
  padding-top: 10px;
  box-sizing: border-box;
  position: relative;
}
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
.background_000{
  height: 20px;
  width: 20px;
  margin: 1px;
  display: block;
  border-radius: 100%;
  background-color: #000000;
}
.background_ccc{
  height: 20px;
  width: 20px;
  margin: 1px;
  display: block;
  border-radius: 100%;
  background: #cccccc;
}
.background_fff{
  height: 20px;
  width: 20px;
  margin: 1px;
  display: block;
  border-radius: 100%;
  background: #ffffff;
}
.item{
  flex: 1;
  border: 1px solid #cccccc;
  border-radius: 100%;
  margin-right: 5px;
}
.rightBox{
  position: absolute;
  top: 0;
  z-index: 2;
  right: 20px;
}
.fontSize{
  font-size: 30px;
  color: #666666;
}
.active{
  border: 2px solid #26a2ff;
}
.tool_box{
  padding: 20px 20px 0;
  box-sizing: content-box;
  height: 50px;
}
.padding{
  padding: 0 10px;
}
.font_indet{
  margin: 0 10px 0 0;
  font-size: 12px;
}
</style>
