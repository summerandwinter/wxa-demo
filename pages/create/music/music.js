//explore.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
    id: 1003000,
    pid: 0,
    cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg',
    name: '绅士',
    loading: {
      hidden: false
    },
    creater: {
      hidden: false,
    },
    userInfo: {},
    cates: [],
    isLoading: false,
    uploader: { hidden: false },
    preview: { hidden: true }
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log('点击卡片' + id);

  },
  touchstart: function (e) {

  },
  touchmove: function (e) {

  },
  touchcancel: function (e) {

  },
  touchend: function (e) {

  },
  onPullDownRefresh: function (e) {
    console.log(e);
    var that = this;
    wx.stopPullDownRefresh();
  },
  onReachBottom: function (e) {
    var that = this;
  },
  scroll: function (e) {
    //console.log(e)
  },
  initData: function () {
    var that = this;
    that.setData({ 'loading.hidden': true, 'creater.hidden': false });
    util.search_qq_music();

  },
  onLoad: function () {
    console.log('生命周期:explore-load')
    var that = this;
    that.initData();

  },
  onReady: function () {
    console.log('生命周期:explore-ready');
  },
  onShow: function () {

    console.log('生命周期:explore-show');
  },
  onHide: function () {
    console.log('生命周期:explore-hide');
  },
  onUnload: function () {
    console.log('生命周期:explore-unload');
  }
})
