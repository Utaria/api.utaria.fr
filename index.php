<?php
require_once 'util.php';
require_once 'database.php';

// --- Mise en place du header JSON
header('Content-Type: application/json');

if(!isset($_GET["uri"])) $_GET["uri"] = "";

$uri  = $_GET["uri"];
$uri  = str_replace("/api", "", $uri);
$base = "methods";

$method_file = $base . $uri . ".php";

// On regarde si la méthode existe bien.
if(!file_exists($method_file)) error(1, "Methode inconnue.");
require_once $method_file;

// On regarde si la fonction run a bien été définie dans le fichier.
if (!function_exists("run")) error(2, "Appel de la methode impossible.");

if (isset($protected) && $protected) {
	if (!isset($_GET["token"]))
		error(10, "Token obligatoire pour appeler cette methode.");

	if (!in_array($_GET["token"], $AUTHORIZED_TOKENS))
		error(11, "Token incorrect.");
}

// On lance la méthode de l'API
unset($_GET["uri"]);
$results = run($_GET);

// Si elle ne retourne rien (mais pas true), on affiche "aucun résultat".
if(empty($results) && $results !== true) error(3, "Aucun resultat.");
if(is_string($results)) $results = array("resultat" => $results);

// On ajoute l'heure actuelle au retour
$results["request_time"] = time();

echo json_encode($results);
?>