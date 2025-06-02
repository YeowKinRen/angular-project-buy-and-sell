"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageHistoryRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getMessageHistoryRoute = exports.getMessageHistoryRoute = {
  method: 'GET',
  path: '/api/messages/history/{listingId}',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var listingId, email, _yield$db$query, results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            listingId = req.params.listingId;
            email = req.query.email;
            console.log(email);
            _context.next = 5;
            return _database.db.query("SELECT * FROM messages\n       WHERE listing_id = ?\n       AND (sender_email = ? OR recipient_email = ?)\n       ORDER BY timestamp ASC", [listingId, email, email]);
          case 5:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            return _context.abrupt("return", results.map(function (row) {
              return {
                id: row.id,
                listingId: row.listing_id,
                senderEmail: row.sender_email,
                recipientEmail: row.recipient_email,
                message: row.message,
                timestamp: row.timestamp
              };
            }));
          case 8:
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