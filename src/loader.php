<?php


//DB CONFIG
require_once __DIR__ . '/config/config.php';

//helpers
require_once __DIR__ . './helpers/secure.php';
require_once __DIR__ . './helpers/debug.php';

//AUTO LOADER
spl_autoload_register(function($className){
    require_once __DIR__ . '/classes/' . $className . '.php';
});