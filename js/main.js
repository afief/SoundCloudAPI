var lg = console.log.bind(console);

(function() {
	var toApp = angular.module("puterin", ["ngRoute", "PageModule", "PlayerModule"]);

	toApp.run(['$rootScope', '$location', '$route', function($root, $location, $route) {
		$root.$on('$routeChangeStart', function(e, curr, prev) {
			
		});
		$root.$on('$routeChangeSuccess', function(e, curr, prev) { 
			
		});
	}]);

})();