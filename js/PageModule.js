var pageModule = angular.module("PageModule", ["UserModule"]);

pageModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController',
			authenticate: false
		}).
		otherwise({
			redirectTo: '/'
		});
	}
	]);

pageModule.directive('header', function () {
	return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "pages/header.html",
        controller: ['$scope', '$route', "user", function ($scope, $route, user) {
        	user.cek().success(function(res) {
        		lg("result", res);
        	});
        }]
    }
});
pageModule.directive("popupLogin", function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: "pages/login.html",
		controller: ["$scope", "$route", function($scope, $route) {
			$scope.loginshow = false;
			$scope.logindata = {
				username: "",
				password: "",
				remember: true
			}
			$scope.showLogin = function() {
				$scope.registershow = false;
				$scope.loginshow = true;
			}
			$scope.hideLogin = function() {
				$scope.loginshow = false;
			}
			$scope.userLogin = function() {
				lg($scope.logindata);
			}
		}]
	}
});

pageModule.directive("popupRegister", function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: "pages/register.html",
		controller: ["$scope", "$route", function($scope, $route) {
			$scope.registershow = false;
			$scope.registerdata = {
				username: "",
				email: "",
				password: "",
				password2: "",
			}
			$scope.showRegister = function() {
				$scope.registershow = true;
				$scope.loginshow = false;
			}
			$scope.hideRegister = function() {
				$scope.registershow = false;
			}
			$scope.userRegister = function() {
				lg($scope.registerdata);
			}
		}]
	}
});


/* Home Controller */
pageModule.controller("HomeController", ["$scope", "$location", function($scope, $location) {
	lg("PAGE HOME");

	
}]);