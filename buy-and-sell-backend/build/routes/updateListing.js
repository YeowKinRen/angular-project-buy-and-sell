"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateListingsRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var admin = _interopRequireWildcard(require("firebase-admin"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var updateListingsRoute = exports.updateListingsRoute = {
  method: 'POST',
  path: '/api/listings/{id}',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, userId, id, _req$payload, name, description, price, _yield$db$query, results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.authtoken;
            _context.next = 3;
            return admin.auth().verifyIdToken(token);
          case 3:
            user = _context.sent;
            userId = user.user_id;
            id = req.params.id;
            _req$payload = req.payload, name = _req$payload.name, description = _req$payload.description, price = _req$payload.price;
            _context.next = 9;
            return _database.db.query("UPDATE listings\n            SET name=?,description=?,price=? WHERE id=? AND user_id=? \n            ", [name, description, price, id, userId]);
          case 9:
            _context.next = 11;
            return _database.db.query('SELECT * FROM listings WHERE id=? AND user_id=?', [id, userId]);
          case 11:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            return _context.abrupt("return", results);
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }
    return handler;
  }()
};