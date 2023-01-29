// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 地址
        address:{},
        // 购物车数组
        cart:[],
        // 全选
        allChecked:false,
        // 总价
        totalPrice:0,
        // 总数量
        totalNum:0
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
    // 复选框 选择
    changeChecked:function(e){
        // 获取被修改对象的id
        const goods_id =e.currentTarget.dataset.id
        // 获取购物车数组
        let cart =this.data.cart
        // 找到被修改的商品的对象
        let index=cart.findIndex(v=>v.goods_id===goods_id);
        // 状态取反
        cart[index].checked=!cart[index].checked
        // 购物车数据重新设置回data中和缓存中 对底部的数据全部重新计算
        this.setcart(cart)
    },
    // 设置购物车状态，同时重新计算购物车底部数据
    setcart:function(cart){
        let allChecked =true
        // 总价格和总数量
        let totalPrice = 0
        let totalNum = 0
        // 检查数组是否是空 因为空数组的全选也是为true
        allChecked =cart.length!=0?allChecked:false
        // 遍历数组
        cart.forEach(v=>{
            if(v.checked){
                totalPrice+=v.num*v.goods_price
                totalNum+=v.num
            }else{
                // 没有背选中，直接就false
                allChecked=false
            }
        })

        // 给data赋值
        this.setData({
            cart:cart,
            allChecked:allChecked,
            totalNum:totalNum,
            totalPrice:totalPrice
        })
        wx.setStorageSync('cart', cart)
    },
    // 全选选择
    allchange:function(){
        // 获取data中的数据
        let cart=this.data.cart
        let allChecked=this.data.allChecked
        // 修改值
        allChecked=!allChecked
        // 循环修改商品中的选中状态
        cart.forEach(v=>v.checked=allChecked)
        // 修改后的值填充回去
        this.setcart(cart)
    },
    // num的改变
    numChange:function(e){
        // 获取传递过来的参数
        let operation=Number(e.currentTarget.dataset.operation)
        let id=e.currentTarget.dataset.id
        // 获取购物车数组
        let cart=this.data.cart
        // 找到需要修改的商品索引
        const index=cart.findIndex(v=>v.goods_id===id)
        // 判断是否要执行删除操作
        var that=this
        // 这里容易出错，在于operation的值的类型不确定
        if(cart[index].num===1&&Number(operation)===Number(-1)){
            // 弹窗
            wx.showModal({
                title: '提示',
                content: '是否删除商品',
                success (res) {
                  if (res.confirm) {
                      cart.splice(index,1)
                      that.setcart(cart)
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
        }else{
            // 修改数量
            cart[index].num+=Number(operation)
            // 设置下面数据
            this.setcart(cart)
        }   
    },
    // 支付点击
    payChange:function(){
        // 获取到购物车中商品内容
        let totalNum=this.data.totalNum
        if(totalNum===0){
            wx.showToast({
                title: '还没有选择商品哦~',
                icon:'none'
              })
              return;
        }
        // 判断收货地址 没有收货地址
        let address=this.data.address
        if(!address.userName){
            wx.showToast({
              title: '还没有收货地址哦~',
              icon:'none'
            })
            return;
        }
        // 一切正常，跳转支付页面
        wx.navigateTo({
          url: '/pages/pay/pay',
          fail(e){
            wx.showToast({
                title: '点击失败，请重试！',
                icon:'error'
            })
            console.log(e)
          }
        })

    },
    // 点击删除商品
    deleteGoods:function(e){
        let index=e.currentTarget.dataset.index
        // 获取购物车数组
        let cart=this.data.cart
        var that=this
        // 弹窗
        wx.showModal({
            title: '提示',
            content: '是否删除商品',
            success (res) {
              if (res.confirm) {
                  cart.splice(index,1)
                  that.setcart(cart)
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
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
        // 计算全选 every数组方法，会遍历，会接收一个回调函数，如果每一个回调偶读分会true，结果就是true，只要一个false，就结束返回false,但是空数组调用every，结果返回值就是true
        // const allChecked =cart.length?cart.every(v=>v.checked):false
        // 设置底部数据
        this.setcart(cart)
        this.setData({
            address:address
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