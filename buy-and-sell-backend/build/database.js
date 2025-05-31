"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;
var _mysql = _interopRequireWildcard(require("mysql2"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var connection;
var db = exports.db = {
  connect: function connect() {
    connection = _mysql["default"].createConnection({
      // host: process.env.DB_HOST, // remove `host` if using socketPath
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      socketPath: process.env.DB_SOCKET
    });
    connection.connect();
  },
  query: function query(queryString, escapeValues) {
    return new Promise(function (resolve, reject) {
      connection.query(queryString, escapeValues, function (error, results, field) {
        if (error) reject(error);
        resolve({
          results: results,
          field: field
        });
      });
    });
  },
  end: function end() {
    return connection.end();
  }
};