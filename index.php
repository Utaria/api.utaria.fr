<?php
require_once 'util.php';
require_once 'database.php';

// --- Mise en place du header JSON
header('Content-Type: application/json');

if(!isset($_GET["uri"])) $_GET["uri"] = "";

$uri  = trim($_GET["uri"], "/");
$base = "methods/";

$method_file = $base . $uri . ".php";

// On regarde si la méthode existe bien.
if(!file_exists($method_file)) error(404, "Not Found");
require_once $method_file;

// On regarde si la fonction run a bien été définie dans le fichier.
if (!function_exists("run")) error(404, "Not Found");

if (isset($protected) && $protected) {
	if (!isset($_GET["token"]))
		error(401, "Unauthorized", "Clé d'API requis");

	if (!in_array($_GET["token"], $AUTHORIZED_TOKENS))
		error(400, "Bad Request", "Token incorrect");
}

// On lance la méthode de l'API
unset($_GET["uri"]);
unset($_GET["token"]);

$results = run($_GET);

// Si elle ne retourne rien (mais pas true), on affiche "aucun résultat".
if(empty($results) && $results !== true)
	error(403, "Forbidden", "Aucun resultat");
if(is_string($results))
	$results = array("result" => $results);

// On ajoute l'heure actuelle au retour
$results["request_time"] = time();

// On renvoie le retour de la méthode de l'API.
echo json_encode($results);
?>