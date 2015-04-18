<?php

$app->post("/new", function() {
	global $app;

	$result = new stdClass();
	$result->status = false;

	$data = getPosts();

	if (isset($data["key"]) && isset($data["nama"])) {
		$user = getUserByKey($data["key"]);
		if ($user) {

			$pl_key = createNewPlaylist($user["id"], $data["nama"]);
			if ($pl_key) {
				$result->status = true;
				$result->key = $pl_key;
			} else {
				$result->message = "failed";
			}

		} else {
			$result->message = "key_invalid";
		}
	} else {
		$result->message = "sketcy";
	}

	echo json_encode($result);
});

$app->post("/songs", function() {
	global $app;

	$result = new stdClass();
	$result->status = false;

	$data = getPosts();

	if (isset($data["key"]) && isset($data["pl_key"]) && isset($data["songs"])) {
		$user = getUserByKey($data["key"]);
		if ($user) {
			$playlist = getPlaylistByKey($data["pl_key"]);
			if ($playlist) {
				$songs = json_decode($data["songs"]);
				$ids = array();
				for ($i = 0; $i < count($songs); $i++) {
					//print_r($songs[$i]);
					$sid = addSongToPlaylist($songs[$i], $playlist["id"]);
					array_push($ids, $sid);
				}
				$result->status = true;
				$result->data = $ids;
			}

		} else {
			$result->message = "key_invalid";
		}
	} else {
		$result->message = "sketcy";
	}

	echo json_encode($result);
});


function createNewPlaylist($id_user, $nama) {
	global $db;

	$pl_key = makeUniqueId(10) . uniqid();
	$insert = $db->insert("pu_playlist", ["key" => $pl_key, "id_user" => $id_user, "nama" => $nama, "public" => 1]);
	if ($insert >= 0) {
		return $pl_key;
	}
	return false;
}
function getPlaylistByKey($pl_key) {
	global $db;

	$playlist = $db->get("pu_playlist", "*", ["key" => $pl_key]);
	if ($playlist) {
		return $playlist;
	}
	return false;
}
function addSongToPlaylist($song, $id_playlist) {
	global $db;

	$cek = $db->count("pu_songs", ["AND" => ["id_playlist" => $id_playlist, "id" => $song->id]]);	

	if ($cek == 0) {

		$insertData = [
		"id_playlist"	=> $id_playlist,
		"from"			=> $song->from,
		"id"			=> $song->id,
		"url"			=> $song->url,
		"judul"			=> $song->judul,
		"duration"		=> $song->duration,
		"tanggal"		=> $song->tanggal,
		"deskripsi"		=> $song->deskripsi,
		"thumbnail"		=> $song->thumbnail,
		"meta"			=> json_encode($song->meta)
		];

		$insert = $db->insert("pu_songs", $insertData);
		if ($insert >= 0) {
			return $song->id;
		}
	}
	return false;
}