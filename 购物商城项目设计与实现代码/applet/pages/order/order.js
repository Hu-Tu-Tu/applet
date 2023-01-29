const util = require('../../utils/utils.js');
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 自定义组件
        tabs:[
            {id:0,value:"全部",isActive:true},
            {id:1,value:"待付款",isActive:false},
            {id:2,value:"待发货",isActive:false},
            {id:3,value:"退款/退货",isActive:false}
        ],
        // 订单
        orders: [
            {
                "order_id": 428,
                "user_id": 23,
                "order_number": "HMDD20190802000000000428",
                "order_price": 13999,
                "order_pay": "0",
                "is_send": "否",
                "trade_no": "",
                "order_fapiao_title": "个人",
                "order_fapiao_company": "",
                "order_fapiao_content": "",
                "consignee_addr": "广东省广州市海珠区新港中路397号",
                "pay_status": "1",
                "create_time": '2022/5/9 早上10:15',
                "update_time": 1564731518,
                "order_detail": null,
                "goods": [
                  {
                    "id": 717,
                    "order_id": 428,
                    "goods_id": 43986,
                    "goods_price": 13999,
                    "goods_number": 1,
                    "goods_total_price": 13999,
                    "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
                    "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
                  }
                ],
                "total_count": 1,
                "total_price": 13999
              },
              {
                "order_id": 428,
                "user_id": 23,
                "order_number": "HMDD20190802000000000428",
                "order_price": 3999,
                "order_pay": "0",
                "is_send": "否",
                "trade_no": "",
                "order_fapiao_title": "个人",
                "order_fapiao_company": "",
                "order_fapiao_content": "",
                "consignee_addr": "广东省广州市海珠区新港中路397号",
                "pay_status": "1",
                "create_time": '2022/5/9 早上10:15',
                "update_time": 1564731518,
                "order_detail": null,
                "goods": [
                  {
                    "id": 717,
                    "order_id": 428,
                    "goods_id": 43986,
                    "goods_price": 13999,
                    "goods_number": 1,
                    "goods_total_price": 13999,
                    "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
                    "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
                  }
                ],
                "total_count": 1,
                "total_price": 13999
              },
              {
                "order_id": 428,
                "user_id": 23,
                "order_number": "HMDD20190802000000000428",
                "order_price": 1234,
                "order_pay": "0",
                "is_send": "否",
                "trade_no": "",
                "order_fapiao_title": "个人",
                "order_fapiao_company": "",
                "order_fapiao_content": "",
                "consignee_addr": "广东省广州市海珠区新港中路397号",
                "pay_status": "1",
                "create_time": '2022/5/9 早上10:15',
                "update_time": 1564731518,
                "order_detail": null,
                "goods": [
                  {
                    "id": 717,
                    "order_id": 428,
                    "goods_id": 43986,
                    "goods_price": 13999,
                    "goods_number": 1,
                    "goods_total_price": 13999,
                    "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
                    "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
                  }
                ],
                "total_count": 1,
                "total_price": 13999
              },
              {
                "order_id": 428,
                "user_id": 23,
                "order_number": "HMDD20190802000000000428",
                "order_price": 999,
                "order_pay": "0",
                "is_send": "否",
                "trade_no": "",
                "order_fapiao_title": "个人",
                "order_fapiao_company": "",
                "order_fapiao_content": "",
                "consignee_addr": "广东省广州市海珠区新港中路397号",
                "pay_status": "1",
                "create_time": '2022/5/9 早上10:15',
                "update_time": 1564731518,
                "order_detail": null,
                "goods": [
                  {
                    "id": 717,
                    "order_id": 428,
                    "goods_id": 43986,
                    "goods_price": 13999,
                    "goods_number": 1,
                    "goods_total_price": 13999,
                    "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
                    "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
                  }
                ],
                "total_count": 1,
                "total_price": 13999
              },
              {
                "order_id": 428,
                "user_id": 23,
                "order_number": "HMDD20190802000000000428",
                "order_price": 5678,
                "order_pay": "0",
                "is_send": "否",
                "trade_no": "",
                "order_fapiao_title": "个人",
                "order_fapiao_company": "",
                "order_fapiao_content": "",
                "consignee_addr": "广东省广州市海珠区新港中路397号",
                "pay_status": "1",
                "create_time": '2022/5/9 早上10:15',
                "update_time": 1564731518,
                "order_detail": null,
                "goods": [
                  {
                    "id": 717,
                    "order_id": 428,
                    "goods_id": 43986,
                    "goods_price": 13999,
                    "goods_number": 1,
                    "goods_total_price": 13999,
                    "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
                    "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
                  }
                ],
                "total_count": 1,
                "total_price": 13999
              },
              {
                "order_id": 428,
                "user_id": 23,
                "order_number": "HMDD20190802000000000428",
                "order_price": 8889,
                "order_pay": "0",
                "is_send": "否",
                "trade_no": "",
                "order_fapiao_title": "个人",
                "order_fapiao_company": "",
                "order_fapiao_content": "",
                "consignee_addr": "广东省广州市海珠区新港中路397号",
                "pay_status": "1",
                "create_time": '2022/5/9 早上10:15',
                "update_time": 1564731518,
                "order_detail": null,
                "goods": [
                  {
                    "id": 717,
                    "order_id": 428,
                    "goods_id": 43986,
                    "goods_price": 13999,
                    "goods_number": 1,
                    "goods_total_price": 13999,
                    "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
                    "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
                  }
                ],
                "total_count": 1,
                "total_price": 13999
              }
        ],
        // 订单价格排序
        prices:[]
        
    },
    // 对象sort
    objectSort(property) {
        return function (Obj1,Obj2) {
              return Obj1[property]-Obj2[property]
        }
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
    // 获取数据
    getData:function(dataList){
        util.utilrequest(api.orders_all,dataList,'GET',header).then(function (res) {
            if (res.statusCode === 200) {
                console.log('先获取企业认证的微信小程序')
                that.setData({
                    orders:res.data.message.orders
                })
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var prices=this.data.orders.sort(this.objectSort("order_price"))
        
        this.setData({
            prices:prices
        })
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
        // 获取页面栈 最多同时打开10个页面
        let pages=getCurrentPages()
        // 获取当前索引
        let currentPage=pages[pages.length-1]
        // console.log(currentPage.options)
        // 改变当前的页面的跳转
        this.click(currentPage.options.type-1)
        // 点击不同的内容都需要发送一次请求
        return;
        var that=this
        // 如果没有token，就跳转页面去授权 需要企业appid
        const token=wx.getStorageSync('token')
        if(!token){
            wx.navigateTo({
            url: '/pages/auth/auth',
            })
            return;
        } 
        // 请求头参数
        const header ={Authorization:token}
        // 封装参数
        const dataList={type:currentPage.options.type}
        this.getData(dataList)
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