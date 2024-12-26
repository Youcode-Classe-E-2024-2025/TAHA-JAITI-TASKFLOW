<?php

class TaskController extends Controller {
    private $taskService;

    public function __construct($db){
        $this->taskService = new TaskService($db, 'Tasks');
    }

    public function createBug() {
        try {
            $data = json_decode(file_get_contents('php://input'));

            if (empty($data)) {
                http_response_code(400);
                echo json_encode(['message' => 'No data provided']);
                return;
            }

            $this->taskService->createBug($data);

            $this->successResponse($data, 'Task created successfully');
        } catch (Exception $e) {
            $this->errResponse($e->getMessage());
        }
    }
}   