/**
 * 封封微信的的request,默认是GET方式获取
 */
let count=0;
function utilrequest(url, data = {}, method = "GET",header={} ) {
    count++
    wx.showLoading({
        title: '加载中...',
    });
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header:header,
            success: function (res) {
                wx.hideLoading();
                if (res.statusCode == 200) {
                    resolve(res);
                } else {
                    reject(res.errMsg);
                }

            },
            fail: function (err) {
                // 失败操作
                reject(err)
            },
            // 不管成功还是失败，都要关闭加载图标，多次数据加载的时候，只需要在最后的数据加载完成后再关闭窗口
            complete(){
                count--
                if(count===0){
                    wx.hideLoading()
                }
            }
        })
    });
}
module.exports = {
    utilrequest:utilrequest
}
