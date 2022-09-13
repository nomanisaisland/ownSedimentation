var _toString = Object.prototype.toString;
export var emptyObject = Object.freeze({});
export function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
export function isNullPlainObject(obj) {
    return JSON.stringify(obj) === '{}' || JSON.stringify(obj) === undefined;
}
export function isFunction(obj) {
    return toString.call(obj) === '[object Function]';
}
export function eq(a, b, aStack, bStack) {
    if (a === b)
        return a !== 0 || 1 / a === 1 / b;
    if (a == null || b == null)
        return false;
    if (a !== a)
        return b !== b;
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object')
        return false;
    return deepEq(a, b, aStack, bStack);
}
;
export function deepEq(a, b, aStack, bStack) {
    var className = toString.call(a);
    if (className !== toString.call(b))
        return false;
    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a)
                return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }
    var areArrays = className === '[object Array]';
    if (!areArrays) {
        if (typeof a != 'object' || typeof b != 'object')
            return false;
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b;
        }
    }
    aStack.push(a);
    bStack.push(b);
    if (areArrays) {
        length = a.length;
        if (length !== b.length)
            return false;
        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack))
                return false;
        }
    }
    else {
        var keys = Object.keys(a), key;
        length = keys.length;
        if (Object.keys(b).length !== length)
            return false;
        while (length--) {
            key = keys[length];
            if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack)))
                return false;
        }
    }
    aStack.pop();
    bStack.pop();
    return true;
}
