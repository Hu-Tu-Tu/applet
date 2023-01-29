// pages/collect/collect.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {id:0,value:"商品收藏",isActive:true},
            {id:1,value:"品牌收藏",isActive:false},
            {id:2,value:"店铺收藏",isActive:false},
            {id:3,value:"浏览足迹",isActive:false}
        ],
        collect:[]
    },
     // 根据标题被激活选中
     click:function(index){
        // 修改原数组
        let {tabs}=this.data
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
        // 赋值
        this.setData({
            tabs
        })
    },
    // 上层点击事件
    tabsClick:function(event){
        // 获取被点击的标题索引
        const {index}=event.detail;
        this.click(index)
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
        const collect=wx.getStorageSync('collect')||[]
        this.setData({
            collect:collect,
        })
        // 获取页面栈 最多同时打开10个页面
        let pages=getCurrentPages()
        // 获取当前索引
        let currentPage=pages[pages.length-1]
        // console.log(currentPage.options)
        // 改变当前的页面的跳转
        this.click(currentPage.options.type-1)
        // 点击不同的内容都需要发送一次请求
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