define(type: 'filter', definition: [
  '$log'
  ($log) ->
    (username) -> "@#{username}"
])