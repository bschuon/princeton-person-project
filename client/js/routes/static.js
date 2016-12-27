app.config([
  "$stateProvider",
  function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: '/partials/static/main.html'
    }).state('about', {
      url: '/about',
      templateUrl: '/partials/static/about.html'
    }).state('contact', {
      url: '/contact',
      templateUrl: '/partials/static/contact.html'
    }).state('terms', {
      url: '/terms',
      templateUrl: '/partials/static/terms.html'
    });
  }
]);
