<?php

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

        
        $this->userModel->setUsername($data->username);
        $this->userModel->setEmail($data->email);
        $this->userModel->setPassword($data->password);
        $this->userModel->setRole($data->role);

        $this->userModel->addUser();
    }

}