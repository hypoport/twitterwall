define({
  type: "service",
  definition: [
    'logger', function (logger) {
      this._searchValue = "";
      this._valueChangeListeners = [];
      _logger = logger.getLogger("twitterwallModelHolder");
      _logger.setLogLevel(logger.LogLevel.DEBUG);

      this.setSearchValue = function (newSearchValue) {
        if (this._searchValue !== newSearchValue) {
          _logger.debug("value change, oldValue: " + this._searchValue + ", newValue: " + newSearchValue);
          this._searchValue = newSearchValue;
          this.fireValueChange(newSearchValue);
        }
      };
      this.onSearchValueChanged = function (valueChangeListener) {
        this._valueChangeListeners.push(valueChangeListener);
      };
      this.fireValueChange = function (newSearchValue) {
        var error, listener, _i, _len, _ref;
        _ref = this._valueChangeListeners;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          listener = _ref[_i];
          try {
            listener(newSearchValue);
          } catch (_error) {
            error = _error;
            _logger.log(error);
          }
        }
      };
      return this;
    }
  ]
});
