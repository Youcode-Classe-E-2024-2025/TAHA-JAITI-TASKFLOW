<?php

class Task {
    protected $conn;
    protected $table = 'tasks';

    protected $id;
    protected $title;
    protected $description;
    protected $status;
    protected $type = 'basic';
    protected $createdBy;

    public function __construct($db){
        $this->conn = $db;
    }

    public function setTitle ($title) {
        $this->title = $title;
    }

    public function setDesc($desc) {
        $this->description = $desc;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function setCreatedBy($id) {
        $this->createdBy = $id;
    }
    
    public function setId($id) {
        $this->id = $id;
    }
    
    public function createTask () {
        $sql = "INSERT INTO $this->table (title, description, status,type, created_by)
                VALUES (:title, :description, :status, :type, :created_by)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':created_by', $this->createdBy);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    public function getTaskById () {
        $sql = "SELECT * FROM $this->table WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return $stmt->fetch(PDO::FETCH_OBJ);
        }
        return false;
    }

    public function getTasks () {
        $sql = "SELECT * FROM $this->table";
        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }
        return false;
    }

    public function assignUser ($userId) {
        $sql = "INSERT INTO user_assignments (user_id, task_id) VALUES (:user_id, :task_id)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':task_id', $this->id);

        return $stmt->execute();
    }

    public function getAssignedUsers() {
        $sql = "SELECT u.id, u.username, u.email FROM users u
                INNER JOIN user_assignments ua ON u.id = ua.user_id
                WHERE ua.task_id = :task_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':task_id', $this->id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function applyStatus(){
        $sql = "UPDATE $this->table SET status = :status WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()){
            return true;
        } else {
            throw new Exception('Failed to update status');
        }
    }

}