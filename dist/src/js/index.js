"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.regexp.exec.js");

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _template = require("./template.js");

var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));

var _express = _interopRequireDefault(require("express"));

var _url = require("url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var app = (0, _express.default)();
var port = 3000;
app.get('/', function (request, response) {
  var url = new _url.URL(request.url, "http://ci2021soulmate.dongyangmirae.kr:3000/");
  var params = new URLSearchParams(url.search); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.

  _fs.default.readFile("page/document/".concat(url.search === '' ? "WELCOME" : params.get('sub')), 'utf8', function (err, data) {
    var subject = params.get('sub');

    _fs.default.readdir('page/document', 'utf8', function (err, file) {
      var paramSearch = false;

      var _iterator = _createForOfIteratorHelper(file),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var index = _step.value;

          if (subject === index || url.search === '') {
            paramSearch = true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (paramSearch) {
        var list = _template.templateHTML.createList_public(file);

        var template = _template.templateHTML.createTemplate_public(data, list, url.search, subject);

        response.writeHead(200);
        response.end(template);
      } else {
        var notfound = _template.templateHTML.createNotFound_public();

        response.writeHead(200);
        response.end(notfound);
      }
    });
  });
});
app.get('/create', function (request, response) {
  var url = new _url.URL(request.url, "http://localhost:3000/");
  var params = new URLSearchParams(url.search);
  var success;

  if (params.get('success') === 'false') {
    success = false;
  }

  var document = _template.templateHTML.createDocument_public(success, url.pathname, null);

  response.send(document);
});
app.get('/update', function (request, response) {
  var url = new _url.URL(request.url, "http://localhost:3000/");
  var params = new URLSearchParams(url.search);
  var update_params = params.get('sub');
  var success;

  if (params.get('success') === 'false') {
    success = false;
  }

  var document = _template.templateHTML.createDocument_public(success, url.pathname, update_params);

  response.send(document);
});
app.get('/delete', function (request, response) {
  var url = new _url.URL(request.url, "http://localhost:3000/");
  var params = new URLSearchParams(url.search);

  _fs.default.unlink("page/document/".concat(params.get('sub')), function (err) {
    if (err) throw err;
    response.writeHead(301, {
      Location: '/'
    });
    response.end();
  });
});
app.post('/process_create', function (request, response) {
  var body = "";
  request.on('data', function (data) {
    body += data;
  });
  request.on('end', function () {
    var postQuery = new URLSearchParams(decodeURIComponent(body));
    console.log(postQuery);

    if (postQuery.get('title') === '' || postQuery.get('content') === '') {
      response.writeHead(301, {
        Location: "/create?success=false"
      });
      response.end();
    } else {
      _fs.default.writeFile("page/document/".concat(postQuery.get('title')), (0, _sanitizeHtml.default)(postQuery.get('content')), 'utf8', function (err) {
        response.writeHead(301, {
          Location: "/"
        });
        response.end();
      });
    }
  });
});
app.post('/process_update', function (request, response) {
  var body = "";
  request.on('data', function (data) {
    body += data;
  });
  request.on('end', function () {
    var postQuery = new URLSearchParams(decodeURIComponent(body));

    if (postQuery.get('title') === '' || postQuery.get('content') === '') {
      response.writeHead(301, {
        Location: "/create?success=false"
      });
      response.end();
    } else {
      _fs.default.rename("page/document/".concat(postQuery.get("id")), "page/document/".concat(postQuery.get("title")), function (err) {
        _fs.default.writeFile("page/document/".concat(postQuery.get('title')), (0, _sanitizeHtml.default)(postQuery.get('content')), 'utf8', function (err) {
          response.writeHead(301, {
            Location: "/"
          });
          response.end();
        });
      });
    }
  });
});
app.listen(port, function () {
  console.log("서버가 무사히 구동되었습니다.");
});
/*
http.createServer((request,response) => {
    
    const url = new URL(request.url , "http://localhost:3000");
    const params = new URLSearchParams(url.search); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.
    console.log(url);
    fs.readFile(`page/document/${(url.search === '' && url.pathname == '/') ? "WELCOME" : params.get('sub')}` , 'utf8' , (err,data) => {
        
        
        const subject = params.get('sub');
        
        if(url.pathname === '/create' || url.pathname === '/update') {
            
            let update_params = url.searchParams.get("sub");

            console.log(update_params);
            let success;
            if(params.get('success') === 'false') {
                success = false;
            }
            let document = templateHTML.createDocument_public(success,url.pathname,update_params);
                
            response.writeHead(200);
            response.end(document);
        }
        if(url.pathname === '/delete') {
            fs.unlink(`page/document/${params.get('sub')}` , (err) => {
                if(err) throw err;

                response.writeHead(301 , { Location : '/'});
                response.end();
            });
        }
        else if(url.pathname === `/process_create`) {
            let body = "";
    
            request.on('data' , (data) => {
                body += data;
            });

            request.on('end' , () => {
                let postQuery = new URLSearchParams(decodeURIComponent(body));
                console.log(postQuery);
                if(postQuery.get('title') === '' || postQuery.get('content') === '' ) {
                    response.writeHead(301 , { Location : "/create?success=false"});
                    response.end();
                }
                else {
                    fs.writeFile(`page/document/${postQuery.get('title')}` , sanitizehtml(postQuery.get('content')), 'utf8' , (err) => {
                        
                        response.writeHead(301 , { Location : "/"});
                        response.end();
                    });
                }
            });
        }
        else if(url.pathname === `/process_update`) {
            let body = "";

            request.on('data' , (data) => {
                body += data;
            });

            request.on('end' , () => {
                let postQuery = new URLSearchParams(decodeURIComponent(body));
                console.log(postQuery);

                fs.rename(`page/document/${postQuery.get("id")}` , `page/document/${postQuery.get("title")}` , (err) => {
                    fs.writeFile(`page/document/${postQuery.get('title')}` , sanitizehtml(postQuery.get('content')), 'utf8' , (err) => {
                        
                        response.writeHead(301 , { Location : "/"});
                        response.end();
                    });
                });
;            });
        }
        else {
            fs.readdir('page/document' , 'utf8' , (err,file) => {
            
                let paramSearch = false;
    
                for(let index of file) {
                    if(subject === index || (url.search === '' && url.pathname == '/')) { paramSearch = true; }
                }
                
                if(paramSearch) {
                    let list = templateHTML.createList_public(file);
                
                    let template = templateHTML.createTemplate_public(data,list,url.search,subject);
    
                    response.writeHead(200);
                    response.end(template);
                }
                else {
                    let notfound = templateHTML.createNotFound_public();
                    
                    response.writeHead(200);
                    response.end(notfound);
                }
                
            });
        }
        
    });
    
}).listen(3000);
*/