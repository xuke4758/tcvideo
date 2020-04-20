// pages/template/sault/sault.js
import base from '../../../config/base.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    saultdata: {
      type: Object,
      value:{
        img: '',
        xing_a: 1
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tx: base.static + '/sault/tx.png',
    xing: base.static + '/sault/xing.png',
    xing_a: base.static + '/sault/xing_a.png',
    bf: base.static + '/sault/bf.png',
    distance: base.static + '/sault/distance.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
