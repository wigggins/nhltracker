'use strict';

var appControllers;

appControllers = angular.module('appControllers', []);

// List Ctrl
appControllers.controller('ListCtrl', function($scope, Restangular) {


  $scope.games = Restangular.all('games').getList().$object;


  // Restangular.all('games').customGET('', {"q":{"name": "Eddins"}}).then(function(data) {
  //   $scope.results = data;
  //   console.log(data);
  // });

  // $scope.wiggins = _.where(game).visitor.player, function(player) {
  //   return player.name === 'Wiggins';
  // }

  // console.log($scope.wiggins);

  console.log(angular.toJson($scope.games, true));

});

// Create Ctrl
appControllers.controller('CreateCtrl', function($scope, $location, Restangular, PLAYERS, TEAMS) {
  
  $scope.teams = TEAMS;
  // $scope.players = PLAYERS;

  $scope.players = [
        { id: 0, name: 'Eddins'},
        { id: 1, name: 'Koch'},
        { id: 2, name: 'Wiggins'}
      ];

  console.log($scope.players, true);

  $scope.save = function() {  
    Restangular.all('games').post($scope.game).then(function(game) {
      $location.path('/');

      console.log('output:' + angular.toJson($scope.game, true));
    });
  }
});

// Edit Ctrl
appControllers.controller('EditCtrl', function($scope, $location, $stateParams, Restangular, PLAYERS, TEAMS) {

  var self = this;

  $scope.teams = TEAMS;
  $scope.players = PLAYERS;

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


    $scope.p2shots = game.visitor.p2.shots - game.visitor.p1.shots;

    $scope.p3shots = game.visitor.p3.shots - game.visitor.p2.shots;

    $scope.hppp = game.home.p3.ppo % game.home.p3.ppg;


    // console.log(p1shots);

    // console.log(angular.toJson(game.visitor.p1.shots, true));
  })
});

