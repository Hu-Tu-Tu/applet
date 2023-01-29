const util = require('../../utils/utils.js');
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 传递给自定义组件tabs的数据
        tabs:[
            {id:0,value:"综合",isActive:true},
            {id:1,value:"销量",isActive:false},
            {id:2,value:"价格",isActive:false}],
        // 商品综合排序
        goodsList:[],
        // 商品价格排序
        priceList:[],
        // 商品销量排序
        hot:[]
    },
    // 参数默认列表
    queryList:{
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },
    // 总页数
    totalPages:1,
    // 获取页面数据
    getdata:function(){
        var that=this
        util.utilrequest(api.goods_search,this.queryList,'GET').then(function (res) {
            if (res.statusCode === 200) {
                console.log("页面数据：")
                console.log(res)

                // 获取总条数
                var total=res.data.message.total
                // 计算总页数 自动向上取整
                that.totalPages=Math.ceil(total/(that.queryList.pagesize))
                // 综合数据获取
                let goods=res.data.message.goods
                that.setData({
                    // 这里对数据进行拼接，这样后续重新获取数据的时候不会僵硬的下一页转换数据
                    goodsList:[...that.data.goodsList,...goods],
                });
                // 销量数据获取 因为接口没有定义这个数据，这里用id排序来代替
                var hot=that.data.goodsList
                that.setData({
                    hot:hot.sort(that.objectSort("goods_id"))
                })
                // 价格数据获取
                var prices=that.data.goodsList
                that.setData({
                    // 这里对数据进行拼接，这样后续重新获取数据的时候不会僵硬的下一页转换数据
                    priceList:prices.sort(that.objectSort("goods_price"))
                });
            }
        });
        // 数据请求完毕，手动关闭窗口
        wx.stopPullDownRefresh();
    },

      objectSort(property) {
        return function (Obj1,Obj2) {
              return Obj1[property]-Obj2[property]
        }
      },

  
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.queryList.cid=options.cid||"";
        this.queryList.query=options.query||"";
        this.getdata()
    },
     /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 判断有没有下一页数据
        if((this.queryList.pagenum)>=this.totalPages){
            wx.showToast({
              title: '加载完毕~'
            })
        }else{
            this.queryList.pagenum++
            this.getdata()  
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // 重置数组
        this.setData({
            goodsList:[]
        })
        // 重置页码
        this.queryList.pagenum=1
        // 发送数据
        this.getdata()
        
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})