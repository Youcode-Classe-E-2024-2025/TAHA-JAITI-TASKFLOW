<?php

class TaskController extends Controller {
    private $taskService;
    private $type;

    public function __construct($db, $type = null){
        $allowedTypes = ['bug', 'feature','tasl']; //task types
        if ($type && !in_array($type, $allowedTypes)) {
            throw new Exception('Invalid task type provided');
        }

        $this->type = $type;
        $this->taskService = new TaskService($db, 'Tasks', $this->type);
    }

    public function createTask() {
        try {
            $this->requireRole('supervisor');
            $data = json_decode(file_get_contents('php://input'));

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
            $data = json_decode(file_get_contents('php://input'));

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
            $data = json_decode(file_get_contents('php://input'));

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
}   