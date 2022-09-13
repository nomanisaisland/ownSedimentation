function Binary(initData, p, l, bl) {

  var data = initData && initData.constructor == Array ? initData.slice() : [];
  p = p | 0;
  l = l | 0;
  bl = Math.max((bl || 8) | 0, 1);
  var mask = m(bl);
  var _m = 0xFFFFFFFF; //数据，指针，长度，位长度，遮罩

  this.data = function (index, value) {
    if (!isNaN(value))
      data[index] = (value | 0) || 0;
    if (!isNaN(index))
      return data[index];
    else
      return data.slice();
  };

  this.read = function () {
    var re;
    if (p >= l)
      return 0;
    if (32 - (p % 32) < bl) {
      re = (((data[p >> 5] & m(32 - (p % 32))) << ((p + bl) % 32)) | (data[(p >> 5) + 1] >>> (32 - ((p + bl) % 32)))) & mask;
    } else {
      re = (data[p >> 5] >>> (32 - (p + bl) % 32)) & mask;
    }
    p += bl;
    return re;
  };

  this.write = function (i) {
    var i, hi, li;
    i &= mask;
    if (32 - (l % 32) < bl) {
      data[l >> 5] |= i >>> (bl - (32 - (l % 32)));
      data[(l >> 5) + 1] |= (i << (32 - ((l + bl) % 32))) & _m;
    } else {
      data[l >> 5] |= (i << (32 - ((l + bl) % 32))) & _m;
    }
    l += bl;
  };

  this.eof = function () {
    return p >= l;
  };

  this.reset = function () {
    p = 0;
    mask = m(bl);
  };
  this.resetAll = function () {
    data = [];
    p = 0;
    l = 0;
    bl = 8;
    mask = m(bl);
    _m = 0xFFFFFFFF;
  };

  this.setBitLength = function (len) {
    bl = Math.max(len | 0, 1);
    mask = m(bl);
  };

  this.toHexString = function () {
    var re = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i] < 0) {
        re.push(pad((data[i] >>> 16).toString(16), 4) + pad((data[i] & 0xFFFF).toString(16), 4));
      } else {
        re.push(pad(data[i].toString(16), 8));
      }
    }
    return re.join("");
  };

  this.toBinaryString = function () {
    var re = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i] < 0) {
        re.push(pad((data[i] >>> 1).toString(2), 31) + (data[i] & 1));
      } else {
        re.push(pad(data[i].toString(2), 32));
      }
    }
    return re.join("").substring(0, l);
  };

  this.toCString = function () {
    var _p = p,
      _bl = bl,
      re = [];
    this.setBitLength(13);
    this.reset();
    while (p < l)
      re.push(C(this.read()));
    this.setBitLength(_bl);
    p = _p;
    return C(l >>> 13) + C(l & m(13)) + re.join("");
  };

  this.fromCString = function (str) {
    this.resetAll();
    this.setBitLength(13);
    for (var i = 2; i < str.length; i++)
      this.write(D(str, i));
    l = (D(str, 0) << 13) | (D(str, 1) & m(13));
    return this;
  };

  this.clone = function () {
    return new Binary(data, p, l, bl);
  };
  function m(len) {
    return (1 << len) - 1;
  }
  function pad(s, len) {
    return (new Array(len + 1)).join("0").substring(s.length) + s;
  }
  function C(i) {
    return String.fromCharCode(i + 0x4e00);
  }
  function D(s, i) {
    return s.charCodeAt(i) - 0x4e00;
  }
}

export function lzw_compress(str) {
  var b = new Binary(),
    code_index = -1,
    char_len = 8;
  var str = str.replace(/[\u0100-\uFFFF]/g,
    function (s) {
      return "\&\#u" + pad(s.charCodeAt(0).toString(16), 4) + ";";
    });
  var dic = {},
    cp = [],
    cpi,
    bl = 8;
  b.setBitLength(bl);
  for (var i = 0; i < (1 << char_len) + 2; i++)
    dic[i] = ++code_index;
  cp[0] = str.charCodeAt(0);
  for (var i = 1; i < str.length; i++) {
    cp[1] = str.charCodeAt(i);
    cpi = (cp[0] << 16) | cp[1];
    if (dic[cpi] == undefined) {
      dic[cpi] = (++code_index);
      if (cp[0] > m(bl)) {
        b.write(0x80);
        b.setBitLength(++bl);
      }
      b.write(cp[0]);
      cp[0] = cp[1];
    } else {
      cp[0] = dic[cpi];
    }
  }
  b.write(cp[0]);
  function pad(s, len) {
    return (new Array(len + 1)).join("0").substring(s.length) + s;
  }
  function m(len) {
    return (1 << len) - 1;
  }
  return b.toCString();
}

export function lzw_decompress(s) {
  var b = new function () {
    var d = [],
      p = 0,
      l = 0,
      L = 13,
      k = m(L),
      _m = 0xFFFFFFFF;
    this.r = function () {
      var r;
      if (32 - (p % 32) < L)
        r = (((d[p >> 5] & m(32 - (p % 32))) << ((p + L) % 32)) | (d[(p >> 5) + 1] >>> (32 - ((p + L) % 32)))) & k;
      else
        r = (d[p >> 5] >>> (32 - (p + L) % 32)) & k;
      p += L;
      return r;
    };
    this.w = function (i) {
      i &= k;
      if (32 - (l % 32) < L) {
        d[l >> 5] |= i >>> (L - (32 - (l % 32)));
        d[(l >> 5) + 1] |= (i << (32 - ((l + L) % 32))) & _m;
      } else
        d[l >> 5] |= (i << (32 - ((l + L) % 32))) & _m;
      l += L;
    };
    this.e = function () {
      return p >= l;
    };
    this.l = function (len) {
      L = Math.max(len | 0, 1);
      k = m(L);
    };
    function m(len) {
      return (1 << len) - 1;
    }
    function pad(s, l) {
      return (new Array(l + 1)).join("0").substring(s.length) + s;
    }
    for (var i = 2; i < s.length; i++)
      this.w(s.charCodeAt(i) - 0x4e00);
    l = ((s.charCodeAt(0) - 0x4e00) << 13) | ((s.charCodeAt(1) - 0x4e00) & m(13));
    p = 0;
  };
  var R = [],
    C = -1,
    D = {},
    P = [],
    L = 8;
  for (let i = 0; i < (1 << L) + 2; i++)
    D[i] = String.fromCharCode(++C);
  b.l(L);
  P[0] = b.r();
  while (!b.e()) {
    P[1] = b.r();
    if (P[1] == 0x80) {
      b.l(++L);
      P[1] = b.r();
    }
    if (D[P[1]] == undefined)
      D[++C] = D[P[0]] + D[P[0]].charAt(0);
    else
      D[++C] = D[P[0]] + D[P[1]].charAt(0);
    R.push(D[P[0]]);
    P[0] = P[1];
  }
  R.push(D[P[0]]);
  return R.join("").replace(/\&\#u[0-9a-fA-F]{4};/g,
    function (w) {
      return String.fromCharCode(parseInt(w.substring(3, 7), 16));
    });
}
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

export function p_btoa(string) {
  string = String(string);
  var bitmap, a, b, c,
    result = "",
    i = 0,
    rest = string.length % 3; // To determine the final padding

  for (; i < string.length;) {
    if ((a = string.charCodeAt(i++)) > 255 ||
      (b = string.charCodeAt(i++)) > 255 ||
      (c = string.charCodeAt(i++)) > 255)
      throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");

    bitmap = (a << 16) | (b << 8) | c;
    result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
      b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
  }

  // If there's need of padding, replace the last 'A's with equal signs
  return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
}
;
export function p_atob(string) {
  // atob can work with strings with whitespaces, even inside the encoded part,
  // but only \t, \n, \f, \r and ' ', which can be stripped.
  string = String(string).replace(/[\t\n\f\r ]+/g, "");
  if (!b64re.test(string))
    throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");

  // Adding the padding if missing, for semplicity
  string += "==".slice(2 - (string.length & 3));
  var bitmap, result = "",
    r1, r2, i = 0;
  for (; i < string.length;) {
    bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
      (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

    result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
        String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
  }
  return result;
}
