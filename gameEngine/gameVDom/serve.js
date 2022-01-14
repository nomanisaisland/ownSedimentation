let myhttp = require('http');
const time = (new Date()).setHours(0,0,0,0)

let webserver = myhttp.createServer();
//listen 监 听一个3008端口的服务器
webserver.listen('3000', function () {
    console.log("服务器已启动");
    console.log(time)
})