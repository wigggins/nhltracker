'use strict';

var nhltracker;

nhltracker = angular.module('nhltracker', [
	'ngAnimate', 
	'ngCookies', 
	'ngTouch', 
	'ngSanitize', 
	'restangular', 
	'ui.router',
	'mgcrea.ngStrap',
	'appControllers'
]);

nhltracker.constant('PLAYERS', {
	0: {'id': 0, 'name': 'Koch'},
	1: {'id': 1, 'name': 'Eddins'},
	2: {'id': 2, 'name': 'Wiggins'}
});

nhltracker.constant('TEAMS', ['Anaheim Ducks','Boston Bruins','Buffalo Sabres','Calgary Flames','Carolina Hurricanes','Chicago Blackhawks','Colorado Avalanche','Columbus Blue Jackets','Dallas Stars','Detroit Red Wings','Edmonton Oilers','Florida Panthers','Los Angeles Kings','Minnesota Wild','Montreal Canadiens','Nashville Predators','New Jersey Devils','New York Islanders','New York Rangers','Philadelphia Flyers','Phoenix Coyotes','Pittsburgh Penguins','Ottawa Senators','San Jose Sharks','St Louis Blues','Tampa Bay Lightning','Toronto Maple Leafs','Vancouver Canucks','Washington Capitals','Winnipeg Jets']);


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
	  .state('game', {
	  	url: '/game/:gameId',
	  	templateUrl: 'partials/game.html',
	  	controller: 'GameCtrl'
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


