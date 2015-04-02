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

			SC.get('/tracks', { q: $scope.searchText, limit: 10}, function(tracks) {
				// get search result
				for (var i = 0; i < tracks.length; i++) {
					if (tracks[i].streamable && (tracks[i].policy == "ALLOW")) {
						$scope.searchResult.push({

							from: "sc",
							id: tracks[i].id,
							url: tracks[i].stream_url + "?client_id=" + client_id,
							judul: tracks[i].title,
							tanggal: tracks[i].created_at,
							deskripsi: tracks[i].description,
							thumbnail: tracks[i].artwork_url || tracks[i].user.avatar_url,
							meta: tracks[i]

						});
					}
				}
				$scope.$apply();
			});

			$http.get("https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=" + encodeURI($scope.searchText) + "&type=video&order=relevance&maxResults=10&key=" + google_id).
			success(function(res) {
				if (res.items.length > 0) {
					for (var i = 0; i < res.items.length; i++) {
						$scope.searchResult.push({

							from: "yt",
							id: res.items[i].id.videoId,
							url: "",
							judul: res.items[i].snippet.title,
							deskripsi: res.items[i].snippet.description,
							tanggal: res.items[i].snippet.publishedAt,
							thumbnail: res.items[i].snippet.thumbnails.default.url,
							meta: res.items[i]

						});
					}
				}
			}).
			error(function(res) {
				lg("Error On Youtube");
			});

		}
	}

}]);