<?php

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
        $this->requireRole('supervisor');

        if (empty($data->title) || empty($data->description) 
            ||  empty($data->status) || empty($data->deadline) || empty($data->assignUsers)) {
            throw new Exception('All fields are required');
        }

        $this->taskModel->setTitle(str_secure($data->title));
        $this->taskModel->setDesc(str_secure($data->description));
        $this->taskModel->setStatus(str_secure($data->status));
        $this->taskModel->setCreatedBy($_SESSION['user_id']);
        $this->taskModel->setDeadline(str_secure($data->deadline));

        $taskId = $this->taskModel->createTask();

        if (!empty($data->assignUsers) && is_array(($data->assignUsers))){
            foreach($data->assignUsers as $userId){
                $this->taskModel->assignUser( intval($userId),$taskId);
            }
        }
    }

    public function assignUser($data){
        $this->requireRole('supervisor');
        
        if (empty($data->task_id) || empty($data->user_id)) {
            throw new Exception('All fields are required');
        }

        $this->taskModel->setId(str_secure($data->task_id));
        $this->taskModel->assignUser($data->user_id, $data->task_id);
    }

    public function changeStatus($data) {
        if (empty($data->task_id || empty($data->status))){
            throw new Exception('All fields are required');
        }

        $this->taskModel->setId(str_secure($data->task_id));
        $this->taskModel->setStatus(str_secure($data->status));
        $this->taskModel->applyStatus();
    }

    public function getTasks() {
        $this->requireRole('supervisor');
        $tasks =  $this->taskModel->getTasks();
        return $tasks;
    }

    public function deleteTask($data) {
        $this->requireRole('supervisor');
        if (empty($data->id)){
            throw new Exception('Empty task id');
        }

        $this->taskModel->deleteTask(intval($data->id));
    }
}