// XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/***
 * --------------------------------------------------------------------------------
 * 这两个是xmlhttprequest里面的参数，不同网站也需要不同的修改策略
 */
var origin = "https://www.academy.com"
var authority = "collector-pxqqxm841a.px-client.net"
/***
 * --------------------------------------------------------------------------------
 */

var Url = require("url");
var spawn = require("child_process").spawn;
var fs = require("fs");

XMLHttpRequest = function() {
    "use strict";

    /**
     * Private variables
     */
    var self = this;
    var http = require("http");
    var https = require("https");

    // Holds http.js objects
    var request;
    var response;

    // Request settings
    var settings = {};

    // Disable header blacklist.
    // Not part of XHR specs.
    var disableHeaderCheck = false;

    // Set some default headers
    var defaultHeaders = {
        "Authority": authority,
        "Accept": "*/*",
        "Accept-Language": "zh,zh-CN;q=0.9",
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        "Dnt": "1",
        "Origin": origin,
        "Pragma": "no-cache",
        "Referer": origin,
        "Sec-Ch-Ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"110\", \"Google Chrome\";v=\"110\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"macOS\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
    };

    var headers = {};
    var headersCase = {};

    // These headers are not user setable.
    // The following are allowed but banned in the spec:
    // * user-agent
    var forbiddenRequestHeaders = [
        "accept-charset",
        "accept-encoding",
        "access-control-request-headers",
        "access-control-request-method",
        "connection",
        "content-length",
        "content-transfer-encoding",
        "cookie",
        "cookie2",
        "date",
        "expect",
        "host",
        "keep-alive",
        "origin",
        "referer",
        "te",
        "trailer",
        "transfer-encoding",
        "upgrade",
        "via"
    ];

    // These request methods are not allowed
    var forbiddenRequestMethods = [
        "TRACE",
        "TRACK",
        "CONNECT"
    ];

    // Send flag
    var sendFlag = false;
    // Error flag, used when errors occur or abort is called
    var errorFlag = false;

    // Event listeners
    var listeners = {};

    /**
     * Constants
     */

    this.UNSENT = 0;
    this.OPENED = 1;
    this.HEADERS_RECEIVED = 2;
    this.LOADING = 3;
    this.DONE = 4;

    /**
     * Public vars
     */

    // Current state
    this.readyState = this.UNSENT;

    // default ready state change handler in case one is not set or is set late
    this.onreadystatechange = null;

    // Result & response
    this.responseText = "";
    this.responseXML = "";
    this.status = null;
    this.statusText = null;

    // Whether cross-site Access-Control requests should be made using
    // credentials such as cookies or authorization headers
    this.withCredentials = false;

    /**
     * Private methods
     */

    /**
     * Check if the specified header is allowed.
     *
     * @param string header Header to validate
     * @return boolean False if not allowed, otherwise true
     */
    var isAllowedHttpHeader = function(header) {
        return disableHeaderCheck || (header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1);
    };

    /**
     * Check if the specified method is allowed.
     *
     * @param string method Request method to validate
     * @return boolean False if not allowed, otherwise true
     */
    var isAllowedHttpMethod = function(method) {
        return (method && forbiddenRequestMethods.indexOf(method) === -1);
    };

    /**
     * Public methods
     */

    /**
     * Open the connection. Currently supports local server requests.
     *
     * @param string method Connection method (eg GET, POST)
     * @param string url URL for the connection.
     * @param boolean async Asynchronous connection. Default is true.
     * @param string user Username for basic authentication (optional)
     * @param string password Password for basic authentication (optional)
     */
    this.open = function(method, url, async, user, password) {
        this.abort();
        errorFlag = false;

        // Check for valid request method
        if (!isAllowedHttpMethod(method)) {
            throw new Error("SecurityError: Request method not allowed");
        }

        settings = {
            "method": method,
            "url": url.toString(),
            "async": (typeof async !== "boolean" ? true : async),
            "user": user || null,
            "password": password || null
        };

        setState(this.OPENED);
    };

    /**
     * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
     * This does not conform to the W3C spec.
     *
     * @param boolean state Enable or disable header checking.
     */
    this.setDisableHeaderCheck = function(state) {
        disableHeaderCheck = state;
    };

    /**
     * Sets a header for the request or appends the value if one is already set.
     *
     * @param string header Header name
     * @param string value Header value
     */
    this.setRequestHeader = function(header, value) {
        if (this.readyState !== this.OPENED) {
            throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
        }
        if (!isAllowedHttpHeader(header)) {
            console.warn("Refused to set unsafe header \"" + header + "\"");
            return;
        }
        if (sendFlag) {
            throw new Error("INVALID_STATE_ERR: send flag is true");
        }
        if(header.toLowerCase()=='content-type'){
            headers[header] =  value;
        }else{
            header = headersCase[header.toLowerCase()] || header;
            headersCase[header.toLowerCase()] = header;
            headers[header] = headers[header] ? headers[header] + ', ' + value : value;
        }
    };

    /**
     * Gets a header from the server response.
     *
     * @param string header Name of header to get.
     * @return string Text of the header or null if it doesn't exist.
     */
    this.getResponseHeader = function(header) {
        if (typeof header === "string"
            && this.readyState > this.OPENED
            && response
            && response.headers
            && response.headers[header.toLowerCase()]
            && !errorFlag
        ) {
            return response.headers[header.toLowerCase()];
        }

        return null;
    };

    /**
     * Gets all the response headers.
     *
     * @return string A string with all response headers separated by CR+LF
     */
    this.getAllResponseHeaders = function() {
        if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
            return "";
        }
        var result = "";

        for (var i in response.headers) {
            // Cookie headers are excluded
            if (i !== "set-cookie" && i !== "set-cookie2") {
                result += i + ": " + response.headers[i] + "\r\n";
            }
        }
        return result.substr(0, result.length - 2);
    };

    /**
     * Gets a request header
     *
     * @param string name Name of header to get
     * @return string Returns the request header or empty string if not set
     */
    this.getRequestHeader = function(name) {
        if (typeof name === "string" && headersCase[name.toLowerCase()]) {
            return headers[headersCase[name.toLowerCase()]];
        }

        return "";
    };

    /**
     * Sends the request to the server.
     *
     * @param string data Optional data to send as request body.
     */
    this.send = function(data) {
        if (this.readyState !== this.OPENED) {
            throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
        }

        if (sendFlag) {
            throw new Error("INVALID_STATE_ERR: send has already been called");
        }

        var ssl = false, local = false;
        var url = Url.parse(settings.url);
        var host;
        // Determine the server
        switch (url.protocol) {
            case "https:":
                ssl = true;
            // SSL & non-SSL both need host, no break here.
            case "http:":
                host = url.hostname;
                break;

            case "file:":
                local = true;
                break;

            case undefined:
            case null:
            case "":
                host = "localhost";
                break;

            default:
                throw new Error("Protocol not supported.");
        }

        // Load files off the local filesystem (file://)
        if (local) {
            if (settings.method !== "GET") {
                throw new Error("XMLHttpRequest: Only GET method is supported");
            }

            if (settings.async) {
                fs.readFile(url.pathname, "utf8", function(error, data) {
                    if (error) {
                        self.handleError(error);
                    } else {
                        self.status = 200;
                        self.responseText = data;
                        setState(self.DONE);
                    }
                });
            } else {
                try {
                    this.responseText = fs.readFileSync(url.pathname, "utf8");
                    this.status = 200;
                    setState(self.DONE);
                } catch(e) {
                    this.handleError(e);
                }
            }

            return;
        }

        // Default to port 80. If accessing localhost on another port be sure
        // to use http://localhost:port/path
        var port = url.port || (ssl ? 443 : 80);
        // Add query string if one is used
        var uri = url.pathname + (url.search ? url.search : "");

        // Set the defaults if they haven't been set
        for (var name in defaultHeaders) {
            if (!headersCase[name.toLowerCase()]) {
                headers[name] = defaultHeaders[name];
            }
        }

        // Set the Host header or the server may reject the request
        headers.Host = host;
        if (!((ssl && port === 443) || port === 80)) {
            headers.Host += ":" + url.port;
        }

        // Set Basic Auth if necessary
        if (settings.user) {
            if (typeof settings.password === "undefined") {
                settings.password = "";
            }
            var authBuf = new Buffer(settings.user + ":" + settings.password);
            headers.Authorization = "Basic " + authBuf.toString("base64");
        }

        // Set content length header
        if (settings.method === "GET" || settings.method === "HEAD") {
            data = null;
        } else if (data) {
            headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);

            if (!headers["Content-Type"]) {
                headers["Content-Type"] = "application/json;charset=UTF-8";
            }
        } else if (settings.method === "POST") {
            // For a post with no data set Content-Length: 0.
            // This is required by buggy servers that don't meet the specs.
            // headers["Content-Length"] = 0;
        }

        var options = {
            host: host,
            port: port,
            path: uri,
            method: settings.method,
            headers: headers,
            agent: false,
            withCredentials: self.withCredentials
        };

        // Reset error flag
        errorFlag = false;
        settings.async=false;
        // Handle async requests
        if (settings.async) {
            // Use the proper protocol
            var doRequest = ssl ? https.request : http.request;

            // Request is being sent, set send flag
            sendFlag = true;

            // As per spec, this is called here for historical reasons.
            self.dispatchEvent("readystatechange");

            // Handler for the response
            var responseHandler = function responseHandler(resp) {
                // Set response var to the response we got back
                // This is so it remains accessable outside this scope
                response = resp;
                // Check for redirect
                // @TODO Prevent looped redirects
                if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
                    // Change URL to the redirect location
                    settings.url = response.headers.location;
                    var url = Url.parse(settings.url);
                    // Set host var in case it's used later
                    host = url.hostname;
                    // Options for the new request
                    var newOptions = {
                        hostname: url.hostname,
                        port: url.port,
                        path: url.path,
                        method: response.statusCode === 303 ? "GET" : settings.method,
                        headers: headers,
                        withCredentials: self.withCredentials
                    };

                    // Issue the new request
                    request = doRequest(newOptions, responseHandler).on("error", errorHandler);
                    request.end();
                    // @TODO Check if an XHR event needs to be fired here
                    return;
                }

                response.setEncoding("utf8");

                setState(self.HEADERS_RECEIVED);
                self.status = response.statusCode;

                response.on("data", function(chunk) {
                    // Make sure there's some data
                    if (chunk) {
                        self.responseText += chunk;
                    }
                    // Don't emit state changes if the connection has been aborted.
                    if (sendFlag) {
                        setState(self.LOADING);
                    }
                });

                response.on("end", function() {
                    if (sendFlag) {
                        // Discard the end event if the connection has been aborted
                        setState(self.DONE);
                        sendFlag = false;
                    }
                });

                response.on("error", function(error) {
                    self.handleError(error);
                });
            };

            // Error handler for the request
            var errorHandler = function errorHandler(error) {
                self.handleError(error);
            };

            // Create the request
            request = doRequest(options, responseHandler).on("error", errorHandler);

            // Node 0.4 and later won't accept empty data. Make sure it's needed.
            if (data) {
                request.write(data);
            }

            request.end();

            self.dispatchEvent("loadstart");
        } else { // Synchronous
            // Create a temporary file for communication with the other Node process
            var contentFile = ".node-xmlhttprequest-content-" + process.pid;
            var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
            fs.writeFileSync(syncFile, "", "utf8");
            // The async request the other Node process executes
            var execString = "var http = require('http'), https = require('https'), fs = require('fs');"
                + "var doRequest = http" + (ssl ? "s" : "") + ".request;"
                + "var options = " + JSON.stringify(options) + ";"
                + "var responseText = '';"
                + "var req = doRequest(options, function(response) {"
                + "response.setEncoding('utf8');"
                + "response.on('data', function(chunk) {"
                + "  responseText += chunk;"
                + "});"
                + "response.on('end', function() {"
                + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText}}), 'utf8');"
                + "fs.unlinkSync('" + syncFile + "');"
                + "});"
                + "response.on('error', function(error) {"
                + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');"
                + "fs.unlinkSync('" + syncFile + "');"
                + "});"
                + "}).on('error', function(error) {"
                + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');"
                + "fs.unlinkSync('" + syncFile + "');"
                + "});"
                + (data ? "req.write('" + JSON.stringify(data).slice(1,-1).replace(/'/g, "\\'") + "');":"")
                + "req.end();";
            // Start the other Node Process, executing this string
            var syncProc = spawn(process.argv[0], ["-e", execString]);
            // while(fs.existsSync(syncFile)) {
            //     // Wait while the sync file is empty
            // }
            var resp = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
            // Kill the child process once the file has data
            syncProc.stdin.end();
            // Remove the temporary file
            fs.unlinkSync(contentFile);

            if (resp.err) {
                self.handleError(resp.err);
            } else {
                response = resp.data;
                self.status = resp.data.statusCode;
                self.responseText = resp.data.text;
                setState(self.DONE);
            }
        }
    };

    /**
     * Called when an error is encountered to deal with it.
     */
    this.handleError = function(error) {
        this.status = 0;
        this.statusText = error;
        this.responseText = error.stack;
        errorFlag = true;
        setState(this.DONE);
        this.dispatchEvent('error');
    };

    /**
     * Aborts a request.
     */
    this.abort = function() {
        if (request) {
            request.abort();
            request = null;
        }

        headers = defaultHeaders;
        this.status = 0;
        this.responseText = "";
        this.responseXML = "";

        errorFlag = true;

        if (this.readyState !== this.UNSENT
            && (this.readyState !== this.OPENED || sendFlag)
            && this.readyState !== this.DONE) {
            sendFlag = false;
            setState(this.DONE);
        }
        this.readyState = this.UNSENT;
        this.dispatchEvent('abort');
    };

    /**
     * Adds an event listener. Preferred method of binding to events.
     */
    this.addEventListener = function(event, callback) {
        if (!(event in listeners)) {
            listeners[event] = [];
        }
        // Currently allows duplicate callbacks. Should it?
        listeners[event].push(callback);
    };

    /**
     * Remove an event callback that has already been bound.
     * Only works on the matching funciton, cannot be a copy.
     */
    this.removeEventListener = function(event, callback) {
        if (event in listeners) {
            // Filter will return a new array with the callback removed
            listeners[event] = listeners[event].filter(function(ev) {
                return ev !== callback;
            });
        }
    };

    /**
     * Dispatch any events, including both "on" methods and events attached using addEventListener.
     */
    this.dispatchEvent = function(event) {
        if (typeof self["on" + event] === "function") {
            self["on" + event]();
        }
        if (event in listeners) {
            for (var i = 0, len = listeners[event].length; i < len; i++) {
                listeners[event][i].call(self);
            }
        }
    };

    /**
     * Changes readyState and calls onreadystatechange.
     *
     * @param int state New state
     */
    var setState = function(state) {
        if (state == self.LOADING || self.readyState !== state) {
            self.readyState = state;

            if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
                self.dispatchEvent("readystatechange");
            }

            if (self.readyState === self.DONE && !errorFlag) {
                self.dispatchEvent("load");
                // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)
                self.dispatchEvent("loadend");
            }
        }
    };
};

function null_func(val) {
    // 获取调用null_func的函数名
    const callerFunctionName = null_func.caller?.name || 'Unknown Function';
    console.log(`Called by: ${callerFunctionName}`);
    console.log(`Value:`, arguments);
    return '[native code]';
}
delete __dirname
delete __filename
Document = function (){}
Object.defineProperties(Document.prototype, {
    [Symbol.toStringTag]: {
        value: "Document",
        configurable: true
    }
});
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {url: origin});
function Element(){

}
window = global
window.location = dom.window;
window.navigator = dom.window;
window.document = dom.window;
window.history = dom.window;
window.screen = dom.window;
document.__proto__ = Document.prototype
window.Element = Element;
window.speechSynthesis={
    onvoiceschanged:null,
    paused:false,
    pending:false,
    speaking:false,
    getVoices:null_func
}
window.XMLHttpRequest=XMLHttpRequest
// window.XMLHttpRequest=function XMLHttpRequest(){
//     return {
//         'withCredentials':false,
//         'responseText':null,
//         'response':null
//     }
// }

window.requestAnimationFrame=null_func
window.MutationObserver = null_func
window.WebKitMutationObserver = null_func
window.MediaSource=null_func
window.PXLkXIE7Oj_asyncInit=function(px) {
    let pageVisitObject = {pageVisit: {pxData: {}}};
    px.Events.on('enrich', function (value) {
        const base64Data = value.split(":")[1];
        const dataStr = atob(base64Data);
        const data = JSON.parse(dataStr);
        window.digitalData = window.digitalData || pageVisitObject;
        window.digitalData.pageVisit.pxData.accessControlRuleId = data['f_id'];
        window.digitalData.pageVisit.pxData.isKnownBot = data['f_kb'];
        window.digitalData.pageVisit.pxData.incidentTypes = data['inc_id'];
    });
    px.Events.on('score', function (value) {
        window.digitalData = window.digitalData || pageVisitObject;
        window.digitalData.pageVisit.pxData.botScore = value;
        sendAnalyticsBeacon();
    });
};
window.chrome={
    "app": {
        "isInstalled": false,
        "InstallState": {
            "DISABLED": "disabled",
            "INSTALLED": "installed",
            "NOT_INSTALLED": "not_installed"
        },
        "RunningState": {
            "CANNOT_RUN": "cannot_run",
            "READY_TO_RUN": "ready_to_run",
            "RUNNING": "running"
        }
    }
}
window.performance={
    getEntriesByType:function (){
        return {
            filter:function(){
                return null
            }
        }
    },
    now:function(){
        return new Date().getTime()+'.0000000000'
    },
    "timeOrigin":new Date().getTime()+'.7',
    "timing": {
        "connectStart": new Date().getTime(),
        "navigationStart": new Date().getTime(),
        "secureConnectionStart": 0,
        "fetchStart": new Date().getTime(),
        "domContentLoadedEventStart": new Date().getTime(),
        "responseStart": new Date().getTime(),
        "domInteractive": new Date().getTime(),
        "domainLookupEnd": new Date().getTime(),
        "responseEnd": new Date().getTime(),
        "redirectStart": 0,
        "requestStart": new Date().getTime(),
        "unloadEventEnd": new Date().getTime(),
        "unloadEventStart": new Date().getTime(),
        "domLoading": new Date().getTime(),
        "domComplete": 0,
        "domainLookupStart": new Date().getTime(),
        "loadEventStart": 0,
        "domContentLoadedEventEnd": new Date().getTime(),
        "loadEventEnd": 0,
        "redirectEnd": 0,
        "connectEnd": new Date().getTime()
    },
    "navigation": {
        "type": 1,
        "redirectCount": 0
    },memory:{}
}
window._pxAction = 'pxhc'
window._pxMobile = false
window._LkXIE7Ojhandler=null_func
location = window.location;
location.href = origin
location.hostname=origin
location.protocol='https:'
navigator = {
    permissions:{},
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    languages: ["zh-CN", "zh"],
    appVersion: "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    webdriver: false,
    appName: "Netscape",
    vendor: "Google Inc.",
    platform:'Win32',
    connection:{},
    userAgentData:{
        "brands": [
            {
                "brand": "Not_A Brand",
                "version": "8"
            },
            {
                "brand": "Chromium",
                "version": "110"
            },
            {
                "brand": "Google Chrome",
                "version": "110"
            }
        ],
        "mobile": false,
        "platform": "macOS"
    }
};
document = window.document;
document.readyState='complete'
document.addEventListener=null_func
document.attachEvent=null_func
document.createDocumentFragment = null_func
document.getElementsByTagName = null_func
document.createElement = function (){
    return {
        href:"",
        hostname:""
    }
}
document.getElementById = function(){

}
document.currentScript = new Element()
history = window.history;
screen = {
    "availHeight": 960,
    "availWidth": 1707,
    "colorDepth": 24,
    "height": 960,
    "pixelDepth": 24,
    "width": 1707
}
window.top = window

window.localStorage = {
    setItem:function (key,value) {
        console("key:",key,"value:",value)
        window.localStorage[key] = value
    },
    getItem:function (key){
        console.log('key',key)
        return window.localStorage['key'];
    }
}

window.globalStorage = {
    setItem:function (key,value) {
        console("key:",key,"value:",value)
        window.globalStorage[key] = value
    },
    getItem:function (key){
        console.log('key',key)
        return window.globalStorage['key'];
    }
}
window.sessionStorage = {
    setItem:function (key,value) {
        console("key:",key,"value:",value)
        window.sessionStorage[key] = value
    },
    getItem:function (key){
        console.log('key',key,window.sessionStorage['key'])
        return window.sessionStorage['key'];
    }
}

window.name=''
window.addEventListener = null_func
window.self = window;
function myProxy(obj,name){
    return new Proxy(obj,{
        get(target, propKey, receiver){ //拦截对象属性的读取，比如proxy.foo和proxy['foo']。
            let temp = Reflect.get(target,propKey,receiver);
            console.log(`${name} -> get ${propKey} return -> ${temp}`);
            if(typeof temp == 'object') {
                temp = myProxy(temp,name + " => " + propKey)
            }
            return temp;
        },
        set(target, propKey, value, receiver){ //拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
            const temp = Reflect.set(target,propKey,value,receiver);
            console.log(`${name} -> set ${propKey} value -> ${value}`);
            return temp;
        },
        has(target, propKey){ //拦截propKey in proxy的操作，返回一个布尔值。
            const temp = Reflect.has(target,propKey);
            console.log(`${name} -> has ${propKey}`);
            return temp;
        },
        deleteProperty(target, propKey){ //拦截delete proxy[propKey]的操作，返回一个布尔值。
            const temp = Reflect.deleteProperty(target,propKey);
            return temp;
        },
        ownKeys(target){ //拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
            const temp = Reflect.ownKeys(target);
            return temp;
        },
        getOwnPropertyDescriptor(target, propKey){ //拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
            const temp = Reflect.getOwnPropertyDescriptor(target,propKey);
            return temp;
        },
        defineProperty(target, propKey, propDesc){ //拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
            const temp = Reflect.defineProperty(target,propKey,propDesc);
            return temp;
        },
        preventExtensions(target){ //拦截Object.preventExtensions(proxy)，返回一个布尔值。
            const temp = Reflect.preventExtensions(target);
            return temp;
        },
        getPrototypeOf(target){ //拦截Object.getPrototypeOf(proxy)，返回一个对象。
            const temp = Reflect.getPrototypeOf(target);
            return temp;
        },
        isExtensible(target){ //拦截Object.isExtensible(proxy)，返回一个布尔值。
            const temp = Reflect.isExtensible(target);
            return temp;
        },
        setPrototypeOf(target, proto){ //拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
            const temp = Reflect.setPrototypeOf(target,proto);
            return temp;
        },
        apply(target, object, args){ //拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
            const temp = Reflect.apply(target, object, args);
            return temp;
        },
        construct(target, args){ //拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
            const temp = Reflect.construct(target, args);
            return temp;
        }
    })
}
// 代理器封装
function get_enviroment(proxy_array) {
    for(var i=0; i<proxy_array.length; i++){
        handler = '{\n' +
            '    get: function(target, property, receiver) {\n' +
            '        console.log("方法:", "get  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            '        return target[property];\n' +
            '    },\n' +
            '    set: function(target, property, value, receiver) {\n' +
            '        console.log("方法:", "set  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            '        return Reflect.set(...arguments);\n' +
            '    }\n' +
            '}'
        eval('try{\n' + proxy_array[i] + ';\n'
            + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}catch (e) {\n' + proxy_array[i] + '={};\n'
            + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}')
    }
}
proxy_array = ['_LkXIE7Ojhandler','_pxAction','performance','chrome','digitalData','speechSynthesis','window', 'document', 'location', 'navigator', 'history','screen','aaa','target','Element' ]
get_enviroment(proxy_array)
