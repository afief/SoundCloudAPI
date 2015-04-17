var userModule = angular.module("UserModule", [], ["$httpProvider", function($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}]);

userModule.factory("user", ["$http","$q", function($http, $q) {

	var key = window.localStorage.getItem("key") || "";
	var isLogin = false;

	function changeKey(newKey) {
		key = newKey;
		window.localStorage.setItem("key", key);
		console.log("change key", key);
	}
	function getFalse() {
		return {status: false, message: "Connection Error"};
	}

	serialize = function(obj, prefix) {
		var str = [];
		for(var p in obj) {
			if (obj.hasOwnProperty(p)) {
				var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
				str.push(typeof v == "object" ?
					serialize(v, k) :
					encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
		}
		return str.join("&");
	}

	return {
		getKey: function() {
			return key;
		},
		isLogin: function() {
			return isLogin;
		},
		login: function(credential) {
			var deferred = $q.defer();
			$http.post("api/login", serialize(credential)).
			success(function(res) {
				if (res.status) {
					changeKey(res.key);
					isLogin = true;
				}
				deferred.resolve(res);
			}).
			error(deferred.resolve);

			return deferred.promise;
		},
		cek: function() {
			console.log("key", key);	

			var deferred = $q.defer();

			if (key == "")
				return $q.when({status: false});

			$http.post("api/user", serialize({key: key})).
			success(function(res) {
				if (res.status) {
					isLogin = true;
				}
				deferred.resolve(res);
			}).
			error(deferred.resolve);

			return deferred.promise;
		},
		changeKey: changeKey,
		logout: function() {

			var deferred = $q.defer();

			$http.post("api/logout", serialize({key: key})).
			success(function(data) {
				if (data.status) {
					isLogin = false;
				}
				changeKey("");
				deferred.resolve(data);
			}).
			error(function(err) {
				changeKey("");
				deferred.resolve(err);
			});

			return deferred.promise;
		},


		//puterin stuff
		createNewPlaylist: function(nama) {
			var deffered = $q.defer();

			$http.post("api/new", serialize({key: key, nama: nama})).
			success(function(res) {
				if (res.status) {
					deffered.resolve(res.key);
				} else {
					deffered.resolve(false);
				}
			}).
			error(function(err) {
				deffered.resolve(false);
			});
			return deffered.promise;
		}
	}

}]);

userModule.factory("connectivity", function() {
	return {
		checkStatus: function(hres) {
			if (hres.status <= 0)
				return "Koneksi mati. Mohon periksa kembali jaringan anda.";
			else if (hres <= 199)
				return "Gagal (" + hres.status + "): " + hres.statusText;
			else if (hres <= 299)
				return "Gagal mengambil data melalui akun anda. Cobalah untuk keluar, lalu masuk kembali ke aplikasi";
			else if (hres <= 399)
				return "Terjadi kesalahan koneksi. Koneksi dialihkan";
			else if (hres <= 499)
				return "Terjadi kesalahan ketika mengakses server.";
			else
				return "Terjadi kesalahan pada server. Hubungi administrator";
		}
	}
});