<?php

class UserController extends Controller
{
    private $userService;

    public function __construct($db)
    {
        $this->userService = new UserService($db, 'Users');
    }

    public function registerUser()
    {
        try {
            $data = json_decode(file_get_contents('php://input'));

            if (empty($data)) {
                http_response_code(400);
                echo json_encode(['message' => 'No data provided']);
                return;
            }

            $this->userService->registerUser($data);

            $this->successResponse($data, 'User registered successfully');
        } catch (Exception $e) {
            $this->errResponse($e->getMessage());
        }
    }
}
