"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListingRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _boom = _interopRequireDefault(require("@hapi/boom"));
var _database = require("../database");
var getListingRoute = exports.getListingRoute = {
  method: 'GET',
  path: '/api/listings/{id}',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var id, _yield$db$query, results, dbRow, listing;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return _database.db.query('SELECT * FROM listings WHERE id = ?', [id]);
          case 3:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            if (results.length) {
              _context.next = 7;
              break;
            }
            throw _boom["default"].notFound("Listing does not exist with id ".concat(id));
          case 7:
            dbRow = results[0]; // Manually map snake_case keys to camelCase keys
            listing = {
              id: dbRow.id,
              name: dbRow.name,
              description: dbRow.description,
              price: dbRow.price,
              userId: dbRow.user_id,
              views: dbRow.views,
              imageUrl: dbRow.image_url
            };
            return _context.abrupt("return", listing);
          case 10:
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