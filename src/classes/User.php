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
        $sql = "INSERT INTO $this->table (username, email, password, role) 
        VALUES (:username,:email ,:password, :role)";

        $query = $this->conn->query($sql);
        $this->conn->bind(':username', $this->username);
        $this->conn->bind(':email', $this->email);
        $this->conn->bind(':password', $this->password);
        $this->conn->bind(':role', $this->role);

        $this->conn->execute();

        return $query;
    }

}