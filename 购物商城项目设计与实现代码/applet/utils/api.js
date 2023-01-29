const API_BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1/';
module.exports = {
    home_swiperdata:API_BASE_URL+'home/swiperdata',//首页轮播图
    home_floordata:API_BASE_URL+'home/floordata',//首页楼层
    categories:API_BASE_URL+'categories',//分类
    goods_detail:API_BASE_URL+'goods/detail',//商品详情
    goods_search:API_BASE_URL+'goods/search',//商品列表获取
    goods_qsearch:API_BASE_URL+'goods/qsearch',//商品搜索
    user_token:API_BASE_URL+'users/wxlogin',//获取用户的token值
    orders_create:API_BASE_URL+'my/orders/create',//创建订单
    req_unifiedorder:API_BASE_URL+'my/orders/req_unifiedorder',//获取支付参数
    chkOrder:API_BASE_URL+'my/orders/chkOrder',//查看订单状态
    orders_all:API_BASE_URL+'my/orders/all',//查看历史订单
}