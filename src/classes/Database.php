<?php

class Database {
    private $host = DB_HOST;
    private $port = DB_PORT;
    private $dbname = DB_NAME;
    private $user = DB_USER;
    private $password = DB_PASS;
    private $pdo;
    private $stmt;

    public function __construct() {
        $this->connect();
    }

    //connecting to database
    public function connect(): void {
        $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname}";

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            die();
        }
    }

    //getting the connection
    public function getConnection (): PDO {
        return $this->pdo;
    }

    //closing connection
    public function closeConnection(): void {
        $this->pdo = null;
        echo 'Connection closed';
    }

    //query
    public function query($sql) {
        $this->stmt = $this->pdo->prepare($sql);
        return $this->stmt;
    }

    //bind parameters
    public function bind($param, $value, $type = null){
        if(is_null($type)){
            switch(true){
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }

        $this->stmt->bindValue($param, $value, $type);
    }

    public function execute() {
        return $this->stmt->execute();
    }

    public function fetch() {
        return $this->stmt->fetch(PDO::FETCH_OBJ);
    }

    //result as assoc array
    public function fetchAssoc() {
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //result as an object array
    public function fetchSet() {
        return $this->stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function rowCount() {
        return $this->stmt->rowCount();
    }
}