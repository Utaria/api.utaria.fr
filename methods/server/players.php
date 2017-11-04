<?php
function run($params) {
	require 'lib/minecraft/MinecraftPingException.php';
	require 'lib/minecraft/MinecraftPing.php';

	$ping = null;
	$p    = -1;

	try{
		$ping = new MinecraftPing("mc.utaria.fr");

		$p = $ping->Query()["players"]["online"];
	} catch( MinecraftPingException $e ) {
	} finally {
		if ($ping != null) $ping->Close();
	}

	return array("players" => $p);
}
?>