<?php

class Service {
    protected $db;
    protected $table;

    public function __construct($db, $table){
        $this->db = $db;
        $this->table = $table;
    }

    public function requireRole(string $role){
        if (empty($_SESSION['user_id']) || $_SESSION['role'] !== $role) {
            throw new Exception('Unauthorized: Access denied.');
        }
    }

    protected function log_err($msg) {
        error_log($msg);
    }
}