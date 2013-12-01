define({
  type: 'filter',
  definition: [
    '$log', function($log) {
      return function(username) {
        return "@" + username;
      };
    }
  ]
});
