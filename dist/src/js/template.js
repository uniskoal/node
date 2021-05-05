"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateHTML = void 0;

require("core-js/modules/es.array.concat.js");

var templateHTML = function () {
  var createTemplate_private = function createTemplate_private(data, list, url, subject) {
    var update = "\n        <a href=\"/update\"><h3>update</h3></a>\n        ";
    var template = "\n            <!doctype html>\n            <html>\n                <head>\n                    <link rel=\"icon\" href=\"data:,\">\n                    <meta charset=\"utf-8\">\n                    <meta name=\"description\" content=\"\uAE40\uC900\uC11C\uC758 \uAC1C\uC778 \uC790\uAE30\uAC1C\uBC1C \uC0AC\uC774\uD2B8\">\n                    <meta name=\"keywords\" content=\"html,css,javascript,node.js\">\n                    <title>\uAE40\uC900\uC11C</title>\n                </head>\n                <body>\n                    <table border=\"1\" cellspacing=\"0\">\n                    ".concat(list, "\n                    </table>\n                    <h1>").concat(url === '' ? "WELCOME" : subject, "</h1>\n                    <br>\n                    <a href=\"/create\"><h3>create</h3></a>\n                    ").concat(url !== '' ? update : '', "\n                    <br>\n                    <p>\n                        ").concat(data, "\n                    </p>\n                </body>\n            </html>");
    return template;
  };

  var createList_private = function createList_private(file) {
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

    return list;
  };

  var createNotFound_private = function createNotFound_private() {
    var notFound = "\n        <!doctype html>\n        <html>\n            <head>\n                <link rel=\"icon\" href=\"data:,\">\n                <meta charset=\"utf-8\">\n                <meta name=\"description\" content=\"\uAE40\uC900\uC11C\uC758 \uAC1C\uC778 \uC790\uAE30\uAC1C\uBC1C \uC0AC\uC774\uD2B8\">\n                <meta name=\"keywords\" content=\"html,css,javascript,node.js\">\n                <title>\uAE40\uC900\uC11C</title>\n            </head>\n            <body>\n                <h1>\uD574\uB2F9 \uD398\uC774\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. </h1>\n            </body>\n        </html>";
    return notFound;
  };

  var createDocument_private = function createDocument_private(success) {
    var warning = "\n            <p style=\"color:red\">\uBE48 \uACF3\uC774 \uC5C6\uAC8C \uC791\uC131 \uD574 \uC8FC\uC138\uC694!</p>\n        ";
    var document = "<!doctype html>\n        <html>\n            <head>\n                <link rel=\"icon\" href=\"data:,\">\n                <meta charset=\"utf-8\">\n                <meta name=\"description\" content=\"\uAE40\uC900\uC11C\uC758 \uAC1C\uC778 \uC790\uAE30\uAC1C\uBC1C \uC0AC\uC774\uD2B8\">\n                <meta name=\"keywords\" content=\"html,css,javascript,node.js\">\n                <title>\uAE40\uC900\uC11C</title>\n            </head>\n            <body>\n                <form action=\"http://localhost:3000/process_create\" method=\"post\">\n                    <p><input type=\"text\" name=\"title\" placeholder=\"\uC81C\uBAA9\"></p>\n                    <p>\n                        <textarea name=\"content\" cols=\"80\" rows=\"20\" maxlength=\"200\"></textarea>\n                    </p>\n                    ".concat(success == false ? warning : '', "\n                    <p>\n                        <input type=\"submit\" value=\"\uC804\uC1A1\">\n                    </p> \n                </form>\n                <h1></h1>\n            </body>\n        </html>");
    return document;
  };

  return {
    createTemplate_public: function createTemplate_public(data, list, url, subject) {
      return createTemplate_private(data, list, url, subject);
    },
    createList_public: function createList_public(folder) {
      return createList_private(folder);
    },
    createNotFound_public: function createNotFound_public() {
      return createNotFound_private();
    },
    createDocument_public: function createDocument_public(success) {
      return createDocument_private(success);
    }
  };
}();

exports.templateHTML = templateHTML;