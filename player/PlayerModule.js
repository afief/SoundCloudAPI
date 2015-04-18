var playerMod = angular.module("PlayerModule", []);

playerMod.service("playlist", function() {
	this.list = {
	};
	this.current = {};
	this.currentIndex = -1; //current song index

	this.setAt = function(index) {
		this.currentIndex = index;
	}
	this.getAt = function(index) {
		return this.current.songs[index];
	}
	this.nextSong = function() {
		if (this.current && (this.currentIndex < (this.current.songs.length-1))) {
			this.currentIndex++;
			return this.current.songs[this.currentIndex];
		}
		return null;
	}
	this.prevSong = function() {
		if (this.current && (this.currentIndex > 0)) {
			this.currentIndex--;
			return this.current.songs[this.currentIndex];
		}
		return null;
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
				this.current.key = listID;
				return true;
			}
			else {
				lg("song already exist");
			}
			return false;
		}
	}
	this.createNew = function(key, nama) {
		this.list[key] = {
			title: nama,
			songs: [],
			totalDuration: 0
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
        		yplayer.addEventListener("onReady", onReady);
        		yplayer.addEventListener("onStateChange", onStateChange);

        		function onReady() {
        			lg("Youtube Ready");
        		}
        		function onStateChange(e) {
        			if (e.data == YT.PlayerState.ENDED) {
        				yplayer.getIframe().style.display = "none";
        				scope.playNextSong();
        			} else if (e.data == YT.PlayerState.PAUSED) {
        				scope.isPaused = true;
        				scope.isPlay = false;
        				scope.$apply();
        				lg("PAUSED");
        			} else if (e.data == YT.PlayerState.PLAYING) {
        				scope.isPlay = true;
        				scope.isPaused = false;
        				scope.$apply();
        				lg("PLAYING");
        			}
        		}

        		yp = yplayer;
        		scope.resumeYoutube = function() {
        			scope.isPlay = true;
        			scope.isPaused = false;
        			yplayer.playVideo();
        		}
        		scope.pauseYoutube = function() {
        			scope.isPlay = false;
        			scope.isPaused = true;
        			yplayer.pauseVideo();
        		}
        		scope.playYoutube = function(id) {
        			yplayer.getIframe().style.display = "block";
        			yplayer.loadVideoById(id);
        			scope.isPlay = true;
        			scope.isPaused = false;
        		}
        		scope.stopYoutube = function() {
        			yplayer.getIframe().style.display = "none";
        			yplayer.stopVideo();
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

	$scope.seekBar = SeekBarObject();

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

	$scope.currentSong = {};

	//lg($element);
	var video = $element[0].children[1];
	video.volume = 0.1;
	video.src = "";

	$scope.isPlay = false;
	$scope.isPaused = false;
	$scope.playerPlay = function() {
		//lg("PLAY", video.src);
		$scope.isPlay = true;
		$scope.isPaused = false;
		video.play();
	}
	$scope.playerPause = function() {
		$scope.isPlay = false;
		$scope.isPaused = true;
		video.pause();
	}

	$scope.playerStop = function() {
		$scope.isPaused = false;
		$scope.isPlay = false;
		video.pause();
		video.src = "";
	}

	$scope.playUrl = function(url) {
		video.src = url;
		$scope.playerPlay();
	}

	$scope.playAt = function(index) {
		if ($scope.isPlay) {
			if ($scope.playFrom == "sc")
				$scope.playerStop();
			else if ($scope.playFrom == "yt")
				$scope.stopYoutube();
		}

		var song = playlist.getAt(index);
		playlist.setAt(index);
		$scope.playObject(song);
	}

	$scope.playObject = function(obj) {
		//lg("play object", obj);
		if (obj.from == "sc") {
			$scope.playFrom = "sc";
			$scope.playUrl(obj.url);
		} else if (obj.from = "yt") {
			$scope.playFrom = "yt";
			$scope.playYoutube(obj.id);
		}
		$scope.currentSong = obj;
		$scope.thumbnail = obj.thumbnail;
	}

	//player controller
	$scope.controlPlay = function() {
		if ($scope.playFrom == "yt") {
			$scope.resumeYoutube();
		} else if ($scope.playFrom == "sc") {
			video.play();
		}
	}
	$scope.controlPause = function() {
		if ($scope.playFrom == "yt") {
			$scope.pauseYoutube();
		} else if ($scope.playFrom == "sc") {
			$scope.playerPause();
		}
	}

	$scope.playNextSong = function() {
		var ns = playlist.nextSong();
		if (ns != null) {
			$scope.playObject(ns);
		} else {
			lg("end of playlist");
		}
		$scope.$apply();
	}
	$scope.playPrevSong = function() {
		var ns = playlist.nextSong();
		if (ns != null) {
			$scope.playObject(ns);
		} else {
			lg("end of playlist");
		}
		$scope.$apply();
	}

	//soundcloud event listener
	video.addEventListener("play", function() {
		$scope.isPlay = true;
		$scope.isPaused = false;
		$scope.$apply();
	});
	video.addEventListener("pause", function() {
		$scope.isPlay = false;
		$scope.isPaused = true;
		$scope.$apply();
	});
	video.addEventListener("ended", function() {
		$scope.isPlay = false;
		$scope.isPaused = false;
		$scope.playNextSong();
		$scope.$apply();
	});

	video.addEventListener("timeupdate", function(e) {		
		$scope.seekBar.seekToPercent(video.currentTime / video.duration * 100);
	});

}]);
