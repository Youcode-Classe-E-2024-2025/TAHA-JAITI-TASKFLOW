<?php

//handling the authentication seperately from the user service
class AuthService {
    private $userModel;

    public function __construct($user) {
        $this->userModel = $user;
    }

    public function login($email, $pass){
        $user = $this->userModel->login($email, $pass);

        if (!$user){
            throw new Exception('Invalid email or password');
        }

        if (!$this->verifyPass($pass, $user['password'])){
            throw new Exception('Invalid password');
        }

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        return $user;
    }

    public function hashPass ($pass){
        return password_hash($pass, PASSWORD_BCRYPT);
    }

    public function verifyPass ($pass, $hashPass){
        return password_verify($pass, $hashPass);
    }
}