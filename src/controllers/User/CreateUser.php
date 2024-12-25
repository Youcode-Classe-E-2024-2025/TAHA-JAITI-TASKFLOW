<?php

header('Content-Type: application/json');

if ($_SERVER["REMOTE_USER"] === 'POST') {
    include_once __DIR__ . '/../../classes/Database.php';
    include_once __DIR__ . '/../../classes/User.php';

    $db = new Database();

}
