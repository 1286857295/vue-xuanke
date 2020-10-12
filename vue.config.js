module.exports = {
    devServer:{
        open:true,
        proxy: {
            '/xuanke': {
              target: 'http://localhost:8088/', //设置你调用的接口域名和端口号 别忘了加http
              changeOrigin: true, //允许跨域
              pathRewrite: {
                '^/xuanke': '/xuanke'
             }
            }
        }
    }
}