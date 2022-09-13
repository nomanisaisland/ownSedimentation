var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
function isFunction(obj) {
    return toString.call(obj) === '[object Function]';
}
var MyPromise = (function () {
    function MyPromise(executor) {
        this.value = undefined;
        this.status = 'pending';
        this._fulfilledQueues = [];
        this._rejectedQueues = [];
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        }
        catch (error) {
            this._reject(error);
        }
    }
    MyPromise.prototype._resolve = function (value) {
        var _this = this;
        var run = function () {
            if (_this.status !== 'pending')
                return;
            var runFulfilled = function (val) {
                var cb;
                while (cb = _this._fulfilledQueues.shift()) {
                    cb(val);
                }
            };
            var runRejected = function (reason) {
                var cb;
                while (cb = _this._rejectedQueues.shift()) {
                    cb(reason);
                }
            };
            if (value instanceof MyPromise) {
                value.then(function (value) {
                    _this.value = value;
                    _this.status = 'fulfilled';
                    runFulfilled(value);
                }, function (reason) {
                    _this.reason = reason;
                    _this.status = 'rejected';
                    runRejected(reason);
                });
            }
            else {
                _this.value = value;
                _this.status = 'fulfilled';
                runFulfilled(value);
            }
        };
        setTimeout(run, 0);
    };
    MyPromise.prototype._reject = function (reason) {
        var _this = this;
        if (this.status !== 'pending')
            return;
        var run = function () {
            _this.reason = reason;
            _this.status = 'rejected';
            var cb;
            while (cb = _this._rejectedQueues) {
                cb(reason);
            }
        };
        setTimeout(function () {
            run();
        }, 0);
    };
    MyPromise.prototype.then = function (onfulfilled, onrejected) {
        var _this = this;
        return new MyPromise(function (onFulfilledNext, onRejectedNext) {
            var fulfilled = function (value) {
                try {
                    if (!isFunction(onfulfilled)) {
                        onFulfilledNext(value);
                    }
                    else {
                        var res = onfulfilled(value);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        }
                        else {
                            onFulfilledNext(res);
                        }
                    }
                }
                catch (error) {
                    onRejectedNext(error);
                }
            };
            var rejected = function (reason) {
                try {
                    if (!isFunction(onrejected)) {
                        onRejectedNext(reason);
                    }
                    else {
                        var res = onrejected(reason);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        }
                        else {
                            onfulfilled(res);
                        }
                    }
                }
                catch (error) {
                    onRejectedNext(error);
                }
            };
            switch (_this.status) {
                case 'pending':
                    _this._fulfilledQueues.push(fulfilled);
                    _this._rejectedQueues.push(rejected);
                    break;
                case 'fulfilled':
                    fulfilled(_this.value);
                    break;
                case 'rejected':
                    rejected(_this.reason);
                    break;
                default:
                    break;
            }
        });
    };
    MyPromise.prototype.catch = function (onrejected) {
        return this.then(undefined, onrejected);
    };
    MyPromise.prototype.finally = function (cb) {
        return this.then(function (value) { return MyPromise.resolve(cb()).then(function () { return value; }); }, function (reason) { return MyPromise.resolve(cb()).then(function () { throw reason; }); });
    };
    MyPromise.resolve = function (value) {
        if (value instanceof MyPromise)
            return value;
        return new MyPromise(function (resolve) {
            resolve(value);
        });
    };
    MyPromise.reject = function (value) {
        return new MyPromise(function (resolve, reject) {
            reject(value);
        });
    };
    MyPromise.all = function (list) {
        var _this = this;
        return new MyPromise(function (resolve, reject) {
            var e_1, _a;
            var values = [];
            var count = 0;
            var _loop_1 = function (i, p) {
                _this.resolve(p).then(function (res) {
                    values[i] = res;
                    count++;
                    if (count === list.length)
                        resolve(values);
                }, function (err) {
                    reject(err);
                });
            };
            try {
                for (var _b = __values(list.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), i = _d[0], p = _d[1];
                    _loop_1(i, p);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    };
    MyPromise.race = function (list) {
        var _this = this;
        return new MyPromise(function (resolve, reject) {
            var e_2, _a;
            try {
                for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                    var p = list_1_1.value;
                    _this.resolve(p).then(function (res) {
                        resolve(res);
                    }, function (err) {
                        reject(err);
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    };
    return MyPromise;
}());
var bbb = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        resolve(123213123);
    }, 2000);
});
bbb.then(function (res) {
    console.log('catch', res);
});
