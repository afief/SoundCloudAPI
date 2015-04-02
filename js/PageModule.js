var pageModule = angular.module("PageModule", []);

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
        controller: ['$scope', '$route', function ($scope, $route) {
        	
        }]
    }
});


/* Home Controller */
pageModule.controller("HomeController", ["$scope", "$location", function($scope, $location) {
	lg("PAGE HOME");

	
}]);