const util = require('../../utils/utils.js');
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图
        banner:[],
        // 导航
        majorList:[
            {src:"/images/fenleitongji.png",txt:"分类",url:"/pages/category/category",opentype:"switchTab",url:"/pages/category/category"},
            {src:"/images/shipinyinliao.png",txt:"食品医药",url:"/pages/demo1/demo1",opentype:"switchTab",url:"/pages/category/category"},
            {src:"/images/muyingshi.png",txt:"母婴用品",url:"/pages/demo1/demo1",opentype:"switchTab",url:"/pages/category/category"},
            {src:"/images/chaoshi.png",txt:"生活超市",url:"/pages/demo1/demo1",opentype:"switchTab",url:"/pages/category/category"},
            {src:"/images/shuma.png",txt:"数码家电",url:"/pages/demo1/demo1",opentype:"switchTab",url:"/pages/category/category"},
            {src:"/images/meizhuanghuli.png",txt:"美妆护肤",url:"/pages/demo1/demo1",opentype:"switchTab",url:"/pages/category/category"}],
        // 楼层
        floor:[]
    },
    onShareAppMessage: function () {
        // 当前页面转发
        wx.showShareMenu({ 
            withShareTicket: true, 
            menus: ['shareAppMessage', 'shareTimeline'] 
          }) 
        return {
            title: 'Shop',
            desc: '商城首页',
            path: '/pages/index/index'
        }
    },onShareTimeline: function () {
        //用户点击右上角分享朋友圈 
        return { 
          title: 'Shop', 
          query: "id=110101&name=heyzqt", 
          imageUrl: '/images/logo.png' 
        } 
    }, onPullDownRefresh() {
        // 重置数组
        this.setData({
            banner:[],
            floor:[]
        })     
        this.getData();
    },
    //获取数据
    getData:function(){
        var that=this
        // 轮播图数据获取
        util.utilrequest(api.home_swiperdata,{},'GET').then(function (res) {
            if (res.statusCode === 200) {
                console.log("轮播数据：")
                console.log(res)
                res.data.message.forEach((value,index)=>{
                    value.navigator_url='/pages/goods_detail/goods_detail?goods_id='+value.goods_id
                 //    console.log(value.navigator_url)
                })
                that.setData({
                    banner:res.data.message
                });
            }
        });
        // 楼层数据获取
        util.utilrequest(api.home_floordata,{},'GET').then(function (res) {
            if (res.statusCode === 200) {
                console.log("楼层数据")
                console.log(res)
                res.data.message.forEach((v,i)=>{
                   v.product_list.forEach((value,index)=>{
                       var temp=String(value.navigator_url)
                       var str=temp.substring(temp.length-2,temp.length)
                       value.navigator_url='/pages/goods_list/goods_list?query='+str
                    //    console.log(value.navigator_url)
                   })
                })
                that.setData({
                    floor:res.data.message
                });
            }
        });
        // 数据请求完毕，手动关闭窗口
        wx.stopPullDownRefresh();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
})