<?php

session_start();

class TaskService extends Service{
    private $taskModel;
    
    public function __construct($db, $table){
        parent::__construct($db, $table);
        $this->taskModel = new Bug($db);
    }

    public function createBug($data){
        if (empty($data->title) || empty($data->description) ||  empty($data->status)) {
            throw new Exception('All fields are required');
        }

        $this->taskModel->setTitle(str_secure($data->title));
        $this->taskModel->setDesc(str_secure($data->description));
        $this->taskModel->setStatus(str_secure($data->status));
        $this->taskModel->setCreatedBy($_SESSION['user_id']);

        $this->taskModel->createTask();
    }

    public function assignUser($data){
        if (empty($data->task_id) || empty($data->user)) {
            throw new Exception('All fields are required');
        }

        $this->taskModel->setId(str_secure($data->task_id));
        $this->taskModel->assignUser($data->user);
    }

}