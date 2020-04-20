// pages/templates/comment/comment.js
import base from '../../../config/base.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comtflag:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tx: base.static + '/sault/tx.png',
    close: base.static + '/viddetail/close.png',
    hua: base.static + '/viddetail/hua.png',
    hua_a: base.static + '/viddetail/hua_a.png', 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    comtclose(){
      this.triggerEvent('comtclose', {});
    },
  }
})
