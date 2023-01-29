const util = require('../../utils/utils.js');
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 参数列表
    queryList:{
        encryptedData:'',
        rawData:'',
        iv:'',
        signature:'',
        code:''
    },
    // 获取用户授权
    userInfo:function(e){
        var that=this
        try {
            // 获取用户信息
            const {encryptedData,rawData,iv,signature}=e.detail
            // 获取小程序登录成功后的值
            var code=''
            wx.login({
            timeout: 10000,
            success(res){
                code=res.code
            }
            })
            // 参数列表
            that.queryList.encryptedData=encryptedData,
            that.queryList.rawData=rawData,
            that.queryList.iv=iv,
            that.queryList.signature=signature,
            that.queryList.code=code
            // 发送请求，获取token值 这里会失败，因为这一步骤需要企业认证的appid才可以
            util.utilrequest(api.user_token,that.queryList,'POST').then(function(res){
                if (res.statusCode === 200) {
                    console.log(res)

                    // 把页面跳转回去
                    wx.navigateBack({
                        delta:1//返回上一层
                    })
                    // 防止下面的代码执行，导致console出错
                    return;
                    // 把token存储到缓存中
                    var token =res.data.message.token
                    wx.setStorageSync('token', token)
                }
            })
        } catch (error) {
            console.log(error)
        }
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