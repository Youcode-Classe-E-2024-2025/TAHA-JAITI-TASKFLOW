<?php

require_once __DIR__ . '/src/loader.php';

$db = new Database();

$conn = $db->getConnection();

$router = new Router();

$userController = new UserController($conn);
$taskController = new TaskController($conn);

$router->addRoute('POST', '/register', function() use ($userController) {
    $userController->registerUser();
});

$router->addRoute('POST', '/login', function() use ($userController) {
    $userController->loginUser();
});

$router->addRoute('POST', '/createbug', function() use ($taskController) {
    $taskController->createBug();
});

$router->handleRequest($_SERVER['REQUEST_METHOD'], parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
