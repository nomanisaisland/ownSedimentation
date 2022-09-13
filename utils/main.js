var Startup = (function () {
    function Startup() {
    }
    Startup.main = function () {
        var args = process.argv;
        args.splice(0, 2);
        console.log(args);
        return 0;
    };
    return Startup;
}());
Startup.main();
