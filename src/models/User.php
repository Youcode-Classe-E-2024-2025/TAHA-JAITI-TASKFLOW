<?php


class User {
    private $conn;
    private $table = 'users';
    private $username;
    private $email;
    private $password;
    private $role;

    public function __construct($db,){
        $this->conn = $db;
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function setRole($role) {
        $this->role = $role;
    }

    public function addUser() {
        $sql = "INSERT INTO $this->table (username, email, password, role) 
        VALUES (:username,:email ,:password, :role)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':role', $this->role);

        return $stmt->execute();
    }

    public function login ($email, $pass) {
        $sql = "SELECT * FROM $this->table WHERE email = :email";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':email', $email);

        $stmt->execute();

        $user = $stmt->fetch();

        if (!$user) {
            return false;
        }

        return $user;
    }

}