<?php

require_once __DIR__ . './src/loader.php';

$db = new Database();

$conn = $db->getConnection();

$conn->prepare("SELECT");