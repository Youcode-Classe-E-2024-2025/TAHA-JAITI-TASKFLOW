<?php

session_start();

class TaskService extends Service{
    private $taskModel;
    
    public function __construct($db, $table, $type = null){
        parent::__construct($db, $table);
        
        if ($type){
            $model = ucfirst($type);

            if (class_exists($model)){
                $this->taskModel = new $model($db);
            } else {
                throw new Exception("Task model does not exist");
            }
        } else {
            $this->taskModel = new Task($db);
        }
    }

    public function createTask($data){
        if (empty($data->title) || empty($data->description) ||  empty($data->status) || empty($data->deadline)) {
            throw new Exception('All fields are required');
        }

        $this->taskModel->setTitle(str_secure($data->title));
        $this->taskModel->setDesc(str_secure($data->description));
        $this->taskModel->setStatus(str_secure($data->status));
        $this->taskModel->setCreatedBy($_SESSION['user_id']);
        $this->taskModel->setDeadline(str_secure($data->deadline));

        $this->taskModel->createTask();
    }

    public function assignUser($data){
        if (empty($data->task_id) || empty($data->user_id)) {
            throw new Exception('All fields are required');
        }

        $this->taskModel->setId(str_secure($data->task_id));
        $this->taskModel->assignUser($data->user_id);
    }

    public function changeStatus($data) {
        if (empty($data->task_id || empty($data->status))){
            throw new Exception('All fields are required');
        }

        $this->taskModel->setId(str_secure($data->task_id));
        $this->taskModel->setStatus(str_secure($data->status));
        $this->taskModel->applyStatus();
    }

}