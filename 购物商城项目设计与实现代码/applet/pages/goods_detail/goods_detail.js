const util = require('../../utils/utils.js');
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品对象
        goodsObj:[],
        // 是否收藏
        isCollect:false
    },
    // 参数列表
    queryList:{
        goods_id:0
    },
    // 商品对象
    goodsInfo:{},
    // 获取数据
    getData(){
        var that=this
        util.utilrequest(api.goods_detail,that.queryList,'GET').then(function(res){
            if (res.statusCode === 200) {
                // console.log(res)
                var message=res.data.message
                // 赋值
                that.goodsInfo=message

                // 页面喧嚷的时候检查是否需要切换图标
                // 获取缓存中的的商品收藏的数组
                let collect=wx.getStorageSync('collect')||[]
                // 判断当前商品是否被收藏了
                let isCollect=collect.some(v=>v.goods_id===that.goodsInfo.goods_id)
                that.setData({
                    goodsObj:{
                        goods_name:message.goods_name,
                        goods_price:message.goods_price,
                        // iphone不支持webp格式的图片 替换图片
                        goods_introduce:message.goods_introduce.replace(/\.webp/g,'.jpg'),
                        pics:message.pics
                    },
                    isCollect:isCollect
                })
            }
        })
    },
    // 点击预览图片
    prevePic:function(e){
        var that=this
        // 获取url
        var urls=that.goodsInfo.pics.map(v=>v.pics_mid)
        // 接收点击获取当前图片
        var current=e.currentTarget.dataset.url
        wx.previewImage({
          urls: urls,
          current:current,
        })
    },
    // 加入购物车
    cartAdd:function(){
        var that=this
        // 获取缓存中的购物车数组 如果是第一次获取数据，获取到的是空字符串，所以要转换成数组
        let cart=wx.getStorageSync('cart')||[]
        // 判断商品对象是否存在购物车数组中
        let index=cart.findIndex(v=>v.goods_id===that.goodsInfo.goods_id)
        if(index===-1){//不存在 第一次添加
            // 添加购物车的数量
            that.goodsInfo.num=1;
            cart.push(that.goodsInfo)
            // 添加购物车是否选中
            that.goodsInfo.checked=true
        }else{
            cart[index].num++
        }//不是第一次
        // 把数据重新放回缓存中
        wx.setStorageSync('cart', cart)
        // 弹窗提示
        wx.showToast({
          title: '已添加购物车',
          icon:'success',
        //   点击后五秒再重新接收
          mask:'true'
        })
    },
    // 点击收藏
    collectChange:function(){
        var that=this
        var iscollect=false
        // 获取缓存汇总商品收藏数组
        let collect =wx.getStorageSync('collect')||[]
        // 判断改商品是否被收藏
        let index=collect.findIndex(v=>v.goods_id===that.goodsInfo.goods_id)
        console.log(index)
        if(index!==-1){
            // 已经收藏过了
            collect.splice(index,1)
            wx.showToast({
              title: '取消收藏',
              icon:"none"
            })
        }else{
            // 没有收藏
            collect.push(that.goodsInfo);
            iscollect=true
            wx.showToast({
                title: '收藏成功',
                icon:"none"
              })
        }
        // 更新缓存
        wx.setStorageSync('collect', collect)
        // 修改属性
        that.setData({
            isCollect:iscollect
        })
    },
    // 立即购买
    buy:function(){
        var that=this
        // 获取缓存中的购物车数组 如果是第一次获取数据，获取到的是空字符串，所以要转换成数组
        let cart=wx.getStorageSync('cart')||[]
        // 对购物车的数据进行修改,所有都是不被选中
        cart.forEach((v)=>{
            v.checked=false
        })
        // 判断商品对象是否存在购物车数组中
        let index=cart.findIndex(v=>v.goods_id===that.goodsInfo.goods_id)
        if(index===-1){//不存在 第一次添加
            // 添加购物车的数量
            that.goodsInfo.num=1;
            // 添加购物车是否选中
            that.goodsInfo.checked=true
            cart.push(that.goodsInfo)
        }else{
            cart[index].num=1
            cart[index].checked=true
        }//不是第一次，修改数量,设置选中

        // 把数据重新放回缓存中
        wx.setStorageSync('cart', cart)
        // 跳转到支付页面
        wx.navigateTo({
          url: '/pages/pay/pay',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.queryList.goods_id=options.goods_id
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
        let pages=getCurrentPages()
        let currentPage=pages[pages.length-1]
        let options=currentPage.options
        this.queryList.goods_id=options.goods_id
        this.getData() 
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