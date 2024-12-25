<?php

require_once __DIR__ . '../loader.php';
require_once __DIR__ . '../models/UserModel.php';

class UserService extends Service {
    private $userModel;
    public function __construct($db, $table) {
        parent::__construct($db, $table);
        $this->userModel = new User($db);
    }

    public function registerUser ($data) {
        if (empty($data->username) || empty($data->email) || empty($data->password) || empty($data->role)) {
            throw new Exception('All fields are required');
        }

        $this->userModel->username = str_secure($data->username);
        $this->userModel->email = str_secure($data->email);
        $this->userModel->password = str_secure($data->password);
        $this->userModel->role = str_secure($data->role);

        $this->userModel->addUser();
    }


}