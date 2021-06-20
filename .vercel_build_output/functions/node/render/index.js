var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if (val[0] == '"') {
          val = val.slice(1, -1);
        }
        if (obj[key] == void 0) {
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        return fulfil(data);
      }
      const encoding = h["content-encoding"] || "utf-8";
      fulfil(new TextDecoder(encoding).decode(data));
    });
  });
}

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}<\/script>` : `<script type="svelte-data" url="${url}">${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const { name, message, stack } = error3;
    serialized = try_serialize({ name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error3 };
    }
    return { status, error: error3 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base2, path) {
  const baseparts = path[0] === "/" ? [] : base2.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = { ...opts.headers };
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error3 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error3 } = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({ ...request, params });
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let { status = 200, body, headers = {} } = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = { ...headers, "content-type": "application/json" };
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return { status, body: normalized_body, headers };
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const [type, ...directives] = headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: null,
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
var tasks = new Set();
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// .svelte-kit/output/server/app.js
var import_cookie = __toModule(require_cookie());

// node_modules/@lukeed/uuid/dist/index.mjs
var IDX = 256;
var HEX = [];
var BUFFER;
while (IDX--)
  HEX[IDX] = (IDX + 256).toString(16).substring(1);
function v4() {
  var i = 0, num, out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array(i = 256);
    while (i--)
      BUFFER[i] = 256 * Math.random() | 0;
    i = IDX = 0;
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6)
      out += HEX[num & 15 | 64];
    else if (i == 8)
      out += HEX[num & 63 | 128];
    else
      out += HEX[num];
    if (i & 1 && i > 1 && i < 11)
      out += "-";
  }
  IDX++;
  return out;
}

// .svelte-kit/output/server/app.js
var css$4 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$4);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var handle = async ({ request, resolve: resolve2 }) => {
  const cookies = import_cookie.default.parse(request.headers.cookie || "");
  request.locals.userid = cookies.userid || v4();
  if (request.query.has("_method")) {
    request.method = request.query.get("_method").toUpperCase();
  }
  const response = await resolve2(request);
  if (!cookies.userid) {
    response.headers["set-cookie"] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
  }
  return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n	<meta charset="utf-8" />\n	<link rel="icon" href="./favicon.png" />\n	<meta name="viewport" content="width=device-width, initial-scale=1" />\n	<link rel="preconnect" href="https://fonts.gstatic.com">\n	<link\n		href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"\n		rel="stylesheet">\n\n	' + head + '\n</head>\n\n<body>\n	<div id="svelte">' + body + "</div>\n</body>\n\n</html>";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-c4499d44.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-c4499d44.js", "/./_app/chunks/vendor-6efa7450.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{ "file": "background.png", "size": 1630382, "type": "image/png" }, { "file": "beeldtaal-bg.png", "size": 2269214, "type": "image/png" }, { "file": "beeldtaal-cut.png", "size": 2663361, "type": "image/png" }, { "file": "beeldtaal-kill.png", "size": 1232204, "type": "image/png" }, { "file": "beeldtaal-spiegel.png", "size": 1546745, "type": "image/png" }, { "file": "beeldtaal-throw.png", "size": 1330359, "type": "image/png" }, { "file": "beeldtaal.png", "size": 2143217, "type": "image/png" }, { "file": "beeldtaalopdr1.pdf", "size": 1671489, "type": "application/pdf" }, { "file": "beeldtaalopdr2.pdf", "size": 616198, "type": "application/pdf" }, { "file": "beeldtaalopdr3.pdf", "size": 1495734, "type": "application/pdf" }, { "file": "favicon.png", "size": 4610, "type": "image/png" }, { "file": "generativeart-bg.png", "size": 210113, "type": "image/png" }, { "file": "gridenkleur-bg.png", "size": 1991184, "type": "image/png" }, { "file": "gridenkleur.pdf", "size": 11596305, "type": "application/pdf" }, { "file": "interfaceenbeweging-bg.png", "size": 413268, "type": "image/png" }, { "file": "interfaceenbeweging.pdf", "size": 8581567, "type": "application/pdf" }, { "file": "linkedin.png", "size": 5953, "type": "image/png" }, { "file": "mail.png", "size": 25856, "type": "image/png" }, { "file": "mail.svg", "size": 3359, "type": "image/svg+xml" }, { "file": "menu.svg", "size": 899, "type": "image/svg+xml" }, { "file": "mike.png", "size": 482440, "type": "image/png" }, { "file": "ontwerpen1-bg.png", "size": 1318768, "type": "image/png" }, { "file": "ontwerpen2-bg.png", "size": 211635, "type": "image/png" }, { "file": "pechakucha-bg.png", "size": 1498221, "type": "image/png" }, { "file": "pechakucha.pdf", "size": 5958910, "type": "application/pdf" }, { "file": "robots.txt", "size": 67, "type": "text/plain" }, { "file": "svelte-welcome.png", "size": 360807, "type": "image/png" }, { "file": "svelte-welcome.webp", "size": 115470, "type": "image/webp" }, { "file": "typografie-bg.png", "size": 2551345, "type": "image/png" }, { "file": "typografiedras.pdf", "size": 2014227, "type": "application/pdf" }, { "file": "typografiefont.pdf", "size": 8130728, "type": "application/pdf" }, { "file": "webtypografie-bg.png", "size": 402411, "type": "image/png" }, { "file": "webtypografie.pdf", "size": 124606, "type": "application/pdf" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/minor\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/minor.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/todos\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index_json;
      })
    },
    {
      type: "page",
      pattern: /^\/todos\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/todos/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/todos\/([^/]+?)\.json$/,
      params: (m) => ({ uid: d(m[1]) }),
      load: () => Promise.resolve().then(function() {
        return _uid__json;
      })
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/about.svelte": () => Promise.resolve().then(function() {
    return about;
  }),
  "src/routes/minor.svelte": () => Promise.resolve().then(function() {
    return minor;
  }),
  "src/routes/todos/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-51bc7c75.js", "css": ["/./_app/assets/pages/__layout.svelte-c17037d5.css"], "js": ["/./_app/pages/__layout.svelte-51bc7c75.js", "/./_app/chunks/vendor-6efa7450.js"], "styles": null }, ".svelte-kit/build/components/error.svelte": { "entry": "/./_app/error.svelte-6426fd12.js", "css": [], "js": ["/./_app/error.svelte-6426fd12.js", "/./_app/chunks/vendor-6efa7450.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-8cfc7ce2.js", "css": [], "js": ["/./_app/pages/index.svelte-8cfc7ce2.js", "/./_app/chunks/vendor-6efa7450.js"], "styles": null }, "src/routes/about.svelte": { "entry": "/./_app/pages/about.svelte-d6e2aa45.js", "css": [], "js": ["/./_app/pages/about.svelte-d6e2aa45.js", "/./_app/chunks/vendor-6efa7450.js"], "styles": null }, "src/routes/minor.svelte": { "entry": "/./_app/pages/minor.svelte-8eaa0917.js", "css": ["/./_app/assets/pages/minor.svelte-2a51edd7.css"], "js": ["/./_app/pages/minor.svelte-8eaa0917.js", "/./_app/chunks/vendor-6efa7450.js"], "styles": null }, "src/routes/todos/index.svelte": { "entry": "/./_app/pages/todos/index.svelte-92047c3e.js", "css": ["/./_app/assets/pages/todos/index.svelte-ef0435f2.css"], "js": ["/./_app/pages/todos/index.svelte-92047c3e.js", "/./_app/chunks/vendor-6efa7450.js"], "styles": null } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({ paths: { "base": "", "assets": "/." } });
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var base = "https://api.svelte.dev";
async function api(request, resource, data) {
  if (!request.locals.userid) {
    return { status: 401 };
  }
  const res = await fetch(`${base}/${resource}`, {
    method: request.method,
    headers: {
      "content-type": "application/json"
    },
    body: data && JSON.stringify(data)
  });
  if (res.ok && request.method !== "GET" && request.headers.accept !== "application/json") {
    return {
      status: 303,
      headers: {
        location: "/todos"
      }
    };
  }
  return {
    status: res.status,
    body: await res.json()
  };
}
var get = async (request) => {
  const response = await api(request, `todos/${request.locals.userid}`);
  if (response.status === 404) {
    return { body: [] };
  }
  return response;
};
var post = async (request) => {
  const response = await api(request, `todos/${request.locals.userid}`, {
    text: request.body.get("text")
  });
  return response;
};
var index_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get,
  post
});
var patch = async (request) => {
  return api(request, `todos/${request.locals.userid}/${request.params.uid}`, {
    text: request.body.get("text"),
    done: request.body.has("done") ? !!request.body.get("done") : void 0
  });
};
var del = async (request) => {
  return api(request, `todos/${request.locals.userid}/${request.params.uid}`);
};
var _uid__json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  patch,
  del
});
var css$3 = {
  code: "header.svelte-nynint{position:fixed;top:0;z-index:5}ul.svelte-nynint{opacity:0%;transition:ease all 0.3s;transform:translateX(100%)}.menu-open ul{opacity:100%;transform:translateX(0)}li.svelte-nynint{list-style:none;padding:1rem;margin:1.5rem 0rem;background-color:var(--white-color);-webkit-box-shadow:0px 0px 10px rgba(0, 0, 0, .5);box-shadow:0px 0px 10px 1px rgba(0, 0, 0, .5);transition:ease 0.3s}li.svelte-nynint:hover{background-color:var(--main-color)}a.svelte-nynint{text-decoration:none;color:var(--black-color)}nav.svelte-nynint{position:fixed;top:1rem;right:0}.menu-icon.svelte-nynint{fill:var(--white-color);width:2rem;height:auto;position:fixed;top:1rem;right:1rem}@media only screen and (min-width: 48rem){.menu-icon.svelte-nynint{display:none}ul.svelte-nynint{opacity:100%;transform:translateX(0)}}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\n\\timport { page } from '$app/stores';\\n\\n\\tfunction menuOpen() {\\n\\t\\tdocument.querySelector(\\".nav-open\\").classList.toggle(\\"menu-open\\")\\n\\t};\\n<\/script>\\n\\n<header>\\n\\t<nav class=\\"nav-open\\">\\n\\t\\t<svg on:click={menuOpen} version=\\"1.1\\" class=\\"menu-icon\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" x=\\"0px\\" y=\\"0px\\"\\n\\t\\t\\t viewBox=\\"0 0 131.1 102\\" style=\\"enable-background:new 0 0 131.1 102;\\" xml:space=\\"preserve\\">\\n\\t\\t<path class=\\"st0\\" style=\\"filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));\\" d=\\"M125.4,11.4l-119.7,0C2.6,11.4,0,8.9,0,5.7l0,0C0,2.6,2.6,0,5.7,0l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0\\n\\t\\t\\tC131.1,8.9,128.6,11.4,125.4,11.4z\\"/>\\n\\t\\t<path class=\\"st0\\" style=\\"filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));\\" d=\\"M125.4,56.7l-119.7,0C2.6,56.7,0,54.2,0,51l0,0c0-3.2,2.6-5.7,5.7-5.7l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0\\n\\t\\t\\tC131.1,54.2,128.6,56.7,125.4,56.7z\\"/>\\n\\t\\t<path class=\\"st0\\" style=\\"filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));\\" d=\\"M125.4,102L5.7,102C2.6,102,0,99.5,0,96.3l0,0c0-3.2,2.6-5.7,5.7-5.7l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0\\n\\t\\t\\tC131.1,99.5,128.6,102,125.4,102z\\"/>\\n\\t\\t</svg>\\n\\t\\t\\n\\n\\t\\t<ul>\\n\\t\\t\\t<li><a href=\\"#aboutme\\">Over mij</a></li>\\n\\t\\t\\t<li><a href=\\"#beeldtaal\\">Beeldtaal</a></li>\\n\\t\\t\\t<li><a href=\\"#typografie\\">Typografie</a></li>\\n\\t\\t\\t<li><a href=\\"#vormgeving\\">Vormgeving</a></li>\\n\\t\\t\\t<li><a href=\\"#webtypografie\\">Webtypografie</a></li>\\n\\t\\t\\t<li><a href=\\"#pechakucha\\">Pecha kucha</a></li>\\n\\t\\t\\t<li><a href=\\"#ontwerpen1\\">Ontwerpen 1</a></li>\\n\\t\\t\\t<li><a href=\\"#generativeart\\">Generative Art</a></li>\\n\\t\\t\\t<li><a href=\\"#interfaceenbeweging\\">Interface & Beweging</a></li>\\n\\t\\t\\t<li><a href=\\"#ontwerpen2\\">Ontwerpen 2</a></li>\\t\\n\\t\\t</ul>\\n\\t</nav>\\n</header>\\n\\n<style>\\n\\theader {\\n\\t\\tposition: fixed;\\n\\t\\ttop: 0;\\n\\t\\tz-index: 5;\\n\\t}\\n\\n\\tul {\\n\\t\\topacity: 0%;\\n\\t\\ttransition: ease all 0.3s;\\n\\t\\ttransform: translateX(100%);\\n\\t}\\n\\n\\t:global(.menu-open ul) {\\n\\t\\topacity: 100%;\\n\\t\\t\\n\\t\\ttransform: translateX(0);\\n\\t}\\n\\n\\tli {\\n\\t\\tlist-style: none;\\n\\n\\t\\tpadding: 1rem;\\n\\t\\tmargin: 1.5rem 0rem;\\n\\n\\t\\tbackground-color: var(--white-color);\\n\\t\\t-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, .5); \\n\\t\\tbox-shadow: 0px 0px 10px 1px rgba(0, 0, 0, .5);\\n\\t\\ttransition: ease 0.3s;\\n\\t}\\n\\n\\tli:hover {\\n\\t\\tbackground-color: var(--main-color);\\n\\t}\\n\\n\\ta {\\n\\t\\ttext-decoration: none;\\n\\t\\tcolor: var(--black-color);\\n\\t}\\n\\n\\tnav {\\n\\t\\tposition: fixed;\\n\\t\\ttop: 1rem;\\n\\t\\tright: 0;\\n\\t}\\n\\n\\t.menu-icon {\\n\\t\\tfill: var(--white-color);\\n\\t\\twidth: 2rem;\\n\\t\\theight: auto;\\n\\t\\tposition: fixed;\\n\\t\\ttop: 1rem;\\n\\t\\tright: 1rem;\\n\\t}\\n\\n\\n\\t@media only screen and (min-width: 48rem) {\\n\\t\\t.menu-icon {\\n\\t\\t\\tdisplay: none;\\n\\t\\t}\\n\\n\\t\\tul {\\n\\t\\t\\topacity: 100%;\\n\\t\\t\\ttransform: translateX(0);\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAqCC,MAAM,cAAC,CAAC,AACP,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,CAAC,AACX,CAAC,AAED,EAAE,cAAC,CAAC,AACH,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CACzB,SAAS,CAAE,WAAW,IAAI,CAAC,AAC5B,CAAC,AAEO,aAAa,AAAE,CAAC,AACvB,OAAO,CAAE,IAAI,CAEb,SAAS,CAAE,WAAW,CAAC,CAAC,AACzB,CAAC,AAED,EAAE,cAAC,CAAC,AACH,UAAU,CAAE,IAAI,CAEhB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,MAAM,CAAC,IAAI,CAEnB,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAClD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAC9C,UAAU,CAAE,IAAI,CAAC,IAAI,AACtB,CAAC,AAED,gBAAE,MAAM,AAAC,CAAC,AACT,gBAAgB,CAAE,IAAI,YAAY,CAAC,AACpC,CAAC,AAED,CAAC,cAAC,CAAC,AACF,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,aAAa,CAAC,AAC1B,CAAC,AAED,GAAG,cAAC,CAAC,AACJ,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,CAAC,AACT,CAAC,AAED,UAAU,cAAC,CAAC,AACX,IAAI,CAAE,IAAI,aAAa,CAAC,CACxB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,AACZ,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1C,UAAU,cAAC,CAAC,AACX,OAAO,CAAE,IAAI,AACd,CAAC,AAED,EAAE,cAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,WAAW,CAAC,CAAC,AACzB,CAAC,AACF,CAAC"}`
};
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<header class="${"svelte-nynint"}"><nav class="${"nav-open svelte-nynint"}"><svg version="${"1.1"}" class="${"menu-icon svelte-nynint"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 131.1 102"}" style="${"enable-background:new 0 0 131.1 102;"}" xml:space="${"preserve"}"><path class="${"st0"}" style="${"filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));"}" d="${"M125.4,11.4l-119.7,0C2.6,11.4,0,8.9,0,5.7l0,0C0,2.6,2.6,0,5.7,0l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0\n			C131.1,8.9,128.6,11.4,125.4,11.4z"}"></path><path class="${"st0"}" style="${"filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));"}" d="${"M125.4,56.7l-119.7,0C2.6,56.7,0,54.2,0,51l0,0c0-3.2,2.6-5.7,5.7-5.7l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0\n			C131.1,54.2,128.6,56.7,125.4,56.7z"}"></path><path class="${"st0"}" style="${"filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));"}" d="${"M125.4,102L5.7,102C2.6,102,0,99.5,0,96.3l0,0c0-3.2,2.6-5.7,5.7-5.7l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0\n			C131.1,99.5,128.6,102,125.4,102z"}"></path></svg>
		

		<ul class="${"svelte-nynint"}"><li class="${"svelte-nynint"}"><a href="${"#aboutme"}" class="${"svelte-nynint"}">Over mij</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#beeldtaal"}" class="${"svelte-nynint"}">Beeldtaal</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#typografie"}" class="${"svelte-nynint"}">Typografie</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#vormgeving"}" class="${"svelte-nynint"}">Vormgeving</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#webtypografie"}" class="${"svelte-nynint"}">Webtypografie</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#pechakucha"}" class="${"svelte-nynint"}">Pecha kucha</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#ontwerpen1"}" class="${"svelte-nynint"}">Ontwerpen 1</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#generativeart"}" class="${"svelte-nynint"}">Generative Art</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#interfaceenbeweging"}" class="${"svelte-nynint"}">Interface &amp; Beweging</a></li>
			<li class="${"svelte-nynint"}"><a href="${"#ontwerpen2"}" class="${"svelte-nynint"}">Ontwerpen 2</a></li></ul></nav>
</header>`;
});
var css$2 = {
  code: "footer.svelte-tm3i52{padding:1.5rem;background-color:var(--black-color);text-align:center}p.svelte-tm3i52{color:var(--white-color);text-align:center}img.svelte-tm3i52{margin-top:1rem;width:2.5rem;height:auto;transition:ease 0.5s}img.svelte-tm3i52:hover{transform:rotate(360deg)}",
  map: '{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<footer>\\r\\n    <p>&copy; &nbsp; Mike Hovenier</p>\\r\\n    <a href=\\"https://www.linkedin.com/in/mike-h-310652120/\\" target=\u201D_blank\u201D><img src=\\"/linkedin.png\\" alt=\\"Logo linkedIn\\"></a>\\r\\n</footer>\\r\\n\\r\\n<style>\\r\\n    footer {\\r\\n        padding: 1.5rem;\\r\\n        background-color: var(--black-color);\\r\\n        text-align: center;\\r\\n    }\\r\\n\\r\\n    p {\\r\\n        color: var(--white-color);\\r\\n        /* background-color: var(--black-color); */\\r\\n        text-align: center;\\r\\n    }\\r\\n\\r\\n    img {\\r\\n        margin-top: 1rem;\\r\\n        width: 2.5rem;\\r\\n        height: auto;\\r\\n        transition: ease 0.5s;\\r\\n    }\\r\\n\\r\\n    img:hover {\\r\\n        transform: rotate(360deg);\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAMI,MAAM,cAAC,CAAC,AACJ,OAAO,CAAE,MAAM,CACf,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,UAAU,CAAE,MAAM,AACtB,CAAC,AAED,CAAC,cAAC,CAAC,AACC,KAAK,CAAE,IAAI,aAAa,CAAC,CAEzB,UAAU,CAAE,MAAM,AACtB,CAAC,AAED,GAAG,cAAC,CAAC,AACD,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAAC,IAAI,AACzB,CAAC,AAED,iBAAG,MAAM,AAAC,CAAC,AACP,SAAS,CAAE,OAAO,MAAM,CAAC,AAC7B,CAAC"}'
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<footer class="${"svelte-tm3i52"}"><p class="${"svelte-tm3i52"}">\xA9 \xA0 Mike Hovenier</p>
    <a href="${"https://www.linkedin.com/in/mike-h-310652120/"}" target="${"\u201D_blank\u201D"}"><img src="${"/linkedin.png"}" alt="${"Logo linkedIn"}" class="${"svelte-tm3i52"}"></a>
</footer>`;
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

<main>${slots.default ? slots.default({}) : ``}</main>

${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load$1({ error: error22, status }) {
  return { props: { error: error22, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error22 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<p>${escape2(error22.message)}</p>


${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load: load$1
});
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Index</title>`, ""}`, ""}`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>About</title>`, ""}`, ""}`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About
});
var css$1 = {
  code: 'h1.svelte-lxre37.svelte-lxre37{position:relative;text-align:right;margin-right:2rem;margin-bottom:2rem}h2.svelte-lxre37.svelte-lxre37{font-size:2rem;position:relative;margin-bottom:0.5rem}p.svelte-lxre37.svelte-lxre37{font-size:1.5rem;max-width:40rem;padding:3rem;background-color:var(--main-color);color:var(--black-color);border-radius:5px}a.svelte-lxre37.svelte-lxre37{color:var(--black-color);padding:1rem;background-color:var(--white-color);display:inline-block;margin-top:1rem;margin-right:1rem;border-radius:5rem;text-align:center;text-decoration:none;transition:0.3s ease all}a.svelte-lxre37.svelte-lxre37:hover{background-color:var(--main-color);color:var(--white-color)}#aboutme.svelte-lxre37 h2.svelte-lxre37{color:var(--white-color);font-size:1.5rem;text-align:right;margin-right:2rem}#aboutme.svelte-lxre37 h2 span.svelte-lxre37{font-size:1rem;font-weight:500;text-align:right;font-style:italic}h1.svelte-lxre37.svelte-lxre37::after{content:"";position:absolute;bottom:-1rem;right:0;width:100px;height:3px;background-color:var(--main-color)}#aboutme.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/background.png);background-size:cover;background-position:left center;display:flex;flex-direction:column;align-items:right;justify-content:center;padding-bottom:3rem;opacity:1}#beeldtaal.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/beeldtaal-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#beeldtaal.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}#typografie.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/typografie-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#typografie.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}#gridenkleur.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/gridenkleur-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#gridenkleur.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}#webtypografie.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/webtypografie-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#webtypografie.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}#pechakucha.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/pechakucha-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#pechakucha.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}#ontwerpen1.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/ontwerpen1-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#ontwerpen1.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}#generativeart.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/generativeart-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#generativeart.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}#interfaceenbeweging.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/interfaceenbeweging-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#interfaceenbeweging.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}#ontwerpen2.svelte-lxre37.svelte-lxre37{width:100vw;height:100vh;background-image:url(/ontwerpen2-bg.png);background-size:cover;background-position:left center;padding-bottom:3rem;opacity:1}#ontwerpen2.svelte-lxre37 h2.svelte-lxre37{color:var(--main-color);background-color:var(--black-color);padding:1rem 3rem 1rem 3rem;display:inline}.home-text-move{opacity:0}@media only screen and (min-width: 48rem){section.svelte-lxre37.svelte-lxre37{padding:15rem}}',
  map: `{"version":3,"file":"minor.svelte","sources":["minor.svelte"],"sourcesContent":["<svelte:head>\\r\\n    <meta name=\\"description\\" content=\\"Mike Hovenier's Website Portfolio\\" />\\r\\n\\t<meta name=\\"keywords\\" content=\\"Mike Hovenier, Portfolio, Minor\\" />\\r\\n\\t<meta name=\\"author\\" content=\\"Mike Hovenier\\" />\\r\\n\\t<title>Mike Hovenier | Minor Portfolio</title>\\r\\n</svelte:head>\\r\\n\\r\\n<section id=\\"aboutme\\">\\r\\n\\t<h1>Mike Hovenier</h1>\\r\\n\\t<div class=\\"line\\"></div>\\r\\n\\t<h2>Student <br>\\r\\n\\t\\t<span>Visual and UX Designer</span>\\r\\n\\t</h2>\\r\\n</section>\\r\\n\\r\\n<section id=\\"beeldtaal\\">\\r\\n    <h2>Beeldtaal</h2>\\r\\n    <p>Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal\\r\\n        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,\\r\\n        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, \\r\\n        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word\\r\\n        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.\\r\\n        <br><br>\\r\\n        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar\\r\\n        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"./beeldtaalopdr1.pdf\\" target=\\"_blank\\">Semiotiek opdracht</a>\\r\\n    <a href=\\"./beeldtaalopdr2.pdf\\" target=\\"_blank\\">Retorica opdracht</a>\\r\\n    <a href=\\"./beeldtaalopdr3.pdf\\" target=\\"_blank\\">Eindopdracht</a>\\r\\n    <a href=\\"./beeldtaal.png\\" target=\\"_blank\\">Bewustwordingscampagne maken</a>\\r\\n</section>\\r\\n\\r\\n<section id=\\"typografie\\">\\r\\n    <h2>Typografie</h2>\\r\\n    <p>Het vak typografie leek in eerste opzicht erg tof, maar al gauw merkte ik dat het niets voor mij was. Het zoeken naar bepaalde typografieen\\r\\n        en daar over nadenken vond ik wel interessant, maar eenmaal het knutselen van dit lettertype vond ik maar niets. Na heel veel \\r\\n        pogingen is het wel eindelijk gelukt om een voldoende te halen, maar dit na veel stress.\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"./typografiedras.pdf\\" target=\\"_blank\\">4 Letter woord</a>\\r\\n    <a href=\\"./typografiefont.pdf\\" target=\\"_blank\\">Font onderzoek</a>\\r\\n</section>\\r\\n\\r\\n<section id=\\"gridenkleur\\">\\r\\n    <h2>Grid en kleur</h2>\\r\\n    <p>Grid en kleur was een erg leuk vak voor bij de minor, ik heb niet echt het idee gehad dat ik iets geleerd heb. \\r\\n        Maar heb zeker wel in creatieve zin veel dingen weten op te pikken niet altijd het simpelste van simpelste proberen te maken.\\r\\n        Heb wat meer leren nadenken over mijn keuzes door meer inspiratie op te doen. Dat heeft wel erg geholpen voor andere vakken tijdens de minor.\\r\\n        Vond het overgings wel een erg leuk en nog steeds leerzaam vak.\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"https://xd.adobe.com/view/b5932537-b8d8-4e80-b956-a64d5910c457-e0c0/\\" target=\\"_blank\\">Prototype</a>\\r\\n    <a href=\\"./gridenkleur.pdf\\" target=\\"_blank\\">Ontwerp toelichting</a>\\r\\n</section>\\r\\n\\r\\n<section id=\\"webtypografie\\">\\r\\n    <h2>Webtypografie</h2>\\r\\n    <p>Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal\\r\\n        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,\\r\\n        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, \\r\\n        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word\\r\\n        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.\\r\\n        <br><br>\\r\\n        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar\\r\\n        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"https://mikehov.github.io/web-typography-20-21/closed-captions/\\" target=\\"_blank\\">Prototype video</a>\\r\\n    <a href=\\"./webtypografie.pdf\\" target=\\"_blank\\">Video toelichting</a>\\r\\n    \\r\\n</section>\\r\\n\\r\\n<section id=\\"pechakucha\\">\\r\\n    <h2>Pecha kucha</h2>\\r\\n    <p>Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal\\r\\n        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,\\r\\n        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, \\r\\n        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word\\r\\n        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.\\r\\n        <br><br>\\r\\n        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar\\r\\n        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"./pechakucha.pdf\\" target=\\"_blank\\">Pecha kucha presentatie</a>\\r\\n</section>\\r\\n\\r\\n<section id=\\"ontwerpen1\\">\\r\\n    <h2>Ontwerpen 1</h2>\\r\\n    <p>Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal\\r\\n        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,\\r\\n        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, \\r\\n        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word\\r\\n        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.\\r\\n        <br><br>\\r\\n        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar\\r\\n        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"https://xd.adobe.com/view/a7507c03-09c4-49e8-b6c7-48ba2faa960c-f203/\\" target=\\"_blank\\">Prototype</a>\\r\\n</section>\\r\\n\\r\\n<section id=\\"generativeart\\">\\r\\n    <h2>Generative Art</h2>\\r\\n    <p>Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal\\r\\n        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,\\r\\n        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, \\r\\n        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word\\r\\n        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.\\r\\n        <br><br>\\r\\n        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar\\r\\n        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"https://mikehov.github.io/Generative-art/basic_website/\\" target=\\"_blank\\">Prototype schaakbord</a>\\r\\n    <a href=\\"https://editor.p5js.org/mikehov/sketches/4Rv33lRH5\\" target=\\"_blank\\">Prototype schaakbord p5.js</a>\\r\\n    <a href=\\"https://github.com/mikehov/Generative-art\\" target=\\"_blank\\">Github schaakbord</a>\\r\\n    <a href=\\"https://github.com/mikehov/Generative-art/blob/main/basic_website/proces.md\\" target=\\"_blank\\">Documentatie schaakbord</a>\\r\\n</section>\\r\\n\\r\\n<section id=\\"interfaceenbeweging\\">\\r\\n    <h2>Interface & Beweging</h2>\\r\\n    <p>Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal\\r\\n        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,\\r\\n        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, \\r\\n        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word\\r\\n        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.\\r\\n        <br><br>\\r\\n        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar\\r\\n        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"https://mikehov.github.io/Animatie-karakter/\\" target=\\"_blank\\">Prototype</a>\\r\\n    <a href=\\"./interfaceenbeweging.pdf\\" target=\\"_blank\\">Documentatie</a>\\r\\n</section>\\r\\n\\r\\n<section id=\\"ontwerpen2\\">\\r\\n    <h2>Ontwerpen 2</h2>\\r\\n    <p>Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal\\r\\n        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,\\r\\n        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, \\r\\n        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word\\r\\n        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.\\r\\n        <br><br>\\r\\n        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar\\r\\n        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!\\r\\n    </p>\\r\\n\\r\\n    <a href=\\"https://mikehov.github.io/Correspondent-loopgraven/\\" target=\\"_blank\\">Prototype (officiele)</a>\\r\\n    <a href=\\"https://xd.adobe.com/view/b1c5b73d-7da3-47c9-8054-938da842e9e7-e496/\\" target=\\"_blank\\">Prototype XD (design only)</a>\\r\\n    <a href=\\"#\\" target=\\"_blank\\">Documentatie</a>\\r\\n</section>\\r\\n\\r\\n\\r\\n<style>\\r\\nh1 {\\r\\n\\t\\tposition: relative;\\r\\n\\t\\ttext-align: right;\\r\\n\\r\\n\\t\\tmargin-right: 2rem;\\r\\n\\t\\tmargin-bottom: 2rem;\\r\\n\\t}\\r\\n\\r\\n\\th2 {\\r\\n\\t\\tfont-size: 2rem;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tmargin-bottom: 0.5rem;\\r\\n\\t}\\r\\n\\r\\n    p {\\r\\n            font-size: 1.5rem;\\r\\n            max-width: 40rem;\\r\\n            padding: 3rem;\\r\\n\\r\\n            background-color: var(--main-color);\\r\\n            color: var(--black-color);\\r\\n            border-radius: 5px;\\r\\n        }\\r\\n\\r\\n        a {\\r\\n            color: var(--black-color);\\r\\n            padding: 1rem;\\r\\n            background-color: var(--white-color);\\r\\n            display: inline-block;\\r\\n            margin-top: 1rem;\\r\\n            margin-right: 1rem;\\r\\n            border-radius: 5rem;\\r\\n            text-align: center;\\r\\n            text-decoration: none;\\r\\n            transition: 0.3s ease all;\\r\\n        }\\r\\n\\r\\n        a:hover {\\r\\n            background-color: var(--main-color);\\r\\n            color: var(--white-color);\\r\\n        }\\r\\n\\r\\n\\t#aboutme h2 {\\r\\n\\t\\tcolor: var(--white-color);\\r\\n\\t\\tfont-size: 1.5rem;\\r\\n\\t\\ttext-align: right;\\r\\n\\r\\n\\t\\tmargin-right: 2rem;\\r\\n\\t}\\r\\n\\r\\n\\t#aboutme h2 span {\\r\\n\\t\\tfont-size: 1rem;\\r\\n\\t\\tfont-weight: 500;\\r\\n\\t\\ttext-align: right;\\r\\n\\t\\tfont-style: italic;\\r\\n\\t}\\r\\n\\r\\n\\th1::after {\\r\\n\\tcontent: \\"\\";\\r\\n\\tposition: absolute;\\r\\n\\tbottom: -1rem;\\r\\n\\tright: 0;\\r\\n\\r\\n    width: 100px;\\r\\n    height: 3px;\\r\\n    background-color: var(--main-color);\\r\\n\\t}\\r\\n\\r\\n\\t/* h2.titleline::after {\\r\\n\\tcontent: \\"\\";\\r\\n\\tposition: absolute;\\r\\n\\tbottom: 0rem;\\r\\n\\tleft: 1.5rem;\\r\\n\\r\\n    width: 100px;\\r\\n    height: 3px;\\r\\n    background-color: var(--main-color);\\r\\n\\t} */\\r\\n\\r\\n\\t#aboutme {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/background.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\talign-items: right;\\r\\n\\t\\tjustify-content: center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #beeldtaal {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/beeldtaal-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #beeldtaal h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n    #typografie {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/typografie-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #typografie h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n    #gridenkleur {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/gridenkleur-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #gridenkleur h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n    #webtypografie {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/webtypografie-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #webtypografie h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n    #pechakucha {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/pechakucha-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #pechakucha h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n    #ontwerpen1 {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/ontwerpen1-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #ontwerpen1 h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n    #generativeart {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/generativeart-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #generativeart h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n    #interfaceenbeweging {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/interfaceenbeweging-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #interfaceenbeweging h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n    #ontwerpen2 {\\r\\n\\t\\twidth: 100vw;\\r\\n\\t\\theight: 100vh;\\r\\n\\t\\tbackground-image: url(/ontwerpen2-bg.png);\\r\\n\\t\\tbackground-size: cover;\\r\\n\\t\\tbackground-position: left center;\\r\\n\\r\\n\\t\\tpadding-bottom: 3rem;\\r\\n\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n    #ontwerpen2 h2 {\\r\\n            color: var(--main-color);\\r\\n            background-color: var(--black-color);\\r\\n            padding: 1rem 3rem 1rem 3rem;\\r\\n            display: inline;\\r\\n    }\\r\\n\\r\\n\\t:global(.home-text-move) {\\r\\n\\t\\topacity: 0;\\r\\n\\t}\\r\\n\\r\\n    @media only screen and (min-width: 48rem) {\\r\\n\\t\\tsection {\\r\\n            padding: 15rem;\\r\\n        }\\r\\n\\t}  \\r\\n\\r\\n</style>"],"names":[],"mappings":"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"}`
};
var Minor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `${$$result.head += `<meta name="${"description"}" content="${"Mike Hovenier's Website Portfolio"}" data-svelte="svelte-l5tfyy"><meta name="${"keywords"}" content="${"Mike Hovenier, Portfolio, Minor"}" data-svelte="svelte-l5tfyy"><meta name="${"author"}" content="${"Mike Hovenier"}" data-svelte="svelte-l5tfyy">${$$result.title = `<title>Mike Hovenier | Minor Portfolio</title>`, ""}`, ""}

<section id="${"aboutme"}" class="${"svelte-lxre37"}"><h1 class="${"svelte-lxre37"}">Mike Hovenier</h1>
	<div class="${"line"}"></div>
	<h2 class="${"svelte-lxre37"}">Student <br>
		<span class="${"svelte-lxre37"}">Visual and UX Designer</span></h2></section>

<section id="${"beeldtaal"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Beeldtaal</h2>
    <p class="${"svelte-lxre37"}">Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal
        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,
        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, 
        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word
        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.
        <br><br>
        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar
        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!
    </p>

    <a href="${"./beeldtaalopdr1.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">Semiotiek opdracht</a>
    <a href="${"./beeldtaalopdr2.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">Retorica opdracht</a>
    <a href="${"./beeldtaalopdr3.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">Eindopdracht</a>
    <a href="${"./beeldtaal.png"}" target="${"_blank"}" class="${"svelte-lxre37"}">Bewustwordingscampagne maken</a></section>

<section id="${"typografie"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Typografie</h2>
    <p class="${"svelte-lxre37"}">Het vak typografie leek in eerste opzicht erg tof, maar al gauw merkte ik dat het niets voor mij was. Het zoeken naar bepaalde typografieen
        en daar over nadenken vond ik wel interessant, maar eenmaal het knutselen van dit lettertype vond ik maar niets. Na heel veel 
        pogingen is het wel eindelijk gelukt om een voldoende te halen, maar dit na veel stress.
    </p>

    <a href="${"./typografiedras.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">4 Letter woord</a>
    <a href="${"./typografiefont.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">Font onderzoek</a></section>

<section id="${"gridenkleur"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Grid en kleur</h2>
    <p class="${"svelte-lxre37"}">Grid en kleur was een erg leuk vak voor bij de minor, ik heb niet echt het idee gehad dat ik iets geleerd heb. 
        Maar heb zeker wel in creatieve zin veel dingen weten op te pikken niet altijd het simpelste van simpelste proberen te maken.
        Heb wat meer leren nadenken over mijn keuzes door meer inspiratie op te doen. Dat heeft wel erg geholpen voor andere vakken tijdens de minor.
        Vond het overgings wel een erg leuk en nog steeds leerzaam vak.
    </p>

    <a href="${"https://xd.adobe.com/view/b5932537-b8d8-4e80-b956-a64d5910c457-e0c0/"}" target="${"_blank"}" class="${"svelte-lxre37"}">Prototype</a>
    <a href="${"./gridenkleur.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">Ontwerp toelichting</a></section>

<section id="${"webtypografie"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Webtypografie</h2>
    <p class="${"svelte-lxre37"}">Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal
        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,
        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, 
        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word
        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.
        <br><br>
        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar
        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!
    </p>

    <a href="${"https://mikehov.github.io/web-typography-20-21/closed-captions/"}" target="${"_blank"}" class="${"svelte-lxre37"}">Prototype video</a>
    <a href="${"./webtypografie.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">Video toelichting</a></section>

<section id="${"pechakucha"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Pecha kucha</h2>
    <p class="${"svelte-lxre37"}">Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal
        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,
        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, 
        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word
        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.
        <br><br>
        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar
        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!
    </p>

    <a href="${"./pechakucha.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">Pecha kucha presentatie</a></section>

<section id="${"ontwerpen1"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Ontwerpen 1</h2>
    <p class="${"svelte-lxre37"}">Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal
        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,
        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, 
        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word
        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.
        <br><br>
        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar
        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!
    </p>

    <a href="${"https://xd.adobe.com/view/a7507c03-09c4-49e8-b6c7-48ba2faa960c-f203/"}" target="${"_blank"}" class="${"svelte-lxre37"}">Prototype</a></section>

<section id="${"generativeart"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Generative Art</h2>
    <p class="${"svelte-lxre37"}">Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal
        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,
        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, 
        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word
        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.
        <br><br>
        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar
        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!
    </p>

    <a href="${"https://mikehov.github.io/Generative-art/basic_website/"}" target="${"_blank"}" class="${"svelte-lxre37"}">Prototype schaakbord</a>
    <a href="${"https://editor.p5js.org/mikehov/sketches/4Rv33lRH5"}" target="${"_blank"}" class="${"svelte-lxre37"}">Prototype schaakbord p5.js</a>
    <a href="${"https://github.com/mikehov/Generative-art"}" target="${"_blank"}" class="${"svelte-lxre37"}">Github schaakbord</a>
    <a href="${"https://github.com/mikehov/Generative-art/blob/main/basic_website/proces.md"}" target="${"_blank"}" class="${"svelte-lxre37"}">Documentatie schaakbord</a></section>

<section id="${"interfaceenbeweging"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Interface &amp; Beweging</h2>
    <p class="${"svelte-lxre37"}">Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal
        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,
        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, 
        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word
        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.
        <br><br>
        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar
        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!
    </p>

    <a href="${"https://mikehov.github.io/Animatie-karakter/"}" target="${"_blank"}" class="${"svelte-lxre37"}">Prototype</a>
    <a href="${"./interfaceenbeweging.pdf"}" target="${"_blank"}" class="${"svelte-lxre37"}">Documentatie</a></section>

<section id="${"ontwerpen2"}" class="${"svelte-lxre37"}"><h2 class="${"svelte-lxre37"}">Ontwerpen 2</h2>
    <p class="${"svelte-lxre37"}">Het vak beeldtaal was mijn favoriete vak van de hele minor. Vind het erg tof hoe er na word gedacht over beeldtaal
        met daarbij een bedachten betekenis erachter. Hoe langer je de tijd neemt om een beeld te begrijpen,
        des te sterker het beeld en de betekenis word, dat vind ik fascinerend. Ik heb veel geleerd van het vak, 
        buiten de begrippen die ik geleerd heb om, ben ik ook wat kritscher geworden met kijken naar beeld, wat betekent het, wat word
        er mee bedoelt, waarom is het beeld gemaakt en wat is de boodschap. Voel mij net een beetje Sherlock holmes.
        <br><br>
        Wat betreft techniek had ik al aardig wat verstand van Photoshop, op dit vakgebied heb ik wat minder geleerd. Maar
        dat neemt niet weg dat ik het ontzettend leuk vind om te proetelen met beelden met dit programma. Top vak!
    </p>

    <a href="${"https://mikehov.github.io/Correspondent-loopgraven/"}" target="${"_blank"}" class="${"svelte-lxre37"}">Prototype (officiele)</a>
    <a href="${"https://xd.adobe.com/view/b1c5b73d-7da3-47c9-8054-938da842e9e7-e496/"}" target="${"_blank"}" class="${"svelte-lxre37"}">Prototype XD (design only)</a>
    <a href="${"#"}" target="${"_blank"}" class="${"svelte-lxre37"}">Documentatie</a>
</section>`;
});
var minor = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Minor
});
var css = {
  code: `.todos.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto;line-height:1}.new.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{margin:0 0 0.5rem 0}input.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{border:1px solid transparent}input.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus-visible{box-shadow:inset 1px 1px 6px rgba(0, 0, 0, 0.1);border:1px solid #ff3e00 !important;outline:none}.new.svelte-dmxqmd input.svelte-dmxqmd.svelte-dmxqmd{font-size:28px;width:100%;padding:0.5em 1em 0.3em 1em;box-sizing:border-box;background:rgba(255, 255, 255, 0.05);border-radius:8px;text-align:center}.todo.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{display:grid;grid-template-columns:2rem 1fr 2rem;grid-gap:0.5rem;align-items:center;margin:0 0 0.5rem 0;padding:0.5rem;background-color:white;border-radius:8px;filter:drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));transform:translate(-1px, -1px);transition:filter 0.2s, transform 0.2s}.done.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{transform:none;opacity:0.4;filter:drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1))}form.text.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{position:relative;display:flex;align-items:center;flex:1}.todo.svelte-dmxqmd input.svelte-dmxqmd.svelte-dmxqmd{flex:1;padding:0.5em 2em 0.5em 0.8em;border-radius:3px}.todo.svelte-dmxqmd button.svelte-dmxqmd.svelte-dmxqmd{width:2em;height:2em;border:none;background-color:transparent;background-position:50% 50%;background-repeat:no-repeat}button.toggle.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{border:1px solid rgba(0, 0, 0, 0.2);border-radius:50%;box-sizing:border-box;background-size:1em auto}.done.svelte-dmxqmd .toggle.svelte-dmxqmd.svelte-dmxqmd{background-image:url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");opacity:0.2}.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:hover,.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus{transition:opacity 0.2s;opacity:1}.save.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{position:absolute;right:0;opacity:0;background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A")}.todo.svelte-dmxqmd input.svelte-dmxqmd:focus+.save.svelte-dmxqmd,.save.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus{transition:opacity 0.2s;opacity:1}`,
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\timport { enhance } from '$lib/form';\\n\\n\\t// see https://kit.svelte.dev/docs#loading\\n\\texport const load = async ({ fetch }) => {\\n\\t\\tconst res = await fetch('/todos.json');\\n\\n\\t\\tif (res.ok) {\\n\\t\\t\\tconst todos = await res.json();\\n\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tprops: { todos }\\n\\t\\t\\t};\\n\\t\\t}\\n\\n\\t\\tconst { message } = await res.json();\\n\\n\\t\\treturn {\\n\\t\\t\\terror: new Error(message)\\n\\t\\t};\\n\\t};\\n<\/script>\\n\\n<script>\\n\\timport { scale } from 'svelte/transition';\\n\\timport { flip } from 'svelte/animate';\\n\\n\\texport let todos;\\n\\n\\tasync function patch(res) {\\n\\t\\tconst todo = await res.json();\\n\\n\\t\\ttodos = todos.map((t) => {\\n\\t\\t\\tif (t.uid === todo.uid) return todo;\\n\\t\\t\\treturn t;\\n\\t\\t});\\n\\t}\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Todos</title>\\n</svelte:head>\\n\\n<div class=\\"todos\\">\\n\\t<h1>Todos</h1>\\n\\n\\t<form\\n\\t\\tclass=\\"new\\"\\n\\t\\taction=\\"/todos.json\\"\\n\\t\\tmethod=\\"post\\"\\n\\t\\tuse:enhance={{\\n\\t\\t\\tresult: async (res, form) => {\\n\\t\\t\\t\\tconst created = await res.json();\\n\\t\\t\\t\\ttodos = [...todos, created];\\n\\n\\t\\t\\t\\tform.reset();\\n\\t\\t\\t}\\n\\t\\t}}\\n\\t>\\n\\t\\t<input name=\\"text\\" aria-label=\\"Add todo\\" placeholder=\\"+ tap to add a todo\\" />\\n\\t</form>\\n\\n\\t{#each todos as todo (todo.uid)}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"todo\\"\\n\\t\\t\\tclass:done={todo.done}\\n\\t\\t\\ttransition:scale|local={{ start: 0.7 }}\\n\\t\\t\\tanimate:flip={{ duration: 200 }}\\n\\t\\t>\\n\\t\\t\\t<form\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=patch\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tpending: (data) => {\\n\\t\\t\\t\\t\\t\\ttodo.done = !!data.get('done');\\n\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\tresult: patch\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<input type=\\"hidden\\" name=\\"done\\" value={todo.done ? '' : 'true'} />\\n\\t\\t\\t\\t<button class=\\"toggle\\" aria-label=\\"Mark todo as {todo.done ? 'not done' : 'done'}\\" />\\n\\t\\t\\t</form>\\n\\n\\t\\t\\t<form\\n\\t\\t\\t\\tclass=\\"text\\"\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=patch\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tresult: patch\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<input aria-label=\\"Edit todo\\" type=\\"text\\" name=\\"text\\" value={todo.text} />\\n\\t\\t\\t\\t<button class=\\"save\\" aria-label=\\"Save todo\\" />\\n\\t\\t\\t</form>\\n\\n\\t\\t\\t<form\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=delete\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tresult: () => {\\n\\t\\t\\t\\t\\t\\ttodos = todos.filter((t) => t.uid !== todo.uid);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<button class=\\"delete\\" aria-label=\\"Delete todo\\" />\\n\\t\\t\\t</form>\\n\\t\\t</div>\\n\\t{/each}\\n</div>\\n\\n<style>\\n\\t.todos {\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: var(--column-width);\\n\\t\\tmargin: var(--column-margin-top) auto 0 auto;\\n\\t\\tline-height: 1;\\n\\t}\\n\\n\\t.new {\\n\\t\\tmargin: 0 0 0.5rem 0;\\n\\t}\\n\\n\\tinput {\\n\\t\\tborder: 1px solid transparent;\\n\\t}\\n\\n\\tinput:focus-visible {\\n\\t\\tbox-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);\\n\\t\\tborder: 1px solid #ff3e00 !important;\\n\\t\\toutline: none;\\n\\t}\\n\\n\\t.new input {\\n\\t\\tfont-size: 28px;\\n\\t\\twidth: 100%;\\n\\t\\tpadding: 0.5em 1em 0.3em 1em;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tbackground: rgba(255, 255, 255, 0.05);\\n\\t\\tborder-radius: 8px;\\n\\t\\ttext-align: center;\\n\\t}\\n\\n\\t.todo {\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: 2rem 1fr 2rem;\\n\\t\\tgrid-gap: 0.5rem;\\n\\t\\talign-items: center;\\n\\t\\tmargin: 0 0 0.5rem 0;\\n\\t\\tpadding: 0.5rem;\\n\\t\\tbackground-color: white;\\n\\t\\tborder-radius: 8px;\\n\\t\\tfilter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));\\n\\t\\ttransform: translate(-1px, -1px);\\n\\t\\ttransition: filter 0.2s, transform 0.2s;\\n\\t}\\n\\n\\t.done {\\n\\t\\ttransform: none;\\n\\t\\topacity: 0.4;\\n\\t\\tfilter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));\\n\\t}\\n\\n\\tform.text {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tflex: 1;\\n\\t}\\n\\n\\t.todo input {\\n\\t\\tflex: 1;\\n\\t\\tpadding: 0.5em 2em 0.5em 0.8em;\\n\\t\\tborder-radius: 3px;\\n\\t}\\n\\n\\t.todo button {\\n\\t\\twidth: 2em;\\n\\t\\theight: 2em;\\n\\t\\tborder: none;\\n\\t\\tbackground-color: transparent;\\n\\t\\tbackground-position: 50% 50%;\\n\\t\\tbackground-repeat: no-repeat;\\n\\t}\\n\\n\\tbutton.toggle {\\n\\t\\tborder: 1px solid rgba(0, 0, 0, 0.2);\\n\\t\\tborder-radius: 50%;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tbackground-size: 1em auto;\\n\\t}\\n\\n\\t.done .toggle {\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\\");\\n\\t}\\n\\n\\t.delete {\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A\\");\\n\\t\\topacity: 0.2;\\n\\t}\\n\\n\\t.delete:hover,\\n\\t.delete:focus {\\n\\t\\ttransition: opacity 0.2s;\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t.save {\\n\\t\\tposition: absolute;\\n\\t\\tright: 0;\\n\\t\\topacity: 0;\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A\\");\\n\\t}\\n\\n\\t.todo input:focus + .save,\\n\\t.save:focus {\\n\\t\\ttransition: opacity 0.2s;\\n\\t\\topacity: 1;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+GC,MAAM,0CAAC,CAAC,AACP,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAC5C,WAAW,CAAE,CAAC,AACf,CAAC,AAED,IAAI,0CAAC,CAAC,AACL,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,AACrB,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,AAC9B,CAAC,AAED,+CAAK,cAAc,AAAC,CAAC,AACpB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAChD,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,UAAU,CACpC,OAAO,CAAE,IAAI,AACd,CAAC,AAED,kBAAI,CAAC,KAAK,4BAAC,CAAC,AACX,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,CAC5B,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACrC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,MAAM,AACnB,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CACpC,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CACpB,OAAO,CAAE,MAAM,CACf,gBAAgB,CAAE,KAAK,CACvB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACnD,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,UAAU,CAAE,MAAM,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,AACxC,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AACpD,CAAC,AAED,IAAI,KAAK,0CAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,IAAI,CAAE,CAAC,AACR,CAAC,AAED,mBAAK,CAAC,KAAK,4BAAC,CAAC,AACZ,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,aAAa,CAAE,GAAG,AACnB,CAAC,AAED,mBAAK,CAAC,MAAM,4BAAC,CAAC,AACb,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,WAAW,CAC7B,mBAAmB,CAAE,GAAG,CAAC,GAAG,CAC5B,iBAAiB,CAAE,SAAS,AAC7B,CAAC,AAED,MAAM,OAAO,0CAAC,CAAC,AACd,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,UAAU,CACtB,eAAe,CAAE,GAAG,CAAC,IAAI,AAC1B,CAAC,AAED,mBAAK,CAAC,OAAO,4BAAC,CAAC,AACd,gBAAgB,CAAE,IAAI,uQAAuQ,CAAC,AAC/R,CAAC,AAED,OAAO,0CAAC,CAAC,AACR,gBAAgB,CAAE,IAAI,yrBAAyrB,CAAC,CAChtB,OAAO,CAAE,GAAG,AACb,CAAC,AAED,iDAAO,MAAM,CACb,iDAAO,MAAM,AAAC,CAAC,AACd,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,CAAC,AACX,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,gpBAAgpB,CAAC,AACxqB,CAAC,AAED,mBAAK,CAAC,mBAAK,MAAM,CAAG,mBAAK,CACzB,+CAAK,MAAM,AAAC,CAAC,AACZ,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,CAAC,AACX,CAAC"}`
};
var load = async ({ fetch: fetch22 }) => {
  const res = await fetch22("/todos.json");
  if (res.ok) {
    const todos = await res.json();
    return { props: { todos } };
  }
  const { message } = await res.json();
  return { error: new Error(message) };
};
var Todos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { todos } = $$props;
  if ($$props.todos === void 0 && $$bindings.todos && todos !== void 0)
    $$bindings.todos(todos);
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Todos</title>`, ""}`, ""}

<div class="${"todos svelte-dmxqmd"}"><h1>Todos</h1>

	<form class="${"new svelte-dmxqmd"}" action="${"/todos.json"}" method="${"post"}"><input name="${"text"}" aria-label="${"Add todo"}" placeholder="${"+ tap to add a todo"}" class="${"svelte-dmxqmd"}"></form>

	${each(todos, (todo) => `<div class="${["todo svelte-dmxqmd", todo.done ? "done" : ""].join(" ").trim()}"><form action="${"/todos/" + escape2(todo.uid) + ".json?_method=patch"}" method="${"post"}"><input type="${"hidden"}" name="${"done"}"${add_attribute("value", todo.done ? "" : "true", 0)} class="${"svelte-dmxqmd"}">
				<button class="${"toggle svelte-dmxqmd"}" aria-label="${"Mark todo as " + escape2(todo.done ? "not done" : "done")}"></button></form>

			<form class="${"text svelte-dmxqmd"}" action="${"/todos/" + escape2(todo.uid) + ".json?_method=patch"}" method="${"post"}"><input aria-label="${"Edit todo"}" type="${"text"}" name="${"text"}"${add_attribute("value", todo.text, 0)} class="${"svelte-dmxqmd"}">
				<button class="${"save svelte-dmxqmd"}" aria-label="${"Save todo"}"></button></form>

			<form action="${"/todos/" + escape2(todo.uid) + ".json?_method=delete"}" method="${"post"}"><button class="${"delete svelte-dmxqmd"}" aria-label="${"Delete todo"}"></button></form>
		</div>`)}
</div>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Todos,
  load
});

// .svelte-kit/vercel/entry.js
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
