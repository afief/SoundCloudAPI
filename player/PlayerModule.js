var playerMod = angular.module("PlayerModule", []);

playerMod.service("playlist", function() {
	this.list = {
		_: {
			title: "Playlist Baru",
			songs: [],
			totalDuration: 0
		}
	};
	this.current = {};
	this.currentIndex = -1;

	this.setAt = function(index) {
		this.currentIndex = index;
	}
	this.getAt = function(index) {
		return this.current.songs[index];
	}
	this.isCurrent = function() {
		if (this.current.title)
			return true;
		return false;
	}
	this.resetDuration = function(listID) {
		this.list[listID].totalDuration = 0;
		for (var i = 0; i < this.list[listID].songs.length; i++) {
			this.list[listID].totalDuration += this.list[listID].songs[i].duration;
		}
	}
	this.add = function(listID, obj) {
		if (this.list[listID] == undefined) {
			lg("something wrong");
		} else {
			var ada = false;
			for (var i = 0; i < this.list[listID].songs.length; i++) {
				if (this.list[listID].songs[i].id == obj.id)
					ada = true;
			}
			if (!ada) {
				this.list[listID].songs.push(obj);
				this.list[listID].totalDuration += obj.duration;
				this.current = this.list[listID];
				return true;
			}
			else {
				lg("song already exist");
			}
			return false;
		}
	}
});

playerMod.directive('playlistDirective', ["$window", function ($window) {
	return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "player/playlist.html",
        controller: "playlistController"
    }
}]);

var yp;
playerMod.directive('playerDirective', ["$window", function ($window) {
	return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "player/player.html",
        link: function(scope, element) {
        	$window.onYouTubeIframeAPIReady = function() {
        		var yplayer = new YT.Player(element[0].children[0], {
        			playerVars: {
        				autoplay: 0,
        				html5: 1,
        				modesbranding: 0,
        				iv_load_policy: 3,
        				showinfo: 1,
        				controls: 1,
        			},
        			width: element[0].offsetWidth,
        			height: element[0].offsetWidth * 9 / 16
        		});
        		yp = yplayer;
        		scope.playYoutube = function(id) {
        			yplayer.getIframe().style.display = "block";
        			yplayer.loadVideoById(id);
        			scope.isPlay = true;
        			scope.playFrom = "yt";
        		}

        		lg("Youtube API Iframe Ready");
        	}
        },
        controller: "PlayerController"
    }
}]);

var ppl;
playerMod.controller("playlistController", ["$scope", "$location", "$element", "playlist", function($scope, $location, $element, playlist) {
	$scope.playlist = playlist;
	ppl = playlist;

	$scope.timeToStr = function(duration) {
		var jam = Math.floor(duration / 3600);
		duration -= jam * 3600;
		var menit = Math.floor(duration / 60);
		duration -= menit * 60;
		var detik = duration;

		var res = "";
		if (jam > 0)
			res += jam.toString() + " jam ";
		if (menit > 0)
			res += menit.toString() + " menit ";
		if (detik > 0)
			res += detik.toString() + " detik ";

		return res; 
	}

	$scope.dateFormat = function(date) {
		var a = new Date(date);
		return a.toLocaleString();
		//return a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes();
	}
}]);
playerMod.controller("PlayerController", ["$scope", "$location", "$element", "playlist", function($scope, $location, $element, playlist) {
	
	lg($element);

	var video = $element[0].children[1];
	video.volume = 0.1;
	video.src = "";

	$scope.isPlay = false;
	$scope.playerPlay = function() {
		lg("PLAY", video.src);
		video.play();
	}
	$scope.playerPause = function() {
		video.pause();
	}

	$scope.playUrl = function(url) {
		video.src = url;
		$scope.playerPlay();
	}

	$scope.playAt = function(index) {
		var song = playlist.getAt(index);
		playlist.setAt(index);
		$scope.playObject(song);
	}

	$scope.playObject = function(obj) {
		lg("play object", obj);
		if (obj.from == "sc") {
			$scope.playUrl(obj.url);
		} else if (obj.from = "yt") {
			$scope.playYoutube(obj.id);
		}
	}

	video.addEventListener("play", function() {
		$scope.isPlay = true;
		$scope.playFrom = "sc";
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