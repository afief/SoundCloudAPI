var playerMod = angular.module("PlayerModule", []);

playerMod.directive('playerDirective', function () {
	return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "player/player.html",
        controller: "PlayerController"
    }
});

playerMod.controller("PlayerController", ["$scope", "$location", "$element", function($scope, $location, $element) {
	
	var video = $element[0].firstElementChild;
	video.src = "video/audio.mp3";
	video.volume = 0.1;

	$scope.isPlay = false;
	$scope.playerPlay = function() {
		video.play();
	}
	$scope.playerPause = function() {
		video.pause();
	}

	video.addEventListener("play", function() {
		$scope.isPlay = true;
		$scope.$apply();
	});
	video.addEventListener("pause", function() {
		lg("oause");
		$scope.isPlay = false;
		$scope.$apply();
	});
	video.addEventListener("ended", function() {
		lg("ended");
		$scope.isPlay = false;
		$scope.$apply();
	});

}]);