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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var CreateAnimate = (function () {
    function CreateAnimate(options) {
        if (options) {
            this.options = options;
        }
        else {
            this.options = {
                transformOrigin: "top right",
                duration: 3000,
                timeFunction: "ease-in-out",
                delay: 100,
            };
        }
        this.animationTank = [];
        this.animationStep = [];
        this.index = 0;
    }
    CreateAnimate.prototype.opacity = function (param) {
        this.animationTank.push({
            name: "opacity",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.backgroundColor = function (param) {
        this.animationTank.push({
            name: "backgroundColor",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.width = function (param) {
        this.animationTank.push({
            name: "width",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.height = function (param) {
        this.animationTank.push({
            name: "height",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.top = function (param) {
        this.animationTank.push({
            name: "top",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.left = function (param) {
        this.animationTank.push({
            name: "left",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.bottom = function (param) {
        this.animationTank.push({
            name: "bottom",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.right = function (param) {
        this.animationTank.push({
            name: "right",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.rotate = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.rotateX = function (param) {
        this.animationTank.push({
            owner: 'transform',
            name: 'rotate',
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.rotateY = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.rotateZ = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.rotate3d = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.scale = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.scaleX = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.scaleY = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.scaleZ = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.scale3d = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.translate = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.translateX = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.translateY = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.translateZ = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.translate3d = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.skew = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.skewX = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.skewY = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.matrix = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.matrix3d = function (param) {
        this.animationTank.push({
            name: "rotate",
            val: param
        });
        return this;
    };
    CreateAnimate.prototype.step = function () {
        var stepOptions = __spreadArray([], __read(this.animationTank), false);
        this.animationTank = [];
        var attr = {};
        stepOptions.forEach(function (item) {
            if (item.owner) {
                attr[item.owner] = item.name + "('" + item.val + "')";
            }
            else {
                attr[item.name] = "" + item.val;
            }
        });
        this.animationStep.push({
            num: this.index,
            attribute: attr
        });
    };
    CreateAnimate.prototype.export = function (config) {
        var animationConfig = config ? config : this.options;
        this.animationStep.forEach(function (item) {
            console.log(item);
        });
        return this.animationStep[0].attribute;
    };
    CreateAnimate.prototype.ticker = function (fn, config) {
        var _this = this;
        var ticker = setTimeout(function () {
            fn();
            if (config === null || config === void 0 ? void 0 : config.loop) {
                _this.ticker(fn, config);
            }
            clearTimeout(ticker);
        }, (config === null || config === void 0 ? void 0 : config.duration) ? config === null || config === void 0 ? void 0 : config.duration : 1000);
    };
    return CreateAnimate;
}());
export { CreateAnimate };
