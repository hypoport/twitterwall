define(type: "service", definition : [
  '$log',
  ($log) ->
    @._searchValue = ""
    @._valueChangeListeners = []

    @.setSearchValue = (newSearchValue) ->
      if @._searchValue != newSearchValue
        @._searchValue = newSearchValue
        @.fireValueChange(newSearchValue)
      return

    @.onSearchValueChanged = (valueChangeListener) ->
      @._valueChangeListeners.push(valueChangeListener)
      return

    @.fireValueChange = (newSearchValue) ->
      for listener in @._valueChangeListeners
        try
          listener(newSearchValue)
        catch error
          $log.log(error)
      return
    return @
])
