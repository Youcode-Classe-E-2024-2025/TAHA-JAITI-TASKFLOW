<?php

abstract class Task {
    private $conn;
    private $table = 'tasks';

    private $title;
    private $description;
    private $status;
    private $assignedTo = [];
    private $createdBy;

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

    public function addAssignedTo($id) {
        $this->assignedTo[] = $id;
    }

    public function setCreatedBy($id) {
        $this->createdBy = $id;
    }

    abstract public function createTask ();

    abstract public function getTaskById ();

    abstract public function updateTask();

    abstract public function deleteTask();
}