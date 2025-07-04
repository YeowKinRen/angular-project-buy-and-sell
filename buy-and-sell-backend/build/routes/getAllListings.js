"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllListingsRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getAllListingsRoute = exports.getAllListingsRoute = {
  method: 'GET',
  path: '/api/listings',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var _yield$db$query, results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database.db.query('SELECT * FROM listings');
          case 2:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            return _context.abrupt("return", results.map(function (dbRow) {
              return {
                id: dbRow.id,
                name: dbRow.name,
                description: dbRow.description,
                price: dbRow.price,
                userId: dbRow.user_id,
                views: dbRow.views,
                imageUrl: dbRow.image_url
              };
            }));
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