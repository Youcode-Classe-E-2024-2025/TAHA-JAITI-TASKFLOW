<?php

require_once __DIR__ . './src/loader.php';

$db = new Database();

$conn = $db->getConnection();

$conn->prepare("SELECT");

$user = new User($db);
$user->username = 'ABDO';
$user->email = 'abdo@dnfsdf.com';
$user->password = 'adsfhsdk';
$user->role = 'supervisor';
$user->addUser();