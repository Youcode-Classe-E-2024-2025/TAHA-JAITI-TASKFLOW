<?php

class Database {
    private $host;
    private $port;
    private $dbname;
    private $user;
    private $password;
    private $pdo;

    public function __construct(
        string $host = 'localhost',
        string $port = '5432',
        string $dbname = 'taskflow',
        string $user = 'postgres',
        string $password = 'root'
    ) {
        $this->host = $host;
        $this->port = $port;
        $this->dbname = $dbname;
        $this->user = $user;
        $this->password = $password;
        $this->connect();
    }

    public function connect() {
        $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname}";

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            die();
        }
    }

    public function getConnection () {
        return $this->pdo;
    }

    public function closeConnection() {
        $this->pdo = null;
    }
}