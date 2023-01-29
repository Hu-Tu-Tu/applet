const util = require('../../utils/utils.js');
const api = require('../../utils/api.js');
// 使用es7，增强编译
// import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧的菜单数据
        leftMenuList:[],
        // 右侧商品数据
        rightContent:[],
        // 被点击的左侧的菜单
        currentIndex:0,
        // 有的滚动条距离顶部的距离
        scrollTop:0
    },
    // 返回的全部内容数据
    categoriesList:[],
    // 获取页面数据
    getData:function(){
        var that=this
        //  分类页面数据获取
        util.utilrequest(api.categories,{},'GET').then(function (res) {
            if (res.statusCode === 200) {
                console.log("分类数据：")
                console.log(res)
                that.categoriesList=res.data.message
                // 把接口数据存到本地存储中
                wx.setStorageSync('cates', {time:Date.now(),data:that.categoriesList})

                // 左边的数据获取
                let left=that.categoriesList.map(v=>v.cat_name)
                // let right=that.categoriesList.map(v=>v.children);
                let right=that.categoriesList[0].children
                that.setData({
                    leftMenuList:left,
                    rightContent:right
                });
            }
        });
    },
    // 左侧页面点击事件
    handleItemTap:function(event){
        const {index} =event.currentTarget.dataset;
        let right=this.categoriesList[index].children
        this.setData({
            currentIndex:index,
            rightContent:right,
            // 重新设计右侧内容的scrollTop
            scrollTop:0
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this
        // 1、获取本地存储数据 wx.setStorageSync('cates', {time:Date.now(),data:that.categoriesList})
        const Cates =wx.getStorageSync('cates');
        // 2、判断
        if(!Cates){
            // 不存在数据，获取数据
            that.getData()
        }else{
            // 有旧数据 判断是否过期了 两分钟
            if((Date.now()-Cates.time)>1000*60*2){
                // 重新发送请求
                that.getData()
            }else{
                // 可以使用旧事件
                console.log("可以使用旧数据")
                // 获取到旧的数据
                that.categoriesList=Cates.data;
                // 左边的数据获取
                let left=that.categoriesList.map(v=>v.cat_name)
                // let right=that.categoriesList.map(v=>v.children);
                let right=that.categoriesList[0].children
                that.setData({
                    leftMenuList:left,
                    rightContent:right
                });
            }
        }
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
        this.getData()
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