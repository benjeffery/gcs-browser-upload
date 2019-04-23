'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safePut = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var safePut = exports.safePut = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var res,
        _args = arguments;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios2.default.put.apply(null, _args);

          case 3:
            res = _context.sent;

            (0, _debug2.default)('\'PUT\' request response: ' + res);
            // debug(`'PUT' request response status: ${res.status}`)
            // debug(`'PUT' request response headers: ${JSON.stringify(res.headers)}`)
            // debug(`'PUT' request response body: ${res.data}`)
            return _context.abrupt('return', res);

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            // if (e instanceof Error) {
            //   console.log(e.response.status, e.response.statusText, e.response.headers)
            //   throw e
            // } else {
            // console.log(e.response.status, e.response.statusText, e.response.headers)
            (0, _debug2.default)('\'PUT\' error request response: ' + _context.t0.response);
            // debug(`'PUT' error response status: ${e.response.status}`)
            // debug(`'PUT' error response headers: ${JSON.stringify(e.response.headers)}`)
            // debug(`'PUT' error response body: ${e.response.data}`)
            return _context.abrupt('return', _context.t0.response);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  }));

  return function safePut() {
    return _ref.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// axios.create({
//   maxRedirects: 0
// })

_axios2.default.defaults.maxRedirects = 0;