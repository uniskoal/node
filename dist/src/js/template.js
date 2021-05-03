"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateHTML = void 0;

require("core-js/modules/es.array.concat.js");

var templateHTML = function () {
  var template = "";

  var createTemplate_private = function createTemplate_private(data, list, url, subject) {
    template = "\n            <!doctype html>\n            <html>\n                <head>\n                    <link rel=\"shortcut icon\" href=\"#\">\n                    <meta charset=\"utf-8\">\n                    <meta name=\"description\" content=\"\uAE40\uC900\uC11C\uC758 \uAC1C\uC778 \uC790\uAE30\uAC1C\uBC1C \uC0AC\uC774\uD2B8\">\n                    <meta name=\"keywords\" content=\"html,css,javascript,node.js\">\n                    <title>\uAE40\uC900\uC11C</title>\n                </head>\n                <body>\n                    <table border=\"1\" cellspacing=\"0\">\n                    ".concat(list, "\n                    </table>\n                    <h1>").concat(url === '/' ? "WELCOME" : subject === null ? "NOTFOUND" : subject, "</h1>\n                    <br><br>\n                    <p>\n                        ").concat(data, "\n                    </p>\n                </body>\n            </html>");
    return template;
  };

  return {
    createTemplate_public: function createTemplate_public(data, list, url, subject) {
      return createTemplate_private(data, list, url, subject);
    }
  };
}();

exports.templateHTML = templateHTML;