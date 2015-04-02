var lg = console.log.bind(console);

 var client_id = "7e747f7d6f9eedfbf64282e8d5ef8673";
 var google_id = "AIzaSyAa_7-2J0rxr9c1b743i4RQvWTsezqboDY";
(function() {
	var toApp = angular.module("puterin", ["ngRoute", "ngSanitize", "PageModule", "SearchModule", "PlayerModule"]);

	toApp.run(['$rootScope', '$location', '$route', function($root, $location, $route) {
		$root.$on('$routeChangeStart', function(e, curr, prev) {
			
		});
		$root.$on('$routeChangeSuccess', function(e, curr, prev) { 
			
		});
	}]);



	//initialize SoundCloud
	SC.initialize({
		client_id: client_id
	});	
})();