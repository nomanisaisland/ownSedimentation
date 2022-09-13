var EventListener = (function () {
    function EventListener(app, self) {
        this.eventBus = [];
        this.idx = 0;
        app.stage.interactive = true;
        this.app = app;
        this.self = self;
    }
    EventListener.prototype.add = function (sprite, event, fn, context) {
        sprite.interactive = true;
        this.idx++;
        var random = "" + Date.now() + Math.floor(Math.random() * 1000);
        var spriteEvent = {
            id: random,
            idx: this.idx,
            touch: true,
            sprite: sprite,
            eventName: event
        };
        var realPos = this.getRealPos(sprite.parent, {
            x: sprite.x,
            y: sprite.y
        });
        var realRange = {
            x: realPos.x,
            y: realPos.y,
            x2: realPos.x + sprite.width,
            y2: realPos.y + sprite.height
        };
        this.eventBus.push(spriteEvent);
        switch (event) {
            case 'tap':
                break;
            case 'longTap':
                this.longTap(sprite, fn, realRange, context);
                break;
            case 'scroll':
                this.scroll(sprite, fn, realRange, context);
                break;
            case 'touchstart':
                break;
            case 'touchmove':
                break;
            case 'touchend':
                break;
            case 'touchout':
                break;
            default:
                break;
        }
    };
    EventListener.prototype.getRealPos = function (parent, size) {
        if (!parent) {
            return size;
        }
        var realSize = {
            x: size.x + parent.x,
            y: size.y + parent.y
        };
        if (!parent.parent) {
            return realSize;
        }
        else {
            return this.getRealPos(parent.parent, realSize);
        }
    };
    EventListener.prototype.longTap = function (sprite, fn, realRange, context) {
        var timer = null;
        var moveStart = false;
        var touchStartTimeStamp = 0;
        var moveNum = 0;
        var startNum = 0;
        sprite.on("touchstart", function (e) {
            startNum++;
            touchStartTimeStamp = Date.now();
            timer = setTimeout(function () {
                fn(e, "longTap");
                moveStart = true;
                clearTimeout(timer);
            }, 1200);
        });
        sprite.on("touchmove", function (e) {
            moveNum++;
            var stopStamp = Date.now() - touchStartTimeStamp;
            if (stopStamp > 800 && touchStartTimeStamp !== 0 && moveNum > 50) {
                moveNum = 0;
                startNum = 0;
                touchStartTimeStamp = 0;
                clearTimeout(timer);
            }
            if (!moveStart)
                return;
            fn(e, "touchmove");
        });
        this.app.stage.on("touchend", function (e) {
            moveNum = 0;
            startNum = 0;
            touchStartTimeStamp = 0;
            if (!!timer) {
                clearTimeout(timer);
            }
            timer = null;
            if (!moveStart)
                return;
            fn(e, "touchend");
            moveStart = false;
        });
    };
    EventListener.prototype.scroll = function (sprite, fn, realRange, context) {
        var _this = this;
        var eventState = true;
        var mutilFingerState;
        var options = {
            finger1X: 0,
            finger1Y: 0,
            finger2X: 0,
            finger2Y: 0,
            pageX: 0,
            pageY: 0,
            startX: 0,
            startY: 0,
            offsetX: 0,
            offsetY: 0,
            lastFingerSpace: 0,
            originFigerSpace: null,
            desc: "nofinger",
            type: "init",
            scale: 1,
            pageCenterX: 0,
            pageCenterY: 0
        };
        this.app.stage.on("touchstart", function (e) {
            var _a = e.data, global = _a.global, originalEvent = _a.originalEvent;
            var touches = originalEvent.touches, changedTouches = originalEvent.changedTouches;
            if (!options.pageX && !options.pageY) {
                options.pageX = touches[0].x || touches[0].pageX;
                options.pageY = touches[0].y || touches[0].pageY;
                return;
            }
        });
        this.app.stage.on("touchmove", function (e) {
            var _a = e.data, global = _a.global, originalEvent = _a.originalEvent;
            var touches = originalEvent.touches, changedTouches = originalEvent.changedTouches;
            delete options.finger1X;
            delete options.finger1Y;
            delete options.finger2X;
            delete options.finger2Y;
            if (!options.pageX && !options.pageY) {
                options.pageX = touches[0].x || touches[0].pageX;
                options.pageY = touches[0].y || touches[0].pageY;
                return;
            }
            options.offsetX = (touches[0].x || touches[0].pageX) - options.pageX;
            options.offsetY = (touches[0].y || touches[0].pageY) - options.pageY;
            options.pageX = touches[0].x || touches[0].pageX;
            options.pageY = touches[0].y || touches[0].pageY;
            options.type = "translate";
            options.desc = "单指移动";
            fn(options);
        });
        this.app.stage.on("touchend", function (e) {
            var _a = e.data, global = _a.global, originalEvent = _a.originalEvent;
            var touches = originalEvent.touches, changedTouches = originalEvent.changedTouches;
            if (touches.length == 0 && (mutilFingerState == 'twoFinger' || mutilFingerState == 'oneFinger'))
                mutilFingerState = 'init';
            if (_this.systemInfo.platform == 'ios' || _this.systemInfo.platform == 'IOS' || _this.systemInfo.platform == 'iOS') {
                mutilFingerState = 'init';
            }
            options.lastFingerSpace = 0;
            options.finger1X = 0;
            options.finger1Y = 0;
            options.finger2X = 0;
            options.finger2Y = 0;
            options.pageX = 0;
            options.pageY = 0;
            options.originFigerSpace = 0;
            options.desc = "nofinger";
            options.type = "init";
        });
        this.app.stage.on("touchendoutside", function (e) {
            var _a = e.data, global = _a.global, originalEvent = _a.originalEvent;
            var touches = originalEvent.touches, changedTouches = originalEvent.changedTouches;
            if (touches.length == 0 && (mutilFingerState == 'twoFinger' || mutilFingerState == 'oneFinger'))
                mutilFingerState = 'init';
            if (_this.systemInfo.platform == 'ios' || _this.systemInfo.platform == 'IOS' || _this.systemInfo.platform == 'iOS') {
                mutilFingerState = 'init';
            }
            options.lastFingerSpace = 0;
            options.finger1X = 0;
            options.finger1Y = 0;
            options.finger2X = 0;
            options.finger2Y = 0;
            options.pageX = 0;
            options.pageY = 0;
            options.originFigerSpace = 0;
            options.desc = "nofinger";
            options.type = "init";
        });
    };
    return EventListener;
}());
export default EventListener;
