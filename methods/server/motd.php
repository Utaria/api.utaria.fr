<?php
function run($params) {
	require 'lib/minecraft/MinecraftPingException.php';
	require 'lib/minecraft/MinecraftPing.php';

	$ping = null;
	$p    = -1;

	try{
		$ping = new MinecraftPing("mc.utaria.fr");

		var_dump($ping->Query()); die();

	} catch( MinecraftPingException $e ) {
	} finally {
		if ($ping != null) $ping->Close();
	}

	return array("players" => $p);
}
?>