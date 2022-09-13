function timeDownUp(time, nowTime) {
    var leftTime = (time - nowTime) / 1000 / 60 / 60 / 24;
    if (leftTime < 0) {
        return 0;
    }
    else {
        return leftTime;
    }
}
function timeConversion(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var monthNum = date.getMonth() + 1;
    var dayNum = date.getDate();
    var monthStr = handleSingular(monthNum);
    var dayStr = handleSingular(dayNum);
    return year + "-" + monthStr + "-" + dayStr;
}
function timeConversionOnly(time, addTime) {
    var timeStamp = new Date(time).getTime() + addTime;
    var timeLocal = new Date(timeStamp);
    var year = timeLocal.getFullYear();
    var month = handleSingular(timeLocal.getMonth() + 1);
    var day = handleSingular(timeLocal.getDate());
    var hour = handleSingular(timeLocal.getHours());
    var minute = handleSingular(timeLocal.getMinutes());
    var second = handleSingular(timeLocal.getSeconds());
    return year + "-" + month + "-" + day + ' ' + hour + ':' + minute + ':' + second;
}
function handleSingular(param) {
    if (param < 10) {
        return '0' + param.toString();
    }
    else {
        return String(param);
    }
}
function addZero(num) {
    if (num < 10) {
        return '0' + num;
    }
    return "" + num;
}
function showtime(nowTime, endTime) {
    var leftTime = Math.floor((endTime - nowTime) / 1000);
    if (leftTime <= 0)
        leftTime = 0;
    var d = Math.floor(leftTime / (24 * 60 * 60));
    var h = Math.floor((leftTime / (60 * 60)) % 24);
    var m = Math.floor((leftTime / 60) % 60);
    var s = Math.floor(leftTime % 60);
    var arr = [];
    arr.push(addZero(d), ':', addZero(h), ':', addZero(m), ':', addZero(s));
    return arr;
}
export { timeDownUp, timeConversion, handleSingular, timeConversionOnly, showtime };
