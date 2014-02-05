define({
  type: "service",
  definition: ['$log',
    function ($log) {
      'use strict';

      function _Logger(context) {
        var _context = " " + context + ": ";

        this.info = function (message) {
          $log.info(_concat(message));
        }

        this.debug = function (message) {
          $log.debug(_concat(message));
        };

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