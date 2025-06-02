"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMessageRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _uuid = require("uuid");
var createMessageRoute = exports.createMessageRoute = {
  method: 'POST',
  path: '/api/messages',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var _req$payload, listingId, senderEmail, message, id;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$payload = req.payload, listingId = _req$payload.listingId, senderEmail = _req$payload.senderEmail, message = _req$payload.message;
            id = (0, _uuid.v4)();
            _context.next = 4;
            return _database.db.query("INSERT INTO messages (id, listing_id, sender_email, message)\n       VALUES (?, ?, ?, ?)", [id, listingId, senderEmail, message]);
          case 4:
            return _context.abrupt("return", {
              id: id,
              listingId: listingId,
              senderEmail: senderEmail,
              message: message
            });
          case 5:
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