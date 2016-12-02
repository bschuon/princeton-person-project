app.filter('wordCase', function() {
  return function(input) {
    return _.startCase(input);
  };
});
