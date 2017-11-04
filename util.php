<?php
function error($code = 500, $error, $message = "") {
	header("HTTP/1.0 $code $error");

	echo json_encode(array(
		"error" => $error,
		"status" => $code,
		"message" => $message
	));


	exit();
	die();
}

function getDB() {
	$db = new Database();
	$db->connect("localhost", "api", "+87*A9Rn^Y:*_8_a:x", "utaria");

	return $db;
}

$AUTHORIZED_TOKENS = array(
	"z8v5dDMU2BhX4cDVAVjds6VnyvvebyrS5KdzD8CeauZZErz5Nf", // Services de jeu
	"r8huBnSFK8qc4Kuq5Ke3ehgBDcm9HjAB8RLUuPkyqypzXGupbz"  // Services Web
);

?>