const util = require('../../utils/utils.js');
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 地址
        address:{},
        // 购物车中选中的商品
        cart:[],
        totalPrice:0,
        totalNum:0
    },
    // 定时器
    timeId:-1,
    // 点击支付按钮
    orderPay:function(){
        try {
            // 点击授权
            // wx.navigateTo({
            //     url: '/pages/auth/auth',
            // })
            // 提示
            if(this.data.address===''){
                wx.showToast({
                  title: '还没有地址哦~',
                  icon:"none"
                })
                return
            }
            if(this.data.cart===[]){
                wx.showToast({
                    title: '还没有商品哦~',
                    icon:"none"
                  })
                  return
            }
            wx.showToast({
              title: '支付成功',
              icon:'success'
            })
            // 支付成功后，手动删除掉购物车中的内容
            let newCart=wx.getStorageSync('cart')
            newCart=newCart.filter(v=>!v.checked)
            // 填充回去
            wx.setStorageSync('cart', newCart)
            // 清除定时器
            clearTimeout(this.timeId)
            // 重新开启定时器 不然显示不出友好提示
            this.timeId=setTimeout(()=>{
               // 支付成功，跳转订单页面
                wx.navigateTo({
                    url: '/pages/order/order?type=1',
                })
            },1000)
            
            return;
            // 判断缓存中是否有token 没有就跳转页面
            const token=wx.getStorageSync('token')
            // 如果没有token，就跳转页面去授权 需要企业appid
            if(!token){
                wx.navigateTo({
                url: '/pages/auth/auth',
                })
                return;
            }
            // 创建订单
            // 请求头参数
            const header ={Authorization:token}
            // 请求体参数
            const order_price=this.data.totalPrice
            const consignee_addr=this.data.address.all
            const cart_list=this.data.cart
            let goods=[]
            cart_list.forEach(v=>goods.push({
                goods_id:v.goods_id,
                goods_number:v.goods_number,
                goods_price:v.goods_price
            }))
            // 发送请求，创建订单 获取订单编号
            // 封装参数
            const dataList={order_price,consignee_addr,goods}
            // 发送订单创建请求
            let order_number='';
            util.utilrequest(api.orders_create,dataList,'POST',header).then(function (res) {
                if (res.statusCode === 200) {
                    console.log('先获取企业认证的微信小程序')
                    return;
                    // 获取到订单号 没有企业号，这里先省略
                    order_number=res.data.message.order_number
                }
            });

            // 预支付
            let pay={}
            util.utilrequest(api.req_unifiedorder,{order_number},'POST',header).then(function (res) {
                if (res.statusCode === 200) {
                    console.log('先获取企业认证的微信小程序')
                    return;
                    pay=res.data.message.pay;
                }
            });

            // 调用微信支付
            wx.requestPayment({
                nonceStr:pay.nonceStr,
                package:pay.package,
                paySign:pay.paySign,
                timeStamp:pay.timeStamp,
            })

            // 查询后台看订单是否成功 默认是支付成功的
            util.utilrequest(api.chkOrder,{order_number},'POST',header).then(function (res) {
                if (res.statusCode === 200) {
                    console.log('先获取企业认证的微信小程序')
                    return;
                    console.log(res.data.message)
                }
            });
            // 提示
            wx.showToast({
              title: '支付成功',
              icon:'success'
            })

            // 支付成功后，手动删除掉购物车中的内容 真正实验newCart注释要打开
            // let newCart=wx.getStorageSync('cart')
            newCart=newCart.filter(v=>!v.checked)
            // 填充回去
            wx.setStorageSync('cart', newCart)
            // 支付成功，跳转订单页面
            wx.navigateTo({
              url: '/pages/order/order',
            })

        } catch (error) {
            wx.showToast({
              title: '支付失败',
              icon:'error'
            })
            console.log(error)
        }
    },
    // 获取收货地址
    chooseAddress:function(){
        // 获取收货地址
        wx.chooseAddress({
            success: (result) => {
                console.log(result)
            //   把地址给缓存
            wx.setStorageSync('address', result)
            },
        })
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
        // 希望每一次都能够被刷新
        // 获取缓存中的收货地址
        const address=wx.getStorageSync('address')||[]
        // 获取缓存中的购物车的数据
        const cart =wx.getStorageSync('cart')
        // 过滤购物车数组 没有被选中的不需要
        let checkedCart =cart.filter(v=>v.checked)
        // 计算底部数据
        // 总价格和总数量
        let totalPrice = 0
        let totalNum = 0
        // 遍历数组
        checkedCart.forEach(v=>{
            totalPrice+=v.num*v.goods_price
            totalNum+=v.num
        })

        // 给data赋值
        this.setData({
            address:address,
            cart:checkedCart,
            totalNum:totalNum,
            totalPrice:totalPrice
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