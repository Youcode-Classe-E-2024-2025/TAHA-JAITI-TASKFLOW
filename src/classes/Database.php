<?php

class Database {
    private $host = DB_HOST;
    private $port = DB_PORT;
    private $dbname = DB_NAME;
    private $user = DB_USER;
    private $password = DB_PASS;
    private $pdo;

    public function __construct() {
        $this->connect();
    }

    public function connect(): void {
        $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname}";

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            echo 'Connected';
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            die();
        }
    }

    public function getConnection (): PDO {
        return $this->pdo;
    }

    public function closeConnection(): void {
        $this->pdo = null;
        echo 'Connection closed';
    }
}