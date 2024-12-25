<?php

require_once __DIR__ . '../loader.php';
require_once __DIR__ . '../services/UserService.php';

class UserController extends Controller {
    private $userService;

    public function __construct($db){
        $this->userService = new UserService($db, 'Users');
    }

    public function registerUser() {
        try {
            $data = json_decode(file_get_contents('php://input'));
            $this->userService->registerUser($data);
            echo json_encode(array('message' => 'User registered successfully'));
        } catch (Exception $e) {
            echo json_encode(array('message' => $e->getMessage()));
        }
    }

}