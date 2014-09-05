'use strict';

var appControllers;

appControllers = angular.module('appControllers', []);

// List Ctrl
appControllers.controller('ListCtrl', function($scope, Restangular) {

  $scope.games = Restangular.all('games').getList().$object;


});

// Create Ctrl
appControllers.controller('CreateCtrl', function($scope, $location, Restangular) {
  
  $scope.teams = ["Anaheim Ducks","Boston Bruins","Buffalo Sabres","Calgary Flames","Carolina Hurricanes","Chicago Blackhawks","Colorado Avalanche","Columbus Blue Jackets","Dallas Stars","Detroit Red Wings","Edmonton Oilers","Florida Panthers","Los Angeles Kings","Minnesota Wild","Montreal Canadiens","Nashville Predators","New Jersey Devils","New York Islanders","New York Rangers","Philadelphia Flyers","Phoenix Coyotes","Pittsburgh Penguins","Ottawa Senators","San Jose Sharks","St Louis Blues","Tampa Bay Lightning","Toronto Maple Leafs","Vancouver Canucks","Washington Capitals","Winnipeg Jets"];

  $scope.players = [
        { id: '1', name: 'Eddins'},
        { id: '2', name: 'Koch'},
        { id: '3', name: 'Wiggins'}
      ];

  $scope.save = function() {  
    Restangular.all('games').post($scope.game).then(function(game) {
      $location.path('/');

      console.log('output:' + angular.toJson($scope.game, true));
    });
  }
});

// Edit Ctrl
appControllers.controller('EditCtrl', function($scope, $location, $stateParams, Restangular) {

  var self = this;

  Restangular.one('games', $stateParams.gameId).get().then(function(game) {
    self.original = game;
    $scope.game = Restangular.copy(self.original);
  });

  $scope.isClean = function() {
    return angular.equals(self.original, $scope.game);
  }

  $scope.destroy = function() {
    self.original.remove().then(function() {
      $location.path('/');
    })
  };

  $scope.save = function() {
    $scope.game.put().then(function() {
      $location.path('/');
    });
  };
});

// Game Ctrl
appControllers.controller('GameCtrl', function ($scope, $location, $stateParams, Restangular) {
  Restangular.one('games', $stateParams.gameId).get().then(function(game) {
    $scope.game = game;

    console.log($scope.game);
  })
});

