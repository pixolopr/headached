// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var myapp = angular.module('starter', ['ionic', 'controllers', 'database'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "templates/menu.html",
			controller: 'AppCtrl'
		})
		.state('app.terms', {
			url: "/terms",
			views: {
				'menuContent': {
					templateUrl: "templates/terms.html"
				}
			}
		})
		.state('app.signup', {
			url: "/signup",
			views: {
				'menuContent': {
					templateUrl: "templates/signup.html",
					controller: 'signupCtrl'
				}
			}
		})
		.state('app.login', {
			url: "/login",
			views: {
				'menuContent': {
					templateUrl: "templates/login.html",
					controller: 'loginCtrl'
				}
			}
		})
		.state('app.questions', {
			url: "/questions",
			views: {
				'menuContent': {
					templateUrl: "templates/questions.html",
					controller: 'questionsCtrl'
				}
			}
		})

	.state('app.answers', {
			url: "/answers",
			views: {
				'menuContent': {
					templateUrl: "templates/answers.html",
					controller: 'answersCtrl'
				}
			}
		})
		.state('app.report', {
			url: "/report",
			views: {
				'menuContent': {
					templateUrl: "templates/report.html",
					controller: 'reportCtrl'
				}
			}
		});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/questions');
});