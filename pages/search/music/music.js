//explore.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    search:{
      focus: false,
    },
    nodata:false,
    slogan: 'solgan',
    query:'王菲',
    keyword:'王菲',
    limit:10, 
    loading: {
      hidden: false
    },
    userInfo: {},
    cates: [],
    info: {
      list: [],
      hasMore: true,
      page: 1,
      count: 0,
      limit: 10,
      hidden: true
    },
    isLoading: false
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
  focus: function(e){
    var that = this;
    that.setData({
      search: {
        focus: true
      }
    });
  },
  blur: function(e){
    var that = this;
    that.setData({
      search: {
        focus: false
      },query:''});

  },
  clear: function(e){
    var that = this;
    console.log(e);
    that.setData({ "query": '' });
  },
  input: function(e){
    var that = this;
    console.log(e);
    that.setData({"query":e.detail.value});

  },
  search: function(e){
    console.log(e);
    var that = this;
    var q = e.detail.value, limit = that.data.limit, p = that.data.info.page;
    if(q.length == 0)
      return;
    var data = { q: q, l: limit, p: p }
    util.search_qq_music(data, function (data) {
      console.log(data);
      if(data.list.length>0){
        var count = data.totalnum;
        var hasMore = count > limit * (p + 1)
        that.setData({
          'info.page': 2,
          'keyword': q,
          'info.hasMore': hasMore,
          'loading.hidden': true,
          'info.list': data.list,
          'info.hidden': false
        })
      }else{
        that.setData({
          'keyword': q,
          'nodata':true,
          'info.hasMore': true,
          'loading.hidden': true,
          'info.hidden': true
        })
      }
      
    }, function (err) {
      console.log(err);
    });
  },
  onPullDownRefresh: function (e) {
    console.log(e);
    var that = this;
    wx.stopPullDownRefresh();
    that.initData();
  },
  onReachBottom: function (e) {
    var that = this;
    console.log('加载..');
    that.loadMore();
  },
  scroll: function (e) {
    //console.log(e)
  },loadMore:function(){
    var that = this;
    if(!that.data.info.hasMore)
      return;
    var q = that.data.keyword, limit = that.data.limit, p = that.data.info.page;
    if(q.length == 0)
      return;
    var data = { q: q, l: limit, p: p }
    that.setData({'isLoading':true});
    util.search_qq_music(data, function (data) {
      console.log(data);
      var count = data.totalnum;
      var hasMore = count > limit * (p + 1);
      that.setData({
        'info.page': p+1,
        'info.hasMore': hasMore,
        'isLoading': false,
        'info.list': that.data.info.list.concat(data.list),
        'info.hidden': false
      })
      
    }, function (err) {
      console.log(err);
      that.setData({ 'isLoading': false });
    });
  },
  initData: function () {
    var that = this;
    var q = that.data.keyword, limit = that.data.limit, p = 1;
    var data = { q: q, l: limit, p: p }
    util.search_qq_music(data, function (data) {
      console.log(data);
      var count = data.totalnum;
      var hasMore = count>limit*(p+1)
      that.setData({
        'info.page': 2,
        'info.hasMore': hasMore,
        'loading.hidden': true,
        'info.list': data.list,
        'info.hidden': false
      })
    }, function (err) {
      console.log(err);
    });
    

  },
  onLoad: function () {
    console.log('生命周期:explore-load')
    var that = this;
    /*
    that.setData({
      'info.hasMore': true,
      'loading.hidden': true,
      'info.hidden': false
    })
    */
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
