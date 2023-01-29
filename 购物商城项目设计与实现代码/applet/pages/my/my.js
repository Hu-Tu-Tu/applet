Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      myinfo:{no:201941417201,name:"陈创慧",classname:"19计算机科学与技术2班",departmentname:"计算机科学与技术学院"}
    
    },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
     
    },
    exit:function(){
      wx.showModal({
        title: '提示',
        content: '是否确认退出',
        success: function (res) {
          if (res.confirm) {
            wx.removeStorageSync('userInfo');
            //页面跳转
            wx.redirectTo({
              url: '/pages/user/user',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
  })