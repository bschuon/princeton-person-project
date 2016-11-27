app.controller('ModalController', [
  "$scope",
  "close",
  function($scope, close) {
    $scope.dismissModal = function(result) {
      close(result, 200);
    };
  }
]);
