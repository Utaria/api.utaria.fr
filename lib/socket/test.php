<?php
require 'SocketClient.php';

$client = new SocketClient("127.0.0.1", 55056);

$output = new DataOutputStream();
$output->writeInt(5);
// $output->writeBoolean(true);

fwrite($client->getSocket(), $output->toByteArray());

$client->disconnect();

?>