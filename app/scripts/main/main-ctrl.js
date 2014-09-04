'use strict';

var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('ListCtrl', function($scope, Restangular) {

  $scope.games = Restangular.all('games').getList();

});

appControllers.controller('CreateCtrl', function($scope, $location, Restangular) {
  
  $scope.save = function() {  
    Restangular.all('games').post($scope.game).then(function(game) {
      $location.path('/');
//    $location.path('/edit/' + game._id.$oid);
      console.log('output:' + angular.toJson($scope.game));
    });
  }
});