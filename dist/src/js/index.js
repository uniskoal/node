"use strict";

require("core-js/modules/web.url.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/web.dom-collections.for-each.js");

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http.default.createServer(function (request, response) {
  var params = new URLSearchParams(request.url.replace('/', '')); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.

  response.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  });
  params.forEach(function (value, name) {
    response.write(name);
    response.write(value);
    response.write("이야 ㅋㅋ");
  });
  response.end();
}).listen(3000);