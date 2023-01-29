// 获取全局唯一的app实例
const app=getApp()
const util = require('../../utils/utils.js');
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头部导航栏的高度
    statusBarHeight: app.globalData.statusBarHeight,
    // 历史搜索
    historyStorage:[],
    // 显示隐藏
    eye:true,
    // 查询结果
    goods:[],
    // 取消按钮是否隐藏
    isFocus:false,
    // 输入框的值
    inputValue:''
  },
    //   定时器，防止抖动，用于输入框中，防止重复输入重复发送请求
    timeId:-1,
    //   返回上一级页面,防止冒泡事件
    goBack:function(){
        wx.navigateBack({
            delta:1
        })
    },
    //   获取input中的内容
    getInputValue:function(e){
        //   获取值
        const value=e.detail.value
        // 检查输入的合法性，比如空格 不合法
        if(!value.trim()){
            this.setData({
                goods:[],
                isFocus:false
            })
            // 不合法的值
            return;
        }
        
        // 显示按钮
        this.setData({
            isFocus:true
        })
        clearTimeout(this.timeId)
        // 重新开启定时器
        this.timeId=setTimeout(()=>{
            // 准备发送请求获取数据
            this.getdata(value)
        },1000)
        
    },
    // 获取页面数据
    getdata:function(query){
        var that=this
        util.utilrequest(api.goods_qsearch,{query:query},'GET').then(function (res) {
            if (res.statusCode === 200) {
                // 历史记录存储 会有重复的数据
                const history =wx.getStorageSync('history')||[]
                history.push(query)
                wx.setStorageSync('history', history)
                that.setData({
                    goods:res.data.message,
                    historyStorage:history
                })
            }
        });
    },
    // 取消
    cancel:function(){
        this.setData({
            goods:[],
            isFocus:false,
            inputValue:''
        })
    },
    // 清除历史记录
    cancelHistory:function(){
        var that=this
        wx.showModal({
            content:'确认清除所有历史搜索？',
            success:function(res){
                if(res.confirm){
                    wx.removeStorage({
                      key: 'history',
                      success(res){
                          that.setData({
                              historyStorage:[]
                          })
                      }
                    })
                }else{
                    console.log('点击取消')
                }
            },
        })
    },
    // 显示或者不显示历史搜索
    eyeChange:function(){
        var eye=this.data.eye
        // true,说明显示,点击后就不显示
        if(eye){
            this.setData({
                historyStorage:[],
                eye:false
            })
        }else {
            this.setData({
                historyStorage:wx.getStorageSync('history'),
                eye:true
            })
        }
    },
    // 删除单个历史记录
    cancelItem:function(e){
        var that=this
        var index=e.currentTarget.dataset.index
        var history =this.data.historyStorage
        // 弹窗
        wx.showModal({
            title:'提示',
          content:'是否删除该搜索记录',
          success(res){
              if(res.confirm){
                  history.splice(index,1)
                  that.setData({
                      historyStorage:history
                  })
                  wx.setStorageSync('history', history)
              }else{
                  console.log('用户点击取消')
              }
          }
        })
    },
    // 内容上移
    upValue:function(e){
        var value=e.currentTarget.dataset.value
        this.setData({
            inputValue:value
        })
        this.getdata(value)
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     //   显示的时候，显示历史记录
     const historyStorage=wx.getStorageSync('history')||[]
     this.setData({
         historyStorage:historyStorage
     })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})