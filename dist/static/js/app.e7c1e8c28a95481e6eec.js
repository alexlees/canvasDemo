webpackJsonp([1],{"34+y":function(t,n){},BrVn:function(t,n){t.exports={app:"_7GWKZZxRyNF89VUa_LE90_0"}},"Dl+Q":function(t,n){},J60u:function(t,n){t.exports={icon:"_2cUV5VylbTfV8iyrK7c-Z5_1","icon-image":"_3mgboV-L-Or37JoKOYZLkS_1","icon-upload":"_3YhtKRy03ZAsceuz4NQYpW_1","icon-hexagon":"_3IEx3Zn9g7RH20Zpe6xwcw_1","icon-return":"CairNORpzmOPY4sIn4TcJ_1","icon-return-2":"_3EAS5pLp8pGxx5OCcBRSdc_1","icon-font":"_3grgwOxc6FHnMDXyY_T775_1","icon-drawing":"VC-ad-sNYipI-PYNHyfr6_1","icon-brightness":"_1hsRE7HYHv_iJfGE2W_Lhj_1","icon-contrast":"_3lgTk0Q-VKe1diPHFk3fPH_1","icon-arrow":"efowlHGcx-jaI3dGQ08rr_1","icon-airplane":"SDICAyw3aS204-chq6q3L_1","icon-success":"_3ow9gV-_2TpaWEpu3GaUxT_1","icon-angle":"Ig_3WSDDfxrGybBHwPajI_1","icon-round":"_2mlrr4_EY1atjWXD_qTXCW_1","icon-delete":"_1qipPwZlbCtpLUOJhqI2pd_1","icon-add":"_21u87CxTcLxlBeKG8IQKF8_1","icon-setting":"_3MuNciJ16TV_uQqmnGxPBz_1",leftBox:"_5x1ba_gc0BDjECzxPJU8b_1",fontBox:"_3BiPpPKkLCCfhdO6oZUeBe_1",waper:"_1dlT5D0kjwqJ-bBOmI0-lg_1",canvas:"_7sg5ukifasfdchVvc_Psp_1",canvas_waper:"_1bOFcbBevg4IhEJOTSGh0c_1",upload:"_3GD6A9jmO7N4mAX3lgwXcl_1",file_input:"_1nb7TTjs7JXZtCuKayIloc_1",upload_text:"_45Ef97zl7u-t_d5lc9o3M_1",range_warper:"_1-4SKiAaa0f-PJ6UizJT98_1",icon_center:"_q1ePBc7-TsFv392R6Oc0_1",button_warper:"lN46uXxFzAZE1BZddeWUo_1",popup:"dOAsZq4qpA6cTj4vz5QQm_1",background_000:"_1JzCr4r6ep1K0U6SPfaFpX_1",background_ccc:"_3FL812pcFrLoCNNIo6hn82_1",background_fff:"QafgZ9AB3N6heFZ4Fcvsc_1",item:"_2VV7IXtdVo9JEdaZdxz1hh_1",rightBox:"_3F8B3F9J4Ipuw6VtzFk6XP_1",fontSize:"_2StawJQnytfAHBFX_FzAia_1",active:"_1OnQxtGzSn9HwrUw56gCZ0_1",tool_box:"_18a214l0ZkAZ6qyy4ojyW7_1",padding:"_3B0X2vsRtIyd0bS2Ewp364_1",font_indet:"_3WLIalFJ0UqaLY8DArbIUT_1"}},MPzD:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a,i=e("/5sW"),s=e("bOdI"),c=e.n(s),o=e("Xxa5"),l=e.n(o),r=(e("34+y"),e("X+yh")),h=e.n(r),d=(e("qONS"),e("UQTY")),u=e.n(d),_=e("exGp"),f=e.n(_),v=(e("OgVB"),e("/Lyv")),g=e.n(v),m=(e("Dl+Q"),e("60Ef")),p=e.n(m),x=(e("y+mr"),e("3JdW")),y=e.n(x),b=e("rxKx"),w=e.n(b),$={components:(a={},c()(a,y.a.name,y.a),c()(a,p.a.name,p.a),c()(a,g.a.name,g.a),a),props:{value:{type:Number,default:0}},name:"x-canvas",data:function(){return{noFont:!0,canvas:null,ctx:null,hammertime:null,dx:null,dy:null,dWidth:null,dHeight:null,width:null,height:null,load:!1,image:new Image,scale:1,canText:!1,brightness:100,invert:0,contrast:100,noPan:!1,deg:0,text:"",fontColor:"#000000",deltaY:0,deltaX:0,fontSize:40}},methods:{drawImage:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],n=this.scale,e=this.deg,a=this.canvas.width/2,i=this.canvas.height/2;t&&(this.deltaX=this.deltaY=0),this.ctx.save(),this.ctx.clearRect(0,0,2*a,2*i),this.ctx.translate(a,i),this.ctx.rotate(Math.PI/180*e),this.ctx.scale(n,n),this.ctx.translate(-a,-i),this.ctx.filter="contrast("+this.contrast+"%) brightness("+this.brightness+"%) invert("+this.invert+"%)",this.ctx.translate(this.deltaX,this.deltaY),this.ctx.drawImage(this.image,this.dx,this.dy,this.dWidth,this.dHeight),this.ctx.restore(),this.ctx.save(),this.ctx.textAlign="center",this.ctx.fillStyle=this.fontColor,this.ctx.font=this.fontSize+"px bolder serif",this.ctx.fillText(this.text,a,i),this.ctx.restore()},drawText:function(){!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.drawImage()},changeColor:function(t){this.fontColor=t,this.drawText()},changeBrightness:function(t){this.brightness=t,this.drawImage()},initCanvas:function(){var t=this;this.$nextTick(function(){t.canvas=t.$refs.canvas,t.ctx=t.$refs.canvas.getContext("2d"),t.canvasClip(),t.initHammer()})},fileData:function(t){try{this.image.src=URL.createObjectURL(t.target.files[0])}catch(t){console.log(t)}},initHammer:function(){var t=this;window.requestAnimationFrame(function(){t.hammertime=new w.a.Manager(t.$refs.canvas),t.hammertime.add(new w.a.Pan({direction:w.a.DIRECTION_ALL,threshold:0})),t.hammertime.add(new w.a.Pinch({enable:!0})),t.hammertime.on("pan",t.panLisener),t.hammertime.on("panend",t.panEnd),t.hammertime.on("pinchin",t.pinchIn),t.hammertime.on("pinchout",t.pinchOut)})},panEnd:function(t){this.noPan||(this.dx+=t.deltaX,this.dy+=t.deltaY)},pinchIn:function(t){this.noPan||this.scale<=.1||(this.scale-=.03,this.drawImage())},pinchOut:function(t){this.noPan||this.scale>=2.5||(this.scale+=.03,this.drawImage())},canvasClip:function(){this.ctx.beginPath(),this.ctx.arc(this.canvas.width/2,this.canvas.height/2,this.canvas.width/2,0,2*Math.PI,!0),this.ctx.clip()},initCanvasImage:function(){this.dx=this.canvas.width/2-this.image.width/2,this.dy=this.canvas.height/2-this.image.height/2,this.ctx.drawImage(this.image,this.dx,this.dy),this.load=!0,this.$emit("loadImage",!0)},imageOnload:function(){var t=this;this.image.addEventListener("load",function(n){t.dWidth=t.width=t.image.width,t.dHeight=t.height=t.image.height,t.initCanvasImage()},!1)},changeModle:function(){console.log(this.noFont),this.noFont?this.getText():this.text="",this.noFont=!this.noFont},panLisener:function(t){this.noPan||t.additionalEvent&&(this.deltaX=t.deltaX,this.deltaY=t.deltaY,this.drawImage(!1))},getText:function(){var t=this;g.a.prompt("请输入文字","").then(function(n){var e=n.value;n.action;e&&(t.text=e)}).catch(function(t){return console.log(t)})},fetchImage:function(){var t=this;return f()(l.a.mark(function n(){var e,a,i,s,c,o,r,d,_,f;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:for(o in e="http://www.cinoart.com/Printer/UpdateImg",a=[],i=window.location.search.slice(9)||"277eb3b1e31aa900f406c039a9679902",s=t.canvas.toDataURL(),c={cpuInfo:i,file:s})r=encodeURIComponent(o),d=encodeURIComponent(c[o]),a.push(r+"="+d);return _=a.join("&"),n.prev=7,u.a.open({text:"正在上传",spinnerType:"double-bounce"}),n.next=11,fetch(e,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},credentials:"include",body:_});case 11:f=n.sent,setTimeout(function(){u.a.close()},500),1===f.body.status?setTimeout(function(){h()("上传成功！")},500):setTimeout(function(){h()("上传失败！")},500),n.next=21;break;case 16:n.prev=16,n.t0=n.catch(7),console.log(n.t0),u.a.close(),h()("上传失败！");case 21:case"end":return n.stop()}},n,t,[[7,16]])}))()},addText:function(t){this.showPopup=!0},closePopup:function(){this.showPopup=!1,this.drawImage()}},created:function(){this.initCanvas(),this.imageOnload()},computed:{canDr:function(){return!!this.canText||!this.load}},watch:{deg:function(){this.drawImage()},brightness:function(){this.drawImage()},contrast:function(){this.drawImage()},value:function(t){0!==t?this.noPan=!0:(this.noPan=!1,this.deg=0,this.text="",this.invert=0,this.brightness=100,this.contrast=100,this.initCanvasImage())},text:function(t){this.drawImage()},fontSize:function(){this.text&&this.drawText()},invert:function(){this.drawImage()}}},I={render:function(){var t,n,e,a,i=this,s=i.$createElement,c=i._self._c||s;return c("div",{class:i.$style.waper},[c("div",{class:i.$style.canvas_waper},[c("canvas",{ref:"canvas",class:i.$style.canvas,attrs:{width:"300px",height:"300px"}}),i._v(" "),i.load?i._e():c("div",{class:[i.$style.upload,i.$style["icon-upload"],i.$style.icon]},[c("span",{class:i.$style.upload_text},[i._v("上传文件")]),i._v(" "),c("input",{class:i.$style.file_input,attrs:{type:"file",name:"image",id:"",accept:"image/*"},on:{change:i.fileData}})])]),i._v(" "),4===i.value?c("div",{class:i.$style.fontBox},[c("div",{class:i.$style.leftBox},[c("div",{class:(t={},t[i.$style.item]=!0,t[i.$style.active]="#000000"===i.fontColor,t)},[c("span",{class:[i.$style.background_000],on:{click:function(t){i.changeColor("#000000")}}},[i._v(">")])]),i._v(" "),c("div",{class:(n={},n[i.$style.item]=!0,n[i.$style.active]="#cccccc"===i.fontColor,n)},[c("span",{class:[i.$style.background_ccc],on:{click:function(t){i.changeColor("#cccccc")}}})]),i._v(" "),c("div",{class:(e={},e[i.$style.item]=!0,e[i.$style.active]="#ffffff"===i.fontColor,e)},[c("span",{class:[i.$style.background_fff],on:{click:function(t){i.changeColor("#ffffff")}}})])]),i._v(" "),c("div",{class:i.$style.rightBox},[c("span",{class:(a={},a[i.$style.icon]=!0,a[i.$style["icon-add"]]=i.noFont,a[i.$style.fontSize]=!0,a[i.$style["icon-angle"]]=!i.noFont,a),on:{click:i.changeModle}})]),i._v(" "),c("div",{class:i.$style.tool_box},[c("mt-range",{attrs:{barHeight:2,min:10,max:40,step:1,value:"40"},model:{value:i.fontSize,callback:function(t){i.fontSize=t},expression:"fontSize"}},[c("div",{attrs:{slot:"start"},slot:"start"},[c("i",{class:[i.$style.icon,i.$style["icon-font"],i.$style.icon_center]})])])],1)]):i._e(),i._v(" "),i.canText?i._e():c("div",[0===i.value?c("div",{class:i.$style.tool_box},[c("mt-range",{attrs:{disabled:!i.load,barHeight:2,min:0,max:100,step:1},model:{value:i.invert,callback:function(t){i.invert=t},expression:"invert"}},[c("div",{class:i.$style.font_indet,attrs:{slot:"start"},slot:"start"},[i._v("反色")])])],1):i._e(),i._v(" "),1===i.value?c("div",{class:i.$style.tool_box},[c("mt-range",{attrs:{barHeight:2,min:-180,max:180,step:1},model:{value:i.deg,callback:function(t){i.deg=t},expression:"deg"}},[c("div",{class:i.$style.font_indet,attrs:{slot:"start"},slot:"start"},[i._v("旋转")])])],1):i._e(),i._v(" "),2===i.value?c("div",{class:i.$style.tool_box},[c("mt-range",{attrs:{barHeight:2,min:30,max:200,step:1,value:"100"},model:{value:i.brightness,callback:function(t){i.brightness=t},expression:"brightness"}},[c("div",{class:i.$style.font_indet,attrs:{slot:"start"},slot:"start"},[i._v("亮度")])])],1):i._e(),i._v(" "),3===i.value?c("div",{class:i.$style.tool_box},[c("mt-range",{attrs:{barHeight:2,min:0,max:200,step:1,value:"100"},model:{value:i.contrast,callback:function(t){i.contrast=t},expression:"contrast"}},[c("div",{class:i.$style.font_indet,attrs:{slot:"start"},slot:"start"},[i._v("对比度")])])],1):i._e(),i._v(" "),c("div",{class:i.$style.padding},[c("mt-button",{attrs:{disabled:!i.load,type:"primary",size:"large"},on:{click:i.fetchImage}},[i._v("提交")])],1)])])},staticRenderFns:[]};var C,T=e("VU/8")($,I,!1,function(t){e("QkVX"),this.$style=e("J60u")},null,null).exports,P=(e("XDqQ"),e("Axha")),k=e.n(P),F={components:(C={},c()(C,k.a.name,k.a),c()(C,y.a.name,y.a),C),name:"x-header",props:{canChange:{type:Boolean,default:!1}},data:function(){return{value:0}},methods:{change:function(t){this.canChange&&(this.value=t,this.$emit("changvalue",t))}}},O={render:function(){var t,n,e,a,i,s=this,c=s.$createElement,o=s._self._c||c;return o("header",{class:s.$style.header},[s._m(0),s._v(" "),o("div",{class:s.$style.tabs},[o("span",{class:(t={},t[s.$style.tab_item]=!0,t[s.$style.active]=0===s.value,t),on:{click:function(t){s.change(0)}}},[o("i",{class:[s.$style.icon,s.$style["icon-arrow"]]})]),s._v(" "),o("span",{class:(n={},n[s.$style.tab_item]=!0,n[s.$style.active]=1===s.value,n),on:{click:function(t){s.change(1)}}},[o("i",{class:[s.$style.icon,s.$style["icon-angle"]]})]),s._v(" "),o("span",{class:(e={},e[s.$style.tab_item]=!0,e[s.$style.active]=2===s.value,e),on:{click:function(t){s.change(2)}}},[o("i",{class:[s.$style.icon,s.$style["icon-brightness"]]})]),s._v(" "),o("span",{class:(a={},a[s.$style.tab_item]=!0,a[s.$style.active]=3===s.value,a),on:{click:function(t){s.change(3)}}},[o("i",{class:[s.$style.icon,s.$style["icon-contrast"]]})]),s._v(" "),o("span",{class:(i={},i[s.$style.tab_item]=!0,i[s.$style.active]=4===s.value,i),on:{click:function(t){s.change(4)}}},[o("i",{class:[s.$style.icon,s.$style["icon-font"]]})])])])},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("span",[n("i",{staticClass:"mintui mintui-back"})])}]};var z=e("VU/8")(F,O,!1,function(t){this.$style=e("egQR")},null,null).exports,D={components:c()({xCanvas:T},z.name,z),name:"app",data:function(){return{value:0,load:!1}},methods:{changeValue:function(t){console.log(t),this.value=t},loadImage:function(t){this.load=t}}},U={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{class:this.$style.app},[n("x-header",{attrs:{canChange:this.load},on:{changvalue:this.changeValue}}),this._v(" "),n("x-canvas",{attrs:{value:this.value},on:{loadImage:this.loadImage}})],1)},staticRenderFns:[]};var H=e("VU/8")(D,U,!1,function(t){this.$style=e("BrVn"),e("Qisd")},null,null).exports;e("MPzD");i.default.config.productionTip=!1,new i.default({el:"#app",render:function(t){return t(H)}})},OgVB:function(t,n){},Qisd:function(t,n){},QkVX:function(t,n){},ULTG:function(t,n){},XDqQ:function(t,n){},egQR:function(t,n){t.exports={icon:"_2PvK_yMaZIaxf2MVo3byc8_0","icon-image":"ZnsePKM6Rcyq8ohap6uUK_0","icon-upload":"_2Fat5V5jTSQbMCy-c_NhO1_0","icon-hexagon":"_2q9AP0SC09VCLwD0LPtQSU_0","icon-return":"_2l3TyGgwtB_zyr6JFmMYTq_0","icon-return-2":"_3ALov8O8Fqi9RxftPaDwtW_0","icon-font":"_1SBEuMvw5TDM87dmfTnNc5_0","icon-drawing":"fT0s_G628kEHsHnE5wVZH_0","icon-brightness":"_2HAqOLhMFrrzWW-FkbfSUp_0","icon-contrast":"_1PHaMitmUWxOLOKKDycpjU_0","icon-arrow":"kdXltl9SBzoC6A30CVviB_0","icon-airplane":"_2oOUcQIai67d1BYibOT6RZ_0","icon-success":"_2S9J7aGEFk4O7-zD4Fv79b_0","icon-angle":"_1dnIH7rfC0l0bgbSD36Gek_0","icon-round":"_1iCFb4aMV0bARr_2zlJMX0_0","icon-delete":"_2Y4waixvz80XH2fFpGU4Kr_0","icon-add":"_2zVQ9WqFyd7XQYDDQzzDc3_0","icon-setting":"_2M4pCJU5giZQDfMQyjKvZN_0",header:"_3a2Ly0d3uEFotK3sMjvRRb_0",tabs:"DiMbDt8qvNHCA07HwvcUa_0",tab_item:"_2HDrIWaD1d2ZI1eLvEGyB5_0",active:"_1UWsJezUtPHlpD1EQu7Tz6_0"}},joTY:function(t,n){},qONS:function(t,n){},"y+mr":function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.e7c1e8c28a95481e6eec.js.map