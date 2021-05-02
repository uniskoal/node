"use strict";

require("core-js/modules/web.url.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.concat.js");

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http.default.createServer(function (request, response) {
  var params = new URLSearchParams(request.url.replace('/', '')); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.

  console.log(params);

  _fs.default.readFile("page/document/".concat(request.url === '/' ? "WELCOME" : params.get('sub') === null ? "NOTFOUND" : params.get('sub')), 'utf8', function (err, data) {
    if (err) throw err;

    _fs.default.readdir('page/document', 'utf8', function (err, file) {
      if (err) throw err;
      var list = "";

      for (var index = 0; index < file.length; index += 1) {
        if (file[index] === 'NOTFOUND') {
          continue;
        }

        if (file[index] === 'WELCOME') {
          list += "<tr><th>".concat(index + 1, "</th><td><a href=\"/\">WELOCME</a></td></tr>") + "\n";
          continue;
        }

        list += "<tr><th>".concat(index + 1, "</th><td><a href=\"/?sub=").concat(file[index], "\">").concat(file[index], "</a></td></tr>") + "\n";
      }

      console.log(list);
      var template = "\n            <!doctype html>\n            <html>\n                <head>\n                    <link rel=\"shortcut icon\" href=\"#\">\n                    <meta charset=\"utf-8\">\n                    <meta name=\"description\" content=\"\uAE40\uC900\uC11C\uC758 \uAC1C\uC778 \uC790\uAE30\uAC1C\uBC1C \uC0AC\uC774\uD2B8\">\n                    <meta name=\"keywords\" content=\"html,css,javascript,node.js\">\n                    <title>\uAE40\uC900\uC11C</title>\n                </head>\n                <body>\n                    <table border=\"1\" cellspacing=\"0\">\n                    ".concat(list, "\n                    </table>\n                    <h1>").concat(request.url === '/' ? "WELCOME" : params.get('sub') === null ? "NOTFOUND" : params.get('sub'), "</h1>\n                    <br><br>\n                    <p>\n                        ").concat(data, "\n                    </p>\n                </body>\n            </html>");
      response.writeHead(200);
      response.end(template);
    });
  });
}).listen(3000);