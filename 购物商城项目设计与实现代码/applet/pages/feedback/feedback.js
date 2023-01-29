
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {id:0,value:"用户体验",isActive:true},
            {id:1,value:"商品/商家投诉",isActive:false},
        ],
        // 图片路径
        picListPath:[],
        // 文字框输入值
        textValue:''
    },
    // 外网图片路径数组
    imageList:[],
    // 事件定时器
    timeId:-1,
    // 上层点击事件
    tabsClick:function(event){
        // 获取被点击的标题索引
        const {index}=event.detail;
        // 修改原数组
        let {tabs}=this.data
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
        // 赋值
        this.setData({
            tabs
        })
    },
    // 上传图片
    upImage:function(){
        var that=this
        wx.chooseImage({
          count: 9,
          sizeType:['original','compressed'],
          sourceType:['album','camera'],
          success(res){
            that.setData({
                // 图片数组进行拼接
                picListPath:[...that.data.picListPath,...res.tempFilePaths]
            })
          }
        })
    },
    // 删除图片
    deleteImg:function(e){
        const index=e.currentTarget.dataset.index
        let paths=this.data.picListPath
        var that=this
        wx.showModal({
          "title":'提示',
          "content":"是否删除图片",
          success(res){
              if(res.confirm){
                paths.splice(index,1)
                that.setData({
                    picListPath:paths
                })
              }else {
                  console.log('用户取消')
              }
          }
        })
        
    },
    // 获取文本内容
    getInputValue:function(e){
        this.setData({
            textValue:e.detail.value
        })
        // console.log(e)
    },
    // 提交内容
    submit:function(){
        const value=this.data.textValue
        // 合法性验证
        if(!value.trim()){
            // 不合法
            wx.showToast({
              title: '内容不能为空',
              icon:'none',
              mask:true
            })
            return;
        }
        // 清空数据
        this.setData({
            picListPath:[],
            textValue:''
        })
        wx.showToast({
          title: '提交成功，感谢您的反馈',
          icon:"none"
        })
        // 清除定时器
        clearTimeout(this.timeId)
        // 重新开启定时器 不然显示不出友好提示
        this.timeId=setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            })
        },1000)
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