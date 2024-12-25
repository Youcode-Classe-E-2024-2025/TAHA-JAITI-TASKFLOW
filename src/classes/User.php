<?php


class User {
    private $conn;
    private $table = 'Users';
    public $username;
    public $email;
    public $password;
    public $role;

    public function __construct($db){
        $this->conn = $db;
    }

    public function addUser() {
        $sql = "INSERT INTO $this->table VALUES (username = :username, email = :email, password = :password, role = :role)";

        $query = $this->conn->query($sql);
        

    }

}