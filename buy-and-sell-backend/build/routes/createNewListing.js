"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewListingRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uuid = require("uuid");
var _database = require("../database");
var admin = _interopRequireWildcard(require("firebase-admin"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var createNewListingRoute = exports.createNewListingRoute = {
  method: 'POST',
  path: '/api/listings',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, id, userId, _req$payload, _req$payload$name, name, _req$payload$descript, description, _req$payload$price, price, _req$payload$imageUrl, imageUrl, views;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers.authtoken;
            _context.next = 4;
            return admin.auth().verifyIdToken(token);
          case 4:
            user = _context.sent;
            id = (0, _uuid.v4)();
            userId = user.uid;
            _req$payload = req.payload, _req$payload$name = _req$payload.name, name = _req$payload$name === void 0 ? '' : _req$payload$name, _req$payload$descript = _req$payload.description, description = _req$payload$descript === void 0 ? '' : _req$payload$descript, _req$payload$price = _req$payload.price, price = _req$payload$price === void 0 ? 0 : _req$payload$price, _req$payload$imageUrl = _req$payload.imageUrl, imageUrl = _req$payload$imageUrl === void 0 ? '' : _req$payload$imageUrl;
            views = 0;
            _context.next = 11;
            return _database.db.query("INSERT INTO listings (id, name, description, price, user_id, views, image_url) VALUES\n                (?,?,?,?,?,?,?)", [id, name, description, price, userId, views, imageUrl]);
          case 11:
            return _context.abrupt("return", {
              id: id,
              name: name,
              description: description,
              price: price,
              user_id: userId,
              views: views,
              image_url: imageUrl
            });
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            return _context.abrupt("return", h.response({
              error: 'Internal Server Error'
            }).code(500));
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 14]]);
    }));
    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }
    return handler;
  }()
};