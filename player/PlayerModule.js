var playerMod = angular.module("PlayerModule", []);

playerMod.service("playlist", function() {
	this.list = [];

	this.add = function(url, judul, from, meta) {
		this.list.push({url: url, judul: judul, from: from, meta: meta});
	}
});

playerMod.directive('playerDirective', function () {
	return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "player/player.html",
        controller: "PlayerController"
    }
});

playerMod.controller("PlayerController", ["$scope", "$location", "$element", "playlist", function($scope, $location, $element, playlist) {
	
	var video = $element[0].firstElementChild;
	video.volume = 0.1;
	video.src = "";

	$scope.isPlay = false;
	$scope.playerPlay = function() {
		video.play();
	}
	$scope.playerPause = function() {
		video.pause();
	}
	$scope.playUrl = function(url) {
		video.src = url;
		video.play();
	}

	video.addEventListener("play", function() {
		$scope.isPlay = true;
		$scope.$apply();
	});
	video.addEventListener("pause", function() {
		$scope.isPlay = false;
		$scope.$apply();
	});
	video.addEventListener("ended", function() {
		$scope.isPlay = false;
		$scope.$apply();
	});

}]);