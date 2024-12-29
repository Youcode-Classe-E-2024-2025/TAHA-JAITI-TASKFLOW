<?php

class TaskController extends Controller {
    private $taskService;
    private $type;

    public function __construct($db, $type = null){
        $allowedTypes = ['bug', 'feature','task']; //task types
        if ($type && !in_array($type, $allowedTypes)) {
            throw new Exception('Invalid task type provided');
        }

        $this->type = $type;
        $this->taskService = new TaskService($db, 'Tasks', $this->type);
    }

    public function createTask() {
        try {
            $this->requireRole('supervisor');
            $data = $data = $this->getRequestData();

            if (empty($data)) {
                http_response_code(400);
                echo json_encode(['message' => 'No data provided']);
                return;
            }

            $this->taskService->createTask($data);

            $this->successResponse($data, 'Task created successfully');
        } catch (Exception $e) {
            $this->errResponse($e->getMessage());
        }
    }

    public function assignUser() {
        try {
            $this->requireRole('supervisor');
            $data = $data = $this->getRequestData();

            if (empty($data)) {
                http_response_code(400);
                echo json_encode(['message' => 'No data provided']);
                return;
            }

            $this->taskService->assignUser($data);

            $this->successResponse($data, 'Task assigned to users successfully');
        } catch (Exception $e) {
            $this->errResponse($e->getMessage());
        }
    }

    public function changeStatus() {
        try {
            $data = $data = $this->getRequestData();

            if (empty($data)) {
                http_response_code(400);
                echo json_encode(['message' => 'No data provided']);
                return;
            }

            $this->taskService->changeStatus($data);

            $this->successResponse($data, 'Status changed successfully');
        } catch (Exception $e) {
            $this->errResponse($e->getMessage());
        }
    }

    public function getTasks() {
        $this->requireRole('supervisor');
        try {
            $tasks = $this->taskService->getTasks();

            if ($tasks){
                $this->basicResponse($tasks);
            } else {
                $this->errResponse('No tasks found', 200);
            }
        } catch (Exception $e){
            $this->errResponse('Error getting the data');
        }
    }

    public function getEmployeeTasks(){
        $this->requireLogin();
        try {

            $data = $data = $this->getRequestData();
            $tasks = $this->taskService->getEmployeeTasks($data);

            if ($tasks){
                $this->successResponse($tasks);
            } else {
                $this->errResponse('No tasks found', 200);
            }
        } catch (Exception $e){
            $this->errResponse('Error getting the data');
        }
    }

    public function deleteTask() {
        $this->requireRole('supervisor');
        try {
            $data = $this->getRequestData();

            if (empty($data)){
                $this->errResponse('Empty Data');
            }

            $this->taskService->deleteTask($data);

            $this->successResponse($data, 'Task deleted succesfuly');
        } catch (Exception $e){
            $this->errResponse('t7wa');
        }
    }

    public function updateTask(){
        $this->requireRole('supervisor');
        try {

            $data = $this->getRequestData();

            if (empty($data)){
                $this->errResponse('empty data');
            }

            $this->taskService->updateTask($data);

            $this->successResponse($data, 'Task updated successfuly');

        } catch (Exception $e){
            $this->errResponse($e);
        }
    }
}   