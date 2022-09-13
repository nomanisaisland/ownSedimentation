import { lzw_compress, p_btoa, lzw_decompress, p_atob } from "./bcompress";
import { gzip, ungzip, } from "./pako";
var ZxkjCode = (function () {
    function ZxkjCode() {
    }
    ZxkjCode.codeTypeDefault = "zxkjcodegz";
    ZxkjCode.encode = function (data, codeType) {
        codeType || (codeType = ZxkjCode.codeTypeDefault);
        var codeCode = codeType === "zxkjcodefmt" ?
            JSON.stringify(data, undefined, 2) || "" :
            codeType === "zxkjcodelzw" ?
                lzw_compress(JSON.stringify(data) || "") :
                codeType === "zxkjcodeub64" ?
                    p_btoa(encodeURIComponent(JSON.stringify(data) || "")) :
                    codeType === "zxkjcodegz" ?
                        p_btoa(encodeURIComponent(gzip(JSON.stringify(data) || "", { to: "string" }))) :
                        JSON.stringify(data) || "";
        var code = codeType + ":" + codeCode;
        return code;
    };
    ZxkjCode.decode = function (code) {
        code = String(code || "").trim();
        var match = code.match(/^(\w+)\:/);
        var codeType = String((match === null || match === void 0 ? void 0 : match[1]) || "");
        var codeCode = !!codeType ? code.substr((codeType === null || codeType === void 0 ? void 0 : codeType.length) + 1) : code;
        if (!codeCode) {
            return [];
        }
        if (codeType == "zxkjcodelzw") {
            codeCode = lzw_decompress(codeCode);
        }
        if (codeType == "zxkjcodeub64") {
            codeCode = decodeURIComponent(p_atob(codeCode));
        }
        if (codeType == "zxkjcodegz") {
            codeCode = ungzip(decodeURIComponent(p_atob(codeCode)), { to: "string", });
        }
        var jso = JSON.parse(codeCode || "[]");
        return jso;
    };
    ZxkjCode.decodeArray = function (code) {
        try {
            var data = ZxkjCode.decode(code);
            if (!data) {
                data = [];
            }
            if (!Array.isArray(data)) {
                data = [data];
            }
            return data;
        }
        catch (error) {
            return [];
        }
    };
    return ZxkjCode;
}());
export { ZxkjCode };
