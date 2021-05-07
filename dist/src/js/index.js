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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

_http.default.createServer(function (request, response) {
  var url = new URL(request.url, "http://localhost:3000");
  var params = new URLSearchParams(url.search); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.

  console.log(url);

  _fs.default.readFile("page/document/".concat(url.search === '' && url.pathname == '/' ? "WELCOME" : params.get('sub')), 'utf8', function (err, data) {
    var subject = params.get('sub');

    if (url.pathname === '/create' || url.pathname === '/update') {
      var update_params = url.searchParams.get("sub");
      console.log(update_params);
      var success;

      if (params.get('success') === 'false') {
        success = false;
      }

      var document = _template.templateHTML.createDocument_public(success, url.pathname, update_params);

      response.writeHead(200);
      response.end(document);
    }

    if (url.pathname === '/delete') {
      _fs.default.unlink("page/document/".concat(params.get('sub')), function (err) {
        if (err) throw err;
        response.writeHead(301, {
          Location: '/'
        });
        response.end();
      });
    } else if (url.pathname === "/process_create") {
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
    } else if (url.pathname === "/process_update") {
      var _body = "";
      request.on('data', function (data) {
        _body += data;
      });
      request.on('end', function () {
        var postQuery = new URLSearchParams(decodeURIComponent(_body));
        console.log(postQuery);

        _fs.default.rename("page/document/".concat(postQuery.get("id")), "page/document/".concat(postQuery.get("title")), function (err) {
          _fs.default.writeFile("page/document/".concat(postQuery.get('title')), (0, _sanitizeHtml.default)(postQuery.get('content')), 'utf8', function (err) {
            response.writeHead(301, {
              Location: "/"
            });
            response.end();
          });
        });

        ;
      });
    } else {
      _fs.default.readdir('page/document', 'utf8', function (err, file) {
        var paramSearch = false;

        var _iterator = _createForOfIteratorHelper(file),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var index = _step.value;

            if (subject === index || url.search === '' && url.pathname == '/') {
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
    }
  });
}).listen(3000);