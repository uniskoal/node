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

var _template = require("./template.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http.default.createServer(function (request, response) {
  var params = new URLSearchParams(request.url.replace('/', '')); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.

  console.log(params);

  _fs.default.readFile("page/document/".concat(request.url === '/' ? "WELCOME" : params.get('sub') === null ? "NOTFOUND" : params.get('sub')), 'utf8', function (err, data) {
    if (err) throw err;
    var url = request.url;
    var subject = params.get('sub');

    _fs.default.readdir('page/document', 'utf8', function (err, file) {
      if (err) throw err;
      var list = "";
      var number = 0;

      for (var index = 0; index < file.length; index += 1) {
        if (file[index] === 'NOTFOUND') {
          continue;
        }

        if (file[index] === 'WELCOME') {
          list += "<tr><th>".concat(++number, "</th><td><a href=\"/\">WELOCME</a></td></tr>") + "\n";
          continue;
        }

        list += "<tr><th>".concat(++number, "</th><td><a href=\"/?sub=").concat(file[index], "\">").concat(file[index], "</a></td></tr>") + "\n";
      }

      var template = _template.templateHTML.createTemplate_public(data, list, url, subject);

      response.writeHead(200);
      response.end(template);
    });
  });
}).listen(3000);