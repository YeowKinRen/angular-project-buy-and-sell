"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staticFilesRoute = exports.fileRoutes = void 0;
var angularRoutePaths = ['/', '/listings', '/contact/{id}', '/edit-listing/{id}', '/listings/{id}', '/my-listings', '/new-listing'];
var fileRoutes = exports.fileRoutes = angularRoutePaths.map(function (path) {
  return {
    method: 'GET',
    path: path,
    handler: function handler(req, h) {
      return h.file('dist/buy-and-sell/browser/index.html');
    }
  };
});
var staticFilesRoute = exports.staticFilesRoute = {
  method: 'GET',
  path: '/{params*}',
  handler: {
    directory: {
      path: 'dist/buy-and-sell/browser/',
      index: ['index.html'],
      // Try serving index.html
      listing: false,
      // Don’t list files
      redirectToSlash: true
    }
  }
};