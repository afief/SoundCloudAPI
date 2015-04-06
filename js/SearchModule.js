var searchMod = angular.module("SearchModule", []);

searchMod.directive('searchDirective', function () {
	return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "pages/search.html",
        controller: "SearchController"
    }
});

searchMod.controller("SearchController", ["$scope", "$location", "$element", "$http", "playlist", function($scope, $location, $element, $http,playlist) {

	lg("Search Controller");

	$scope.searchResult = [];
	$scope.searchText = "";

	$scope.searchSubmit = function(e) {
		if ($scope.searchText.length > 2) {

			$scope.searchResult = [];

			SC.get('/tracks', { q: $scope.searchText, limit: 5}, function(tracks) {
				// get search result
				lg("Soundcloud Search", tracks);
				for (var i = 0; i < tracks.length; i++) {
					if (tracks[i].streamable && (tracks[i].policy == "ALLOW")) {
						$scope.searchResult.push({

							from: "sc",
							id: tracks[i].id,
							url: tracks[i].stream_url + "?client_id=" + client_id,
							judul: tracks[i].title,
							duration: Math.floor(tracks[i].duration / 1000),
							tanggal: tracks[i].created_at,
							deskripsi: tracks[i].description,
							thumbnail: tracks[i].artwork_url || tracks[i].user.avatar_url,
							meta: tracks[i]

						});
					}
				}
				$scope.$apply();
			});

			$http.get("https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=" + encodeURI($scope.searchText) + "&videoLicense=creativeCommon&type=video&order=relevance&maxResults=5&key=" + google_id).
			success(function(res) {
				lg("Youtube Search", res);
				if (res.items.length > 0) {
					for (var i = 0; i < res.items.length; i++) {
						$scope.searchResult.push({

							from: "yt",
							id: res.items[i].id.videoId,
							url: "",
							judul: res.items[i].snippet.title,
							duration: 0,
							deskripsi: res.items[i].snippet.description,
							tanggal: res.items[i].snippet.publishedAt,
							thumbnail: res.items[i].snippet.thumbnails.default.url,
							meta: res.items[i]

						});
					}
				}
			}).
			error(function(res) {
				lg("error", res);
			});
		}
	}

	$scope.resultClick = function(res) {
		if (res.from == "yt") {
			if (playlist.add("_", res))
				lg(playlist.current);

			$http.get("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=" + res.id + "&key=" + google_id).
			success(function(dat) {
				lg("content details", dat);
				if (dat.items.length > 0) {
					res.duration = youtubeTime(dat.items[0].contentDetails.duration);
					playlist.resetDuration('_');
				}
			}).
			error(function(err) {
				lg("error", err);
			});
		} else if (res.from == "sc") {
			if (playlist.add("_", res))
				lg(playlist.current);
			playlist.resetDuration('_');
		}
	}

}]);


function youtubeTime(duration) {
	var a = duration.match(/\d+/g);

	if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
		a = [0, a[0], 0];
	}

	if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
		a = [a[0], 0, a[1]];
	}
	if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
		a = [a[0], 0, 0];
	}

	duration = 0;

	if (a.length == 3) {
		duration = duration + parseInt(a[0]) * 3600;
		duration = duration + parseInt(a[1]) * 60;
		duration = duration + parseInt(a[2]);
	}

	if (a.length == 2) {
		duration = duration + parseInt(a[0]) * 60;
		duration = duration + parseInt(a[1]);
	}

	if (a.length == 1) {
		duration = duration + parseInt(a[0]);
	}
	return duration
}