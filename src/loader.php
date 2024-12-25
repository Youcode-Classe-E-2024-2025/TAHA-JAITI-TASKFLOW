<?php
//DB CONFIG
require_once __DIR__ . '/config/config.php';

//helpers
require_once __DIR__ . './helpers/secure.php';
require_once __DIR__ . './helpers/debug.php';

//AUTO LOADER
spl_autoload_register(function ($className) {
    // Convert namespace to file path
    $file = __DIR__ . '/classes/' . str_replace('\\', '/', $className) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

spl_autoload_register(function ($className) {
    // Convert namespace to file path
    $file = __DIR__ . '/controllers/' . str_replace('\\', '/', $className) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

spl_autoload_register(function ($className) {
    // Convert namespace to file path
    $file = __DIR__ . '/services/' . str_replace('\\', '/', $className) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

spl_autoload_register(function ($className) {
    // Convert namespace to file path
    $file = __DIR__ . '/models/' . str_replace('\\', '/', $className) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});