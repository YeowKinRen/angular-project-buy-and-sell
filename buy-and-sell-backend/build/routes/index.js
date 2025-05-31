"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _getAllListings = require("./getAllListings");
var _getListing = require("./getListing");
var _addViewToListing = require("./addViewToListing");
var _getUserListings = require("./getUserListings");
var _createNewListing = require("./createNewListing");
var _updateListing = require("./updateListing");
var _deleteListings = require("./deleteListings");
var _files = require("./files");
// Order matters: Angular routes BEFORE staticFilesRoute
var _default = exports["default"] = [
// API routes first
_getAllListings.getAllListingsRoute, _getListing.getListingRoute, _addViewToListing.addViewToListingRoute, _getUserListings.getUserListingsRoute, _createNewListing.createNewListingRoute, _updateListing.updateListingsRoute, _deleteListings.deleteListingsRoute,
// 1. Serve static assets
_files.staticFilesRoute].concat((0, _toConsumableArray2["default"])(_files.fileRoutes));