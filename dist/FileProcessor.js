'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = exports.getChecksum = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var getChecksum = exports.getChecksum = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(spark, section) {
    var chunk, endsBuffer, state, checksum;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getData(section);

          case 2:
            chunk = _context3.sent;

            // just grab the ends of the chunk for comparison.  Was running into major performance issues with big wav files
            endsBuffer = mergeArrayBuffers(chunk.slice(0, 20), chunk.slice(chunk.byteLength - 20, chunk.byteLength));

            spark.append(endsBuffer);
            // spark.append(chunk)
            state = spark.getState();
            checksum = spark.end();

            spark.setState(state);
            return _context3.abrupt('return', checksum);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getChecksum(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var getData = exports.getData = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(blob) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', new _es6Promise.Promise(function (resolve, reject) {
              var reader = new self.FileReader();
              reader.onload = function () {
                return resolve(reader.result.buffer ? reader.result.buffer : reader.result);
              };
              reader.onerror = reject;
              reader.readAsArrayBuffer(blob);
            }));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getData(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.mergeArrayBuffers = mergeArrayBuffers;

var _es6Promise = require('es6-promise');

var _sparkMd = require('spark-md5');

var _sparkMd2 = _interopRequireDefault(_sparkMd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileProcessor = function () {
  function FileProcessor(file, chunkSize, calculateChecksum) {
    (0, _classCallCheck3.default)(this, FileProcessor);

    this.calculateChecksum = calculateChecksum;
    this.chunkSize = chunkSize;
    this.file = file;
    this.paused = false;
    this.unpauseHandlers = [];
    this.debug = function () {};
  }

  (0, _createClass3.default)(FileProcessor, [{
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(fn) {
        var _this = this;

        var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var endIndex = arguments[2];
        var file, chunkSize, totalChunks, spark, processIndex, waitForUnpause;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                file = this.file, chunkSize = this.chunkSize;
                totalChunks = Math.ceil(file.size / chunkSize);
                spark = new _sparkMd2.default.ArrayBuffer();


                this.debug('Starting run on file:');
                this.debug(' - Total chunks: ' + totalChunks);
                this.debug(' - Start index: ' + startIndex);
                this.debug(' - End index: ' + (endIndex || totalChunks));

                processIndex = function () {
                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(index) {
                    var start, section, checksum, shouldContinue;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(index === totalChunks || index === endIndex)) {
                              _context.next = 3;
                              break;
                            }

                            _this.debug('File process complete');
                            return _context.abrupt('return');

                          case 3:
                            if (!_this.paused) {
                              _context.next = 6;
                              break;
                            }

                            _context.next = 6;
                            return waitForUnpause();

                          case 6:
                            start = index * chunkSize;
                            section = file.slice(start, start + chunkSize);
                            checksum = void 0;

                            if (!_this.calculateChecksum) {
                              _context.next = 13;
                              break;
                            }

                            _context.next = 12;
                            return getChecksum(spark, section);

                          case 12:
                            checksum = _context.sent;

                          case 13:
                            _context.next = 15;
                            return fn(checksum, index, section);

                          case 15:
                            shouldContinue = _context.sent;

                            if (!(shouldContinue !== false)) {
                              _context.next = 19;
                              break;
                            }

                            _context.next = 19;
                            return processIndex(index + 1);

                          case 19:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function processIndex(_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }();

                waitForUnpause = function waitForUnpause() {
                  return new _es6Promise.Promise(function (resolve) {
                    _this.unpauseHandlers.push(resolve);
                  });
                };

                _context2.next = 11;
                return processIndex(startIndex);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function run(_x) {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'pause',
    value: function pause() {
      this.paused = true;
    }
  }, {
    key: 'unpause',
    value: function unpause() {
      this.paused = false;
      this.unpauseHandlers.forEach(function (fn) {
        return fn();
      });
      this.unpauseHandlers = [];
    }
  }]);
  return FileProcessor;
}();

function mergeArrayBuffers(a, b) {
  var tmp = new Uint8Array(a.byteLength + b.byteLength);
  tmp.set(new Uint8Array(a), 0);
  tmp.set(new Uint8Array(b), a.byteLength);
  return tmp.buffer;
}

exports.default = FileProcessor;