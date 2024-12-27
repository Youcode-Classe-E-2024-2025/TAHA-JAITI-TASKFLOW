<?php

//service handles business logic such as validating input and sanitizing data
class UserService extends Service {
    private $userModel;
    private $authService;
    public function __construct($db, $table) {
        parent::__construct($db, $table);
        $this->userModel = new User($db);
        $this->authService = new AuthService($this->userModel);
    }

    public function registerUser ($data) {
        if (empty($data->username) || empty($data->email) || empty($data->password) || empty($data->role)) {
            throw new Exception('All fields are required');
        }

        $hashedPassword = $this->authService->hashPass(str_secure($data->password));
        
        $this->userModel->setUsername(str_secure($data->username));
        $this->userModel->setEmail(str_secure($data->email));
        $this->userModel->setPassword($hashedPassword);
        $this->userModel->setRole(str_secure($data->role));

        $this->userModel->addUser();
    }

    public function login($email, $pass) {
        $user = $this->authService->login($email, $pass);
        return $user;
    }

    public function getUsers() {
        $this->requireRole('supervisor');
        return $this->userModel->getUsers();
    }
}