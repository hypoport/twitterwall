define({
  type: "service",
  definition: ['$log',
    function ($log) {
      'use strict';

      var _service = this;

      _service.LogLevel = {
        DEBUG: {weight: 16},
        INFO: {weight: 8},
        WARN: {weight: 4},
        ERROR: {weight: 2}
      }

      function _Logger(context) {

        var _context = " " + context + ": ";
        var _logLevel = _service.LogLevel.DEBUG;

        this.setLogLevel = function (level) {
          _logLevel = level;
        }

        this.debug = function (message) {
          if (_isLogLevelEnabled(_service.LogLevel.DEBUG)) {
            $log.debug(_concat(message));
          }
        };

        this.info = function (message) {
          if (_isLogLevelEnabled(_service.LogLevel.INFO)) {
            $log.info(_concat(message));
          }
        }

        this.warn = function (message) {
          if (_isLogLevelEnabled(_service.LogLevel.WARN)) {
            $log.warn(_concat(message));
          }
        };

        this.error = function (message) {
          $log.error(_concat(message));
        };

        var _isLogLevelEnabled = function (level) {
          return level.weight <= _logLevel.weight;
        }

        var _getTimestamp = function () {
          return "[" + new Date().toLocaleTimeString() + "]";
        }

        var _concat = function (message) {
          return _getTimestamp() + _context + message;
        }
      }

      this.newInstance = function (contextName) {
        return new _Logger(contextName);
      }
    }
  ]
});