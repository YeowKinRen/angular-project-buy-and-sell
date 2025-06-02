"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessagesRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getMessagesRoute = exports.getMessagesRoute = {
  method: 'GET',
  path: '/api/messages/{listingId}',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var listingId, _yield$db$query, results, messages;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            listingId = req.params.listingId;
            _context.next = 3;
            return _database.db.query("SELECT * FROM messages WHERE listing_id = ? ORDER BY timestamp DESC", [listingId]);
          case 3:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            // Convert all rows to camelCase keys
            messages = results.map(function (row) {
              return {
                id: row.id,
                listingId: row.listing_id,
                senderEmail: row.sender_email,
                recipientEmail: row.recipient_email,
                message: row.message,
                timestamp: row.timestamp
              };
            });
            return _context.abrupt("return", messages);
          case 7:
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