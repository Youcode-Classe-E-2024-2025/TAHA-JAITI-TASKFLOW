<?php
//DB CONFIG
require_once __DIR__ . '/config/config.php';

//helpers
require_once __DIR__ . '/helpers/secure.php';
require_once __DIR__ . '/helpers/debug.php';

//AUTO LOADER
spl_autoload_register(function ($className) {
    $directories = [
        __DIR__ . '/classes',
        __DIR__ . '/controllers',
        __DIR__ . '/services',
        __DIR__ . '/models',
    ];

    $classPath = str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';

    foreach ($directories as $directory) {
        $file = $directory . DIRECTORY_SEPARATOR . $classPath;
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});