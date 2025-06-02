"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMessageRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uuid = require("uuid");
var _database = require("../database");
var admin = _interopRequireWildcard(require("firebase-admin"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var sendMessageRoute = exports.sendMessageRoute = {
  method: 'POST',
  path: '/api/messages/send',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var _req$payload, _req$payload$listingI, listingId, _req$payload$recipien, recipientEmail, _req$payload$senderEm, senderEmail, _req$payload$message, message, token, user, id, userId, timestamp;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$payload = req.payload, _req$payload$listingI = _req$payload.listingId, listingId = _req$payload$listingI === void 0 ? '' : _req$payload$listingI, _req$payload$recipien = _req$payload.recipientEmail, recipientEmail = _req$payload$recipien === void 0 ? '' : _req$payload$recipien, _req$payload$senderEm = _req$payload.senderEmail, senderEmail = _req$payload$senderEm === void 0 ? '' : _req$payload$senderEm, _req$payload$message = _req$payload.message, message = _req$payload$message === void 0 ? '' : _req$payload$message;
            token = req.headers.authtoken;
            _context.next = 4;
            return admin.auth().verifyIdToken(token);
          case 4:
            user = _context.sent;
            id = (0, _uuid.v4)();
            userId = user.uid;
            timestamp = new Date();
            _context.next = 10;
            return _database.db.query("\n      INSERT INTO messages (id, listing_id, sender_email, recipient_email, message)\n      VALUES (?, ?, ?, ?, ?)", [id, listingId, senderEmail, recipientEmail, message]);
          case 10:
            return _context.abrupt("return", {
              id: id,
              listingId: listingId,
              senderEmail: senderEmail,
              recipientEmail: recipientEmail,
              message: message
            });
          case 11:
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