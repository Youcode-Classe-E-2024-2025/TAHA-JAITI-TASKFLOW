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
    protected $deadline;

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

    public function setDeadline($date){
        $this->deadline = $date;
    }
    
    public function setId($id) {
        $this->id = $id;
    }
    
    public function createTask () {
        $sql = "INSERT INTO $this->table (title, description, status,type, deadline, created_by)
                VALUES (:title, :description, :status, :type, :deadline, :created_by)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':created_by', $this->createdBy);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return $this->id;
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
        $sql = "SELECT 
                    t.*, 
                    u1.username AS created_by_name, 
                    STRING_AGG(u2.username, ', ') AS assignees
                FROM 
                    tasks t
                JOIN 
                    users u1 ON t.created_by = u1.id
                LEFT JOIN 
                    user_assignments ua ON t.id = ua.task_id
                LEFT JOIN 
                    users u2 ON ua.user_id = u2.id
                GROUP BY 
                    t.id, u1.username;";
        
        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }
        return false;
    }

    public function assignUser ($userId,$taskId ) {
        $sql = "INSERT INTO user_assignments (user_id, task_id) VALUES (:user_id, :task_id)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':task_id', $taskId);

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

    public function deleteTask($id){
        try {
            $sql = "DELETE FROM $this->table WHERE id = :id";
    
            $stmt = $this->conn->prepare($sql);
    
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    
            $stmt->execute();
    
            if ($stmt->rowCount() === 0) {
                throw new Exception('Task not found or already deleted.');
            }
        } catch (PDOException $e) {
            throw new Exception('Database error: ' . $e->getMessage());
        }
    }   

}