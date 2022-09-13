export function strParse(obj) {
    return objParse(objStr(obj));
}
export function objStr(obj) {
    return JSON.stringify(obj);
}
export function objParse(str) {
    return JSON.parse(str);
}
export function unique(array) {
    var obj = {};
    return array.filter(function (item, index, array) {
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true);
    });
}
export function groupBy(list, fn) {
    var groups = [];
    list.forEach(function (o) {
        var group = JSON.stringify(fn(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    });
}
