"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _hapi = _interopRequireDefault(require("@hapi/hapi"));
var _routes = _interopRequireDefault(require("./routes"));
var _database = require("./database");
var admin = _interopRequireWildcard(require("firebase-admin"));
var _credentials = _interopRequireDefault(require("../credentials.json"));
var _inert = _interopRequireDefault(require("@hapi/inert"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
_dotenv["default"].config();
admin.initializeApp({
  credential: admin.credential.cert(_credentials["default"])
});
var server;
var start = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          server = _hapi["default"].server({
            port: process.env.PORT || 8000,
            host: '0.0.0.0'
          });

          // Register Inert to enable file handling
          _context.next = 3;
          return server.register(_inert["default"]);
        case 3:
          // Add Angular and API routes here
          _routes["default"].forEach(function (route) {
            return server.route(route);
          });
          _database.db.connect();
          _context.next = 7;
          return server.start();
        case 7:
          console.log("Server is listening on ".concat(server.info.uri));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function start() {
    return _ref.apply(this, arguments);
  };
}();
process.on('unhandledRejection', function (err) {
  console.log(err);
  process.exit(1);
});
process.on('SIGINT', /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        console.log('Stopping server...');
        _context2.next = 3;
        return server.stop({
          timeout: 10000
        });
      case 3:
        _database.db.end();
        console.log('Server stopped');
        process.exit(0);
      case 6:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
start();