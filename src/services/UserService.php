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

        $hashedPassword = password_hash(str_secure($data->password), PASSWORD_BCRYPT);
        
        $this->userModel->setUsername(str_secure($data->username));
        $this->userModel->setEmail(str_secure($data->email));
        $this->userModel->setPassword($hashedPassword);
        $this->userModel->setRole(str_secure($data->role));

        $this->userModel->addUser();
    }

}