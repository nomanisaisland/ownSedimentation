import { lzw_compress, p_btoa, lzw_decompress, p_atob } from "./bcompress";
import { gzip, ungzip, } from "./pako";

export class ZxkjCode {

  /**
   * 默认编码格式
   */
  static codeTypeDefault: ZxkjCodeType = "zxkjcodegz";

  /**
   * 编码
   */
  static encode = function (
    data: any,
    codeType?: ZxkjCodeType | string,
  ) {
    codeType || (codeType = ZxkjCode.codeTypeDefault);

    const codeCode =

      codeType === "zxkjcodefmt" ?
        JSON.stringify(data, undefined, 2) || "" :

        codeType === "zxkjcodelzw" ?
          lzw_compress(JSON.stringify(data) || "") :

          codeType === "zxkjcodeub64" ?
            p_btoa(encodeURIComponent(JSON.stringify(data) || "")) :

            codeType === "zxkjcodegz" ?
              p_btoa(encodeURIComponent(gzip(JSON.stringify(data) || "", { to: "string" }))) :

              JSON.stringify(data) || "";

    const code = `${codeType}:${codeCode}`;
    return code;
  }

  /**
   * 解码
   */
  static decode = function (
    code: string
  ) {
    code = String(code || "").trim();
    const match = code.match(/^(\w+)\:/);
    const codeType = String(match?.[1] || "") as ZxkjCodeType;
    let codeCode = !!codeType ? code.substr(codeType?.length + 1) : code;
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
    const jso = JSON.parse(codeCode || "[]");
    return jso;
  }

  /**
   * 解码成数组，如果内容不是数组则放入数组中
   */
  static decodeArray = function (code: string): any[] {
    try {
      let data = ZxkjCode.decode(code);
      if (!data) {
        data = [];
      }
      if (!Array.isArray(data)) {
        data = [data];
      }
      return data;
    } catch (error) {
      return [];
    }
  }

}



export type ZxkjCodeType =
  //格式化 json 格式
  "zxkjcodefmt" |
  //明文 json 格式
  "zxkjcodejson" |
  //字节码 base64 格式
  "zxkjcodeub64" |
  //压缩码 gzip 格式
  "zxkjcodegz" |
  //中文乱码压缩 格式
  "zxkjcodelzw";
