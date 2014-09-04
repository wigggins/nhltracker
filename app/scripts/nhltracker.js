'use strict';

var nhltracker;

nhltracker = angular.module('nhltracker', [
	'ngAnimate', 
	'ngCookies', 
	'ngTouch', 
	'ngSanitize', 
	'restangular', 
	'ui.router'
]);


nhltracker.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
	$stateProvider
	  .state('home', {
	    url: '/',
	    templateUrl: 'partials/main.html',
	    controller: 'ListCtrl'
	  })
	  .state('edit', {
	  	url: '/edit/:gameId',
	  	templateUrl: 'partials/new.html',
	  	controller: 'EditCtrl'
	  })
	  .state('new', {
	  	url: '/new',
	  	templateUrl: 'partials/new.html',
	  	controller: 'CreateCtrl'
	  });

	$urlRouterProvider.otherwise('/');

	// Restangular Setup
	RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/nhlstats/collections');
      RestangularProvider.setDefaultRequestParams({ apiKey: 'HdwdLBr1qOcc3h1bb9UJ7xsvnxdoNyRF' })
      RestangularProvider.setRestangularFields({
        id: '_id.$oid'
      });
      
      RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
        
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      })
});

function ListCtrl($scope, Restangular) {
  $scope.games = Restangular.all('games').getList();
}


function CreateCtrl($scope, $location, Restangular) {
  $scope.save = function() {  
    Restangular.all('games').post($scope.game).then(function(game) {
      $location.path('/edit/' + game._id.$oid);
    });
  }
}


function EditCtrl($scope, $location, $routeParams, Restangular) {
  var self = this;

  Restangular.one('games', $routeParams.gameId).get().then(function(game) {
    self.original = game;
    $scope.game = Restangular.copy(self.original);
  });
  

  $scope.isClean = function() {
    return angular.equals(self.original, $scope.game);
  }

  $scope.destroy = function() {
    self.original.remove().then(function() {
      $location.path('/list');
    })
  };

  $scope.save = function() {
    $scope.game.put().then(function() {
      $location.path('/');
    });
  };
}



