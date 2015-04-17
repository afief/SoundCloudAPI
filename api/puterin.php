<?php

$app->post("/new", function() {
	global $app;

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


function createNewPlaylist($id_user, $nama) {
	global $db;

	$pl_key = makeUniqueId(10) . uniqid();
	$insert = $db->insert("pu_playlist", ["key" => $pl_key, "id_user" => $id_user, "nama" => $nama, "public" => 1]);
	if ($insert >= 0) {
		return $pl_key;
	}
	return false;
}