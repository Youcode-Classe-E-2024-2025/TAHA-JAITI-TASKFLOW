<?php

require_once __DIR__ . '/loader.php';
require_once __DIR__ . '/models/UserModel.php';

class UserService extends Service {
    private $userModel;
    public function __construct($db, $table) {
        parent::__construct($db, $table);
        $this->userModel = new User($db);
    }

    public function registerUser ($data) {
        if (empty($data['username']) || empty($data['email']) || empty($data['password']) || empty($data['role'])) {
            throw new Exception('All fields are required');
        }

        if (str_secure($data['username']) || str_secure($data['email']) || str_secure($data['password']) || str_secure($data['role'])) {
            throw new Exception('Invalid characters');
        }

        $this->userModel->username = $data['username'];
        $this->userModel->email = $data['email'];
        $this->userModel->password = $data['password'];
        $this->userModel->role = $data['role'];

        $this->userModel->addUser();
    }

    
}